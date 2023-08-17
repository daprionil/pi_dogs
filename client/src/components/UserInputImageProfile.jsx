import styled from "styled-components";
import IconProfile from "../base_components/IconProfile";
import InputFileImage from "../base_components/InputFileImage";
import Button from "../base_components/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import updateImageProfileUser from "../controllers/updateImageProfileUser";
import { reactSwalErrorAlert, reactSwalSuccessAlert } from "../utils/alertsSwal";
import { useRef, useState } from "react";
import { useAuthFirebase } from "../context/AuthProvider";

const MySwal = withReactContent(Swal);

// eslint-disable-next-line react/prop-types
const UserInputImageProfile = () => {
    const usuario = useAuthFirebase();
    
    // eslint-disable-next-line react/prop-types
    const [imageProfile, setImageProfile] = useState(usuario.photoURL || undefined);
    const imageProfileInput = useRef(null);

    //! Change the image in reference
    const changeImageProfileInput = (image) => imageProfileInput.current = image;
    
    //! Execute submit for up image to Cloud
    const handleSubmitChangeImageProfile = async () => {
        //? This condition is execute if exist an image to up in cloud
        if(imageProfileInput.current){
            updateImageProfileUser(imageProfileInput.current).then(({secure_url:photoURL}) => {
                //? change State to imageProfile
                setImageProfile(photoURL);

                //? Reset ref to image in input
                changeImageProfileInput(undefined);

                //? display success alert
                reactSwalSuccessAlert({message: 'Tu imágen de perfil se ha cambiado exitosamente'});
            }).catch(error => {
                //* Show alert with the error
                reactSwalErrorAlert({
                    message: `Ha ocurrido un error, ${error}`
                });
            });

            return;
        }

        //! If doesn't exist an image in imageRef.current
        reactSwalErrorAlert({
            message: 'No has incluído una imágen válida'
        });
    };
    const handleAlertToChangeImage = async () => {
        const {isConfirmed} = await MySwal.fire({
            title: <p>Cambiar Imágen de Perfil</p>,
            html: <>
                    <p>¿Te gustaría cambiar tu Imagen de Perfil?</p>
                    <br />
                    <InputFileImage setImageState={changeImageProfileInput} />
                    <Button
                        bgcolor="#ff0000"
                        color="white"
                        onClick={handleSubmitChangeImageProfile}
                    >Guardar</Button>
                </>,
            showConfirmButton:false,
        });

        //? If the user was click in the save button
        if(isConfirmed){
            //! Validate if the image is valid to change and add Cloudinary
            console.log(usuario);
            MySwal.fire({
                title: 'Se ha cambiado de forma exitosa',
                icon:"success",
                html:<>
                        <Button bgcolor="red" color="white" onClick={Swal.close}>Aceptar</Button>
                    </>,
                showConfirmButton:false
            });
        }
    };

    return (
        <ContainerImageProfile onClick={handleAlertToChangeImage}>
            {
                imageProfile ?
                    // eslint-disable-next-line react/prop-types
                    <img src={imageProfile} alt={`${usuario.displayName || ''} profile image`} />
                    : <IconProfile $size={'4xl'} />
            }
        </ContainerImageProfile>
    )
}

const ContainerImageProfile = styled.div`
    width: min-content;
    margin: 0 auto;
    filter: drop-shadow(0px 1px 15px rgba(0,0,0,.2));

    transition: all .3s ease-in-out;
    transform: scale(1);
    cursor: pointer;
    
    /* Image to profile */
    & img:nth-child(1){
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 50%;
    }

    &:hover{
        transform: scale(1.03);
    }
`;

export default UserInputImageProfile;