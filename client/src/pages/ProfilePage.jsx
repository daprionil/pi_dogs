import { Title } from "react-head";
import styled from "styled-components";

import GroupPageDefault from "../components/GroupPageDefault";
import Form from "../base_components/Form";
import { useAuthFirebase } from "../context/AuthProvider";
import IconProfile from "../base_components/IconProfile";
import { useSelector } from "react-redux";
import { useState } from "react";

const ProfilePage = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const usuario = useAuthFirebase();
    const [favoriteCount, lastDog] = useSelector(({favorite_dogs,all_dogs}) => [
        favorite_dogs?.length ?? 0,
        favorite_dogs ? all_dogs.find(({id}) => id === favorite_dogs[0]) ?? {} : {}
    ]);

    return (
        <GroupPageDefault>
            <Title>Mi Perfil</Title>
            <ContainerProfileInfo>
                <Form>
                    {
                        isEditMode ?
                            <p>editando...</p>
                        :   <>
                                <ContainerImageProfile>
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
                                        <p>Tus Favoritos</p>
                                        <p>{favoriteCount}</p>
                                    </ContainerMinInfo>
                                    <ContainerMinInfo>
                                        <p>Último Agregado</p>
                                        <p>{lastDog ? lastDog.name : '??'}</p>
                                    </ContainerMinInfo>
                                </ListMinInfoContainer>
                            </>
                    }
                </Form>
            </ContainerProfileInfo>
        </GroupPageDefault>
    );
};


const ContainerProfileInfo = styled.div`
    padding: 10px 15px;

    max-width: 1000px;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContainerImageProfile = styled.div`
    width: min-content;
    margin: 0 auto;
    filter: drop-shadow(0px 1px 15px rgba(0,0,0,.2));
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
`;
const ContainerMinInfo = styled.div`
    border-radius: 10px;
    padding: 10px;
    text-align: center;

    font-weight: 600;

    display: flex;
    flex-direction: column;

    & p:nth-child(1){
        filter: drop-shadow(0px 1px 15px rgba(0,0,0,.3));
        font-weight: 600;
    }
    & p:nth-child(2){
        background: #f0f0f0;
        box-shadow: 0px 1px 15px rgba(0,0,0,.1);
    }
`;

export default ProfilePage;