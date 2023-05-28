import styled from 'styled-components';

import Form from '../base_components/Form';
import Button from '../base_components/Button';
import Select from '../base_components/Select';
import Input from '../base_components/Input';
import ElementTemperamentForm from './ElementTemperamentForm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../base_components/Message';
import createADog from '../controllers/createADog';
import { getDogs } from '../redux/createActions';

const initialStateFormValues = {
    name:'',
    height:'',
    weight:'',
    yearsOld:'',
    image:'',
    temperaments:[]
};

function FormCreateDog() {
    const dispatch = useDispatch();
    const all_temperaments = useSelector(({all_temperaments}) => all_temperaments);
    
    const [message, setMessage] = useState('');
    const [valuesForm, changeValuesForm] = useState(initialStateFormValues);

    const handleChange = ({target}) => {
        const {name, value} = target;

        //If attribute have a name equal to temperaments
        if(name === 'temperaments'){
            //* Extract values from selected option and select value
            changeValuesForm(state => {
                const nombre = target.selectedOptions[0].textContent;
                return {
                    ...state,
                    temperaments: value === '' ? [...state.temperaments] : [...state.temperaments, {nombre, id:value}]
                };
            });
            return;
        };

        //Rest field in state
        changeValuesForm(state => ({
            ...state,
            [name]: value
        }));
    };

    const handleClickTemperament = e =>{
        e.preventDefault();
        const dataId = e.target.dataset.nameid;
        
        changeValuesForm(state => ({
            ...state,
            temperaments: state.temperaments.filter(({id}) => id !== dataId)
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        //* Validate possible empty values
        let localError = '';
        const arrayEntries = Object.entries(valuesForm);
        const validateOffsetValues = arrayEntries.some( ([key,val]) => {
            if(typeof val === 'string'){
                const validate = !val.trim().length;
                if(validate){
                    localError = `El ${dictionaryValuesForm[key]} no puede estar vacío`
                }
                return validate;
            };
            if(key === 'temperaments'){
                const validate = !(val.length >= 2);
                if(validate){
                    localError = `Debes de tener por lo menos 2 temperamentos`
                };
                return validate;
            }
            const lastValidate = !val.length;
            if(lastValidate){
                localError = `El ${dictionaryValuesForm[key]} no es válido`
            };
            return lastValidate;
        });
        if(validateOffsetValues){
            setMessage({type:'error', message: localError});
            return 
        };
        
        //* Validate values with special validation
        const validateSpecialValues = arrayEntries.some(([key,val]) => {
            //* Get special validate for one field in the form
            const specialValidate = specialValidationsFormCreateDog[key];

            if(specialValidate){
                const validation = !specialValidate(val);
                //* Set error to display
                if(validation) localError = `El campo ${dictionaryValuesForm[key]} no es válido`;
                return validation;
            };
            return false;
        });

        //* If not exist errors
        if(!validateSpecialValues){
            const temperamentsParsed = valuesForm.temperaments.map(({id}) => Number(id));
            const DogValuesToCreate = {...valuesForm, temperaments: temperamentsParsed};
            
            //! USE CONTROLLER TO CREATE DOG
            const data = await createADog(DogValuesToCreate);
            
            //If exist and error
            if(data.error){
                //* set error fetched from the database
                setMessage({type:'error',message:data.error});
                return;
            };
            
            //* Message Success create dog
            setMessage({type:'success',message:'Tu Raza se ha Agregado'});
            
            //* Set dogs from API server in the Store
            dispatch(getDogs());

            //* Reset errors and Values 
            changeValuesForm(initialStateFormValues);
            setTimeout(() => setMessage({type:'error',message:''}), 3000);
            return;
        };
        setMessage({type:'error',message:localError});
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            <p className='title_input'>Escribe el nombre de la Raza</p>
            <Input
                type='text'
                name='name'
                placeholder='Nombre de la Raza'
                onChange={handleChange}
                value={valuesForm.name}
            />

            <p className='title_input'>Caracteristicas</p>
            <ContenedorInput>
                <Input
                    type='number'
                    name='height'
                    placeholder='Altura promedio ( cm )'
                    onChange={handleChange}
                    value={valuesForm.height}
                />
                <Input
                    type='number'
                    name='weight'
                    placeholder='Peso promedio ( lb )'
                    onChange={handleChange}
                    value={valuesForm.weight}
                />
                <Input
                    type='number'
                    name='yearsOld'
                    placeholder='Edad promedio'
                    onChange={handleChange}
                    value={valuesForm.yearsOld}
                />
            </ContenedorInput>
            
            <p className='title_input'>Adjunta una Imagen para tu Raza</p>
            <Input
                type='url'
                name='image'
                placeholder='url de la imágen'
                onChange={handleChange}
                value={valuesForm.image}
            />
            
            <p className='title_input'>Temperamentos</p>
            <ContenedorInput>
                <SelectFormCreateDog
                    name="temperaments"
                    onChange={handleChange}
                >
                    <option value="">Añadir Temperamento</option>
                    {
                        all_temperaments && all_temperaments.map(({Id, nombre}) => (
                            <option key={Id} value={Id}>{nombre}</option>
                        ))
                    }
                </SelectFormCreateDog>
                <ListSelectTemperaments>
                    {
                        valuesForm.temperaments.map((temperament,i) => (
                            <ElementTemperamentForm key={i} {...temperament} handleClick={handleClickTemperament}/>
                        ))
                    }
                </ListSelectTemperaments>
            </ContenedorInput>
            {
                Boolean(message.message) && <Message type={message.type} message={message.message}/>
            }
            <ButtonFormCreateDog>Crear Perro</ButtonFormCreateDog>
        </FormStyled>
    );
}

const FormStyled = styled(Form)`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;

    align-self: center;
    grid-column: 1 / span 6;
    
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 10px;
    
    width: 100%;
    height: auto;
    padding: 10px;
    
    .title_input{
        margin-top: 10px;
        border-bottom: 2px solid #202020;
        width: fit-content;
        font-weight: 500;
    }
`;

const SelectFormCreateDog = styled(Select)`
    padding:10px 15px;
    font-weight: 600;
`;

const ContenedorInput = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 10px;
`;

const ButtonFormCreateDog = styled(Button)`
    font-size: 1rem;
    background: red;
    border-radius: 10px;
    color: white;
    font-weight: bold;
`;

const ListSelectTemperaments = styled.div`
    width: 100%;
    
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 5px;
`;

//* Dictionaries
const dictionaryValuesForm = {
    name:'nombre',
    height:'altura',
    weight:'peso',
    yearsOld: 'años de edad',
    image:'imagen',
};

//* Validate Values
const limitValuesFunction = (val) => {
    const parsedValue = parseInt(val);
    return parsedValue > 0 && parsedValue <= 100
};
const specialValidationsFormCreateDog = {
    height:limitValuesFunction,
    weight:limitValuesFunction,
    name: val => val.trim().length < 50,
    yearsOld:limitValuesFunction,
}


export default FormCreateDog;