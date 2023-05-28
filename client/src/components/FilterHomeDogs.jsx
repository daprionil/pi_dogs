import Input from "../base_components/Input";
import Form from '../base_components/Form';
import styled from "styled-components";
import Select from "../base_components/Select";
import Button from "../base_components/Button";
import FilterSvg from "../base_components/FilterSvg";

import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { homeContext, filterDogsContext, changeCurrentPage } from "../context/HomeDogsContext";

function FilterDogsHome() {
    const Temperaments = useSelector(({all_temperaments}) => all_temperaments);
    const [,dispatchContextHome] = useContext(homeContext);
    const [valuesForm, changeValuesForm] = useState({min:0, max:0,temperament:'', database: false});

    const handleChange = ({target:{type,name, value,checked}}) => {
        changeValuesForm(state => {
            const {max,min} = state;
            
            //* If the min value is greather than the max value
            if(name === 'min' && parseInt(value) + 1 > max){
                const minValue = parseInt(value);
                return {...state, [name]:minValue, max:minValue}
            }
            //* If the max value is less than the min value
            if(name === 'max' && parseInt(value) + 1 < min){
                const maxValue = parseInt(value);
                return {...state, [name]:maxValue, min:maxValue}
            };

            //* If the field is a checkbox input
            if(type === 'checkbox'){
                return {
                    ...state,
                    [name]: checked
                };
            };

            return {
                ...state,
                [name]: name !== 'temperament' ? parseInt(value) : value
            };
        });
    };
    
    //Send to context the properties to validate
    const handleSubmit = evt => {
        evt.preventDefault();
        
        //* Send values to filter data dogs
        dispatchContextHome(filterDogsContext({...valuesForm}));

        //* Set current page in 0 to get dogs
        dispatchContextHome(changeCurrentPage('0'));
    };

    return (
        <ContenedorFilterHome>
            <FormFilter onSubmit={handleSubmit}>
                <ContenedorRange>
                    <label htmlFor="min">Peso Mínimo</label>
                    <Input
                        type="range"
                        max={100}
                        name="min"
                        placeholder="mínimo"
                        id="min"
                        onChange={handleChange}
                        value={valuesForm.min}
                    />
                    <span>{valuesForm.min}</span>
                </ContenedorRange>
                <ContenedorRange>
                    <label htmlFor="max">Peso Máximo</label>
                    <Input
                        type="range"
                        max={100}
                        name="max"
                        placeholder="mínimo"
                        id="max"
                        onChange={handleChange}
                        value={valuesForm.max}
                    />
                    <span>{valuesForm.max}</span>
                </ContenedorRange>
                <label htmlFor="checbox_database">Creados</label>
                <Input type="checkbox" id="checkbox_database" checked={valuesForm.database} onChange={handleChange} name="database"/>
                <Select onChange={handleChange} value={valuesForm.temperament} name="temperament">
                    <option value="">Seleccionar Temperamento</option>
                    {
                        Temperaments && Temperaments.map(({nombre,Id}) => (
                            <option key={Id} value={nombre}>{nombre}</option>
                        ))
                    }
                </Select>
                <ButtonForm><FilterSvg /> Filtrar</ButtonForm>
            </FormFilter>
        </ContenedorFilterHome>
    );
};

const FormFilter = styled(Form)`
    @media (max-width: 776px) {
        display: grid;
        grid-template-columns: 1fr;
    }
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    
    color: black;
    font-size: .9rem;
    gap: 10px;
`;

const ContenedorFilterHome = styled.div`
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    background: #e2e2e2;
    margin: 10px;
`;

const ContenedorRange = styled.div`
    @media (max-width: 776px) {
        justify-content: center;
    }
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    
    gap: 10px;
    padding: 2px;

    & label{
        white-space: nowrap;
    }
    & span{
        width: 30px;
        height: 30px;

        background: #202020;
        color: white;
        text-align: center;
        font-weight: bold;
        border-radius: 50%;
        aspect-ratio: 1;
        padding: 5px;
    }
    & input[type="range"]{
        padding: 0;
    }
`;

const ButtonForm = styled(Button)`
    font-size: inherit;
    padding: 5px 10px;
    background: #ff4116;
    color: white;
    font-weight: bold;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover{
        transform: scale(1.04);
    }
`;

export default FilterDogsHome;