import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Title } from "react-head";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import GroupPageDefault from "../components/GroupPageDefault";
import Form from "../base_components/Form";
import { useAuthFirebase } from "../context/AuthProvider";
import IconProfile from "../base_components/IconProfile";
import Button from "../base_components/Button";
import InputFileImage from "../base_components/InputFileImage";
import uploadImageCloudServer from "../controllers/uploadImageCloudServer";

const MySwal = withReactContent(Swal);

const ProfilePage = () => {
    const usuario = useAuthFirebase();
    const [favoriteCount, lastDog] = useSelector(({favorite_dogs,all_dogs}) => [
        favorite_dogs?.length ?? 0,
        favorite_dogs ? all_dogs.find(({id}) => id === favorite_dogs[0]) ?? {} : {}
    ]);
    const [isEditMode, setIsEditMode] = useState(false);
    const imageProfile = useRef(null);
    
    //================================================================


    //! Change the image in reference
    const changeImageProfile = (image) => imageProfile.current = image;
    
    //! Execute submit for up image to Cloud
    const handleSubmitChangeImageProfile = async () => {
        if(imageProfile.current){
            //! This close window from SweetAlert2
            uploadImageCloudServer(imageProfile.current).then(console.log);
            Swal.close();
            return;
        }

        //? Show Alert to Denied activity
        MySwal.fire({
            title:'Error',
            icon:'error',
            text: "No has agregado una imágen",
            showConfirmButton:false
        });
    };

    const handleAlertToChangeImage = async () => {
        const {isConfirmed} = await MySwal.fire({
            title: <p>Cambiar Imágen de Perfil</p>,
            html: <>
                    <p>¿Te gustaría cambiar tu Imagen de Perfil?</p>
                    <br />
                    <InputFileImage setImageState={changeImageProfile} />
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
        <GroupPageDefault>
            <Title>Mi Perfil</Title>
            <ContainerProfileInfo>
                <Form>
                    {
                        isEditMode ?
                            <p>editando...</p>
                        :   <>
                                <ContainerImageProfile onClick={handleAlertToChangeImage}>
                                    {
                                        usuario.photoURL ?
                                            <img src={usuario.photoURL} alt="" />
                                        :   <IconProfile $size={'4xl'}/>
                                    }
                                </ContainerImageProfile>
                                <ContainerListInfo>
                                    <p><span>Nombre Usuario: </span>{usuario.displayName ?? 'sin definir'}</p>
                                    <p><span>Correo Electrónico: </span>{usuario.email ?? 'sin definir'}</p>
                                    <p><span>Telefono: </span>{usuario.phoneNumber ?? 'sin definir'}</p>
                                </ContainerListInfo>
                                <ListMinInfoContainer>
                                    <ContainerMinInfo>
                                        <p>Cantidad de Favoritos</p>
                                        <p>{favoriteCount}</p>
                                    </ContainerMinInfo>
                                    {
                                        lastDog &&
                                        <ContainerMinInfo $infoSpecial>
                                            <p>Último Agregado</p>
                                            <p>
                                                <Link to={`/dogs/${lastDog.id}`} replace>{lastDog.name}</Link>
                                            </p>
                                        </ContainerMinInfo>
                                    }
                                </ListMinInfoContainer>
                            </>
                    }
                </Form>
                <div>

                </div>
            </ContainerProfileInfo>
        </GroupPageDefault>
    );
};


const ContainerProfileInfo = styled.div`
    padding: 10px 15px;

    position: relative;
    width: fit-content;
    max-width: 1000px;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1.2rem;
`;

const ContainerImageProfile = styled.div`
    width: min-content;
    margin: 0 auto;
    filter: drop-shadow(0px 1px 15px rgba(0,0,0,.2));

    transition: all .3s ease-in-out;
    transform: scale(1);
    cursor: pointer;
    &:hover{
        transform: scale(1.03);
    }
`;

const ContainerListInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    gap: 1.3rem;
    padding: 30px 10px;
    & p span:nth-child(1){
        font-weight: 700;
    }
`;

const ListMinInfoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    
    div{
        border-right:2px solid #555;
    }

    & div:last-child{
        border-right: none;
    }
`;
const ContainerMinInfo = styled.div`
    text-align: center;

    display: flex;
    flex-direction: column;
    gap: 10px;
    
    padding: 10px;

    & p:nth-child(1){
        filter: drop-shadow(0px 1px 15px rgba(0,0,0,.3));
        font-weight: 600;
    }
    & p:nth-child(2){
        width: fit-content;
        margin: 0 auto;
        
        background: ${({$infoSpecial}) => $infoSpecial ? '#f00000' : '#f0f0f0' };
        color: ${({$infoSpecial}) => $infoSpecial && '#f0f0f0'};
        
        box-shadow: 0px 1px 15px rgba(0,0,0,.2);
        padding: 4px 7px;
        border-radius: 3px;

        transition: all .3s ease-in-out;
        transform: scale(1);
        &:hover{
            transform: scale(1.03);
            text-decoration: underline;
        }
    }
`;

export default ProfilePage;