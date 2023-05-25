import Input from "../base_components/Input";
import Form from '../base_components/Form';
import styled from "styled-components";
import Select from "../base_components/Select";

import { useState } from "react";
import { useSelector } from "react-redux";

function FilterDogsHome() {
    const Temperaments = useSelector(({all_temperaments}) => all_temperaments);
    const [valuesForm, changeValuesForm] = useState({min:0, max:0,temperament:''});

    const handleChange = ({target:{name, value}}) => {
        changeValuesForm(state => {
            const {max,min} = state;
            const maxNumber = parseInt(max), minNumber = parseInt(min);
            
            //* If the min value is greather than the max value
            if(name === 'min' && minNumber + 1 > maxNumber){
                return {...state, [name]:parseInt(value), max:parseInt(value)}
            }

            if(name === 'max' && maxNumber + 1 < minNumber){
                return {...state, [name]:parseInt(value), min:parseInt(value)}
            }

            return {
                ...state,
                [name]:value
            }
        })
    };

    return (
        <ContenedorFilterHome>
            <Form style={optionsStyleForm}>
                <Titulo>Filtrar</Titulo>
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
                <Select onChange={handleChange} value={valuesForm.temperament} name="temperament">
                    <option value="">Seleccionar Temperamento</option>
                    {
                        Temperaments && Temperaments.map(({nombre,Id}) => (
                            <option key={Id} value={nombre}>{nombre}</option>
                        ))
                    }
                </Select>
            </Form>
        </ContenedorFilterHome>
    );
};

const optionsStyleForm = {
    display: 'flex',
    flexWrap:'wrap',
    alignItems: 'center',
    justifyContent:'left',
    background:'#e2e2e2',
    color:'black',
    fontSize: '0.9rem'
}

const Titulo = styled.h2`
    margin: 0 auto;
    font-size: 1.2rem;
`;

const ContenedorFilterHome = styled.div`
    width: min-content;
    margin: 0 auto;
`;

const ContenedorRange = styled.div`
    width:100%;
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

export default FilterDogsHome;