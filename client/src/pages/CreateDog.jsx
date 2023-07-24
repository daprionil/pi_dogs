import styled from 'styled-components';
import GroupPageDefault from "../components/GroupPageDefault";
import FormCreateDog from '../components/FormCreateDog';
import ImageSide from '../assets/bg_landing_page.webp';
import { Title } from 'react-head';

function CreateDog() {
    return (
        <GroupPageDefault>
            <Title>Dogest - Crear una Raza</Title>
            <ContenedorCreateDog>
                <TituloCreateDog>¡Crear tu Raza!</TituloCreateDog>
                <section>
                    <FormCreateDog />
                    <img src={ImageSide} alt="image dog side"/>
                </section>
            </ContenedorCreateDog>
        </GroupPageDefault>
    );
}

const TituloCreateDog = styled.h1`
    text-align: center;
    padding: 10px;
`;

const ContenedorCreateDog = styled.div`
    max-width: 1100px;
    overflow: hidden;
    margin: 10px auto;
    margin-bottom: 100px;

    section{
        @media (max-width: 776px){
            position: relative;
            grid-template-columns: 1fr;
            img{
                position: absolute;
                width: 100%;
                height: 100%;

                z-index: 1;
                filter: blur(1px);
                opacity: .1;
            }
            form{
                z-index: 2;
            }
        }

        background: #e6e6e6;
        border-radius: 10px;
        overflow: hidden;
        
        display: grid;
        grid-template-columns: repeat(9,1fr);

        margin: 0 10px;

        img{
            @media (max-width: 776px){
                grid-column: auto;
            }
            height: 100%;
            grid-column: 7/-1;
            aspect-ratio: 1/2;
            object-fit: cover;
            width: 100%;
        }
    }
`;

export default CreateDog;