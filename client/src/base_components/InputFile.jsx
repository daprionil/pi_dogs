import { useState } from "react";
import styled from "styled-components";

function InputFile() {
    const [image, setImage] = useState(null);

    const handleChangeFile = ({ target }) => {
        console.log(target);
    }

    return (
        <ContainerInputFile htmlFor="file_input_image">
            <input type="file" onChange={handleChangeFile} id="file_input_image" />
        </ContainerInputFile>
    );
};


const ContainerInputFile = styled.label`
    position: relative;
    display: block;
    width: fit-content;
    margin: 5px auto;

    padding: 10px;
    border: 2px dashed #555;

    border-radius: 10px;

    &, *{
        cursor: pointer;
    }

    transition: all .3s ease-in-out;
    transform: scale(1);

    &:hover{
        transform: scale(1.02);
    }

    & input[type="file"]{
        &::file-selector-button{
            @media (max-width: 776px) {
                font-size: 0.9rem;
            }

            @media (max-width: 470px) {
                font-size: .7rem;
            }
            
            font-weight: bold;
            border: none;
            font-size: 1rem;
            background: #2885ff;
            color: white;
            border-radius: 3px;
            
            text-align: center;
            padding: 10px 15px;
            white-space: nowrap;

            cursor: pointer;
            transition: all .3s ease;
            &:hover{
                transform: scale(1.01);
                box-shadow: 2px 1px 5px rgba(2,2,2,.1);
            }

        }
    }
`;

export default InputFile;