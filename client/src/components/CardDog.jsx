import { useState } from "react";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Button from "../base_components/Button";

const MySwal = withReactContent(Swal);

function CardDog(propsDogs) {
    const { name, height, weight, image, id, addDogFavorite, favorite, existUser } = propsDogs;
    const [favoriteState, setFavoriteState] = useState(favorite);
    const navigate = useNavigate();

    const handleClickFavorite = async () => {
        if (existUser) {
            //?  This alert answer and to display if the user want delete of the favorite list
            if (favoriteState) {
                const { isDenied, isDismissed } = await MySwal.fire({
                    title: <p>Eliminar</p>,
                    html:<>
                        <p>¿Estás seguro que deseas eliminarlo de tus favoritos?</p>
                        <br />
                        <Button onClick={() => Swal.clickConfirm()} bgcolor="red" color="white">Eliminar</Button>
                    </>,
                    icon: 'question',
                    showConfirmButton: false
                });
                if(isDismissed || isDenied) return;
            }

            //? If the user want add raza to favorite list
            // eslint-disable-next-line no-unused-vars
            const { addDogFavorite: m, ...dogData } = propsDogs;
            setFavoriteState(state => !state);
            addDogFavorite({
                id,
                favorite: favoriteState,
                dogData
            });

            if(!favoriteState){
                MySwal.fire({
                    title: <p>Exitoso</p>,
                    text: `${name} ha sido agregado correctamente a tus Favoritos`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor:'green'
                });
            }

            return;
        }

        //! If the client no have active sesion
        MySwal.fire({
            title: <p>Advertencia</p>,
            html: <>
                <p>Si quieres agregar a {name} a tus Favoritos, debes de iniciar sesión</p>
                <Button onClick={() => {
                    navigate('/log-in');
                    Swal.close();
                }} bgcolor="red" color="white">Iniciar Sesion</Button>
            </>,
            icon: 'warning',
            showConfirmButton:false
        })
    };

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
            <div
                className="favorite_emoji"
                dangerouslySetInnerHTML={{ __html: favoriteState ? '&#128159;' : '&#128420;' }}
                onClick={handleClickFavorite}
            ></div>
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

    & .favorite_emoji{
        position: absolute;
        cursor: pointer;
        top: 10px;
        right: 10px;
        font-size: 1.7rem;
        filter: drop-shadow(0 2px 2px black);
        transition: all .2s ease;
        &:hover{
            transform: scale(1.1);
        }
    }
`

export default CardDog;