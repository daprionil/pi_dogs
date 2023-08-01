import { useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import ButtonAddDogFavorite from "./ButtonAddDogFavorite";

function CardDog(propsDogs) {
    const { name, height, weight, image, id, favorite } = propsDogs;
    const [favoriteState, setFavoriteState] = useState(favorite);

    return (
        <CardDogStyled>
            <Link to={`/dogs/${id}`}>
                <div className="image_dog">
                    <img src={image} alt={`${name}_image`} />
                </div>
            </Link>
            <div className="info_dog">
                <h3 className="name_title">{name}</h3>
                <p><span>Altura <em>(Aprox)</em>: </span>{height === 'NaN' ? 'no disponible' : `${height}${!isNaN(height) ? ' cm' : ''}`}</p>
                <p><span>Peso <em>(Aprox)</em>: </span>{weight === 'NaN' ? 'no disponible' : `${weight}${!isNaN(weight) ? ' lb' : ''}`}</p>
            </div>
            <ButtonAddDogFavorite
                favorite={favoriteState}
                setFavorite={setFavoriteState}
                propsDog={propsDogs}
            />
        </CardDogStyled>
    );
}

const CardDogStyled = styled.div`
    width: 100%;
    padding: 10px;

    box-shadow: 0 1px 5px rgba(0,0,0,0.3);
    position: relative;
    
    & .image_dog{
        margin: 30px 0 0 30px;
        position: relative;
        img{
            display: block;
            
            width: 80%;
            margin: 0 auto;
            display: block;
            aspect-ratio: 1;
            object-fit: cover;
            object-position: 25% 25%; 
            
            clip-path: circle(50.0% at 50% 50%);
            z-index: 1;

            transition: all .3s ease;
        }
        &::before{
            content: "";
            background: linear-gradient(0.25turn, #ffa07a5b 10%, #d3540040 15%, transparent 50%),
                        linear-gradient( #0000006d 10%, #0000006d 25%);
            backdrop-filter: contrast(1.4);
            clip-path: circle(50.0% at 50% 50%);

            width: 80%;
            left: 0;
            height: 100%;
            position: absolute;
            z-index: 2;

            transition: all .5s ease;
        }

        &:hover{
            img{
                transform: scale(1.02);
            }
            &::before{
                left: 50%;
                transform: translateX(-45%);
            }
        }
    }

    & .info_dog{
        *{
            margin: 5px 0;
        }
        text-align: center;
        p{
            em{
                font-size: .8rem;
                margin-right: 5px;
            }
            span{
                font-weight: 500;
            }
        }
        & .name_title{
            font-size: 1.7rem;
            font-weight: 900;
        }
    }
`

export default CardDog;