import styled from 'styled-components';

import Form from '../base_components/Form';
import Button from '../base_components/Button';
import Select from '../base_components/Select';
import Input from '../base_components/Input';
import ElementTemperamentForm from './ElementTemperamentForm';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../base_components/Message';
import createADog from '../controllers/createADog';
import { getDogs } from '../redux/createActions';
import { validateFormEmptyFields, validateSpecialValuesForm } from '../utils';

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
    
    const didMountRef = useRef(false);
    
    const [message, setMessage] = useState('');
    const [valuesForm, changeValuesForm] = useState(initialStateFormValues);

    const handleChange = ({target}) => {
        didMountRef.current = true;

        const {name, value} = target;

        //If attribute have a name equal to temperaments
        if(name === 'temperaments'){
            //* Extract values from selected option and select value
            changeValuesForm(state => {
                if(value === '') return state;
                
                const nombre = target.selectedOptions[0].textContent;
                const newTemperament = {nombre, id:value};
                return {...state, temperaments: [...state.temperaments, newTemperament]};
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
        
        //* Set values to temps in state
        changeValuesForm(state => ({
            ...state,
            temperaments: state.temperaments.filter(({id}) => id !== dataId)
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        //* If not exist errors
        if(!message.message){
            didMountRef.current = false;

            const temperamentsParsed = valuesForm.temperaments.map(({id}) => Number(id));
            const DogValuesToCreate = {...valuesForm, temperaments: temperamentsParsed};
            
            try {
                //! USE CONTROLLER TO CREATE DOG
                const data = await createADog(DogValuesToCreate);
                
                //If exist and error
                if(data.error) throw new Error(data.error);
                
                //* Message Success create dog
                setMessage({type:'success',message:'Tu Raza se ha Agregado'});
                
                //* Set dogs from API server in the Store
                dispatch(getDogs());
                
                //* Reset errors and Values 
                changeValuesForm(initialStateFormValues);
                setTimeout(() => setMessage({type:'error',message:''}), 3000);
                return;
            } catch ({message}) {
                setMessage({type:'error',message});
                return;
            }
        };
    };

    const validateFormByErrors = () => {
        let localError = '';

        const [validateOffsetValues, errorsEmpty] = validateFormEmptyFields(valuesForm);
        localError = errorsEmpty;

        //* If exist one error for empty values
        if(validateOffsetValues){
            setMessage({type:'error', message: localError});
            return
        };

        //* Validate values with special validation
        const [validateSpecialValues, errorsSpecial] = validateSpecialValuesForm(valuesForm);
        localError = errorsSpecial;

        //* If don't exist errors
        if(!validateSpecialValues){
            setMessage('');
            return;
        };

        setMessage({type:'error',message:localError});
    };

    useEffect(()=> {
        if(!didMountRef.current) return;
        validateFormByErrors();
    },[valuesForm]);

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

export default FormCreateDog;