import { styled } from "styled-components";
import SectionDefaultNullish from "./SectionDefaultNullish";

function CardDogDetail({image, name, id, height, weight, yearsOld, Temperaments}) {
    return (
        <CardDogsStyled>
            <div className="section_image">
                <img src={image} alt="" />    
            </div>
            <div className="info_dog">
                <div className="title">
                    <h1>{name}</h1>
                    <p><span>#</span>{id.toString().slice(-2)}</p>
                </div>
                <div className="items_aspect">
                    <h4>Altura Promedio: <span>{height}</span> <em>{!isNaN(height) && 'cm'}</em></h4>
                    <h4>Peso Promedio: <span>{weight}</span> <em>{!isNaN(weight) && 'lb'}</em></h4>
                </div>
                <h2>Temperamentos</h2>
                <div className="temperaments">
                    {
                        Temperaments ? Temperaments.map(({nombre}, i) => (
                            <Temperament key={i}>{nombre}</Temperament>
                        )) : <SectionDefaultNullish message="Sin Temperamentos" />
                    }
                </div>
            </div>
        </CardDogsStyled>
    );
};

const CardDogsStyled = styled.div`
    @media (max-width:900px){
        grid-template-columns: 1fr;
    }

    width: 100%;
    max-width: 1000px;
    min-height: 500px;

    margin: 0 10px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    
    box-shadow: 2px 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    overflow: hidden;

    & .section_image{
        img{
            @media (max-width:900px){
                aspect-ratio: 5/3;
            }
            width: 100%;
            height: 100%;

            object-fit: cover;
            object-position: 60%;
            aspect-ratio: 3/2;
            filter: saturate(1.7);
        }
    }

    & .info_dog{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        
        padding: 40px 10px;
        
        margin-left: 0px;
        .title{
            display: flex;
            align-items: center;
            justify-content: left;
            gap: 10px;
            p{
                font-size: 1.8rem;
            }
        }
        
        .temperaments{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
        }
    }
`;

const Temperament = styled.p`
    background: white;
    border: 2px solid red;
    padding: 5px 10px;
    border-radius: 20px;
`

export default CardDogDetail;