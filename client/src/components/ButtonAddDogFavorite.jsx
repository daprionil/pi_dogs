import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../base_components/Button";
import { useAuthFirebase } from "../context/AuthProvider";
import { addDogFavorite, deleteDogFavorite } from "../redux/createActions";
import { reactSwalSuccessAlert } from "../utils/alertsSwal";

const MySwal = withReactContent(Swal);

// eslint-disable-next-line react/prop-types
const ButtonAddDogFavorite = ({favorite, setFavorite, propsDog }) => {
    const dispathRedux = useDispatch();
    const usuario = useAuthFirebase();
    const navigate = useNavigate();

    //? This function is executed by each card for DogFavorite
    const addToFavoriteDog = ({dogData}) => {
        if(favorite){
            dispathRedux(deleteDogFavorite({nameDog: dogData.name, uid: usuario.uid}));
            return;
        }
        dispathRedux(addDogFavorite({uid: usuario.uid, dogData}));
    };

    const handleClickFavorite = async () => {
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!usuario) {
            //?  This alert answer and to display if the user want delete of the favorite list
            if (favorite) {
                const { isDenied, isDismissed } = await MySwal.fire({
                    title: <p>Eliminar</p>,
                    html: <>
                        <p>¿Estás seguro que deseas eliminarlo de tus favoritos?</p>
                        <br />
                        <Button onClick={() => Swal.clickConfirm()} bgcolor="red" color="white">Eliminar</Button>
                    </>,
                    icon: 'question',
                    showConfirmButton: false
                });
                if (isDismissed || isDenied) return;
            }

            //? If the user want add raza to favorite list
            // eslint-disable-next-line no-unused-vars, react/prop-types
            const { addDogFavorite: m, ...dogData } = propsDog;
            setFavorite(state => !state);
            addToFavoriteDog({
                dogData
            });

            if (!favorite) {
                reactSwalSuccessAlert({message: `${propsDog.name} ha sido agregado correctamente a tus Favoritos`});
            }

            return;
        }

        //! If the client no have active sesion
        MySwal.fire({
            title: <p>Advertencia</p>,
            html: <>
                <p>Si quieres agregar a {name} a tus Favoritos, debes de iniciar sesión</p>
                <br/>
                <Button onClick={() => {
                    navigate('/log-in');
                    Swal.close();
                }} bgcolor="red" color="white">Ir a Iniciar Sesion</Button>
            </>,
            icon: 'warning',
            showConfirmButton: false
        })
    };

    return (
        <FavoriteEmojiStyled
            className="favorite_emoji"
            dangerouslySetInnerHTML={{ __html: favorite ? '&#128159;' : '&#128420;' }}
            onClick={handleClickFavorite}
        ></FavoriteEmojiStyled>
    )
}

const FavoriteEmojiStyled = styled.div`
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
`;


export default ButtonAddDogFavorite