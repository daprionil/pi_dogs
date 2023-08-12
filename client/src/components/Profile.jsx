import styled, { css } from 'styled-components';

import { useAuthFirebase } from "../context/AuthProvider"
import LogOutButton from './LogOutButton';
import { useState } from 'react';
import Button from '../base_components/Button';
import { NavLink } from 'react-router-dom';
import IconProfile from '../base_components/IconProfile';

const Profile = () => {
    const usuario = useAuthFirebase();
    const [isOpen, setIsOpen] = useState(true);

    const handlePopUp = () => setIsOpen(state => !state);

    return (
        usuario && (
            <>
                <ContainerProfile onClick={handlePopUp}>
                    {
                        usuario.photoURL ?
                            <ImageProfile src={usuario.photoURL} alt={`${usuario.email} profile Dogest`} />
                            : <IconProfile $size='md' />
                    }
                </ContainerProfile>
                <PopUpProfile $isOpen={isOpen}>
                    <Button bgcolor="transparent" as={NavLink} to='/createdog'>Crear tu Dog</Button>
                    <Button bgcolor="transparent" as={NavLink} to='/medogs'>Mis Favoritos</Button>
                    <Button bgcolor="transparent" as={NavLink} to='/profile'>Mi Perfil</Button>
                    <LogOutButton text />
                </PopUpProfile>
            </>
        )
    );
};


const ContainerProfile = styled.div`
    transition: all .3s ease-in-out;
    cursor: pointer;

    &:hover{
        transform: scale(1.08);
    }
`;

const ImageProfile = styled.img`
    max-width: 37px;
    aspect-ratio: 1;
    object-fit: cover;
    box-shadow: 0 1px 10px rgba(0,0,0,0.4);
    border-radius: 50%;
`;

const PopUpProfile = styled.div`
    position: fixed;
    padding: .5em;
    right: 20px;
    overflow: hidden;
    
    ${({ $isOpen }) => (
        /* Set funcionality in PopUp */
        $isOpen ?
            css`
                height: 0px;
                padding: 0;
            `
            : css`
                height: inherit;
                padding: .5em;
            `
    )};
    
    width: 180px;

    display: flex;
    flex-direction: column;
    align-items:stretch;
    gap: 5px;

    transition: all .3s ease;

    background: #eaeaea;
    box-shadow: 0 1px 15px rgba(0,0,0,.3);
`;

export default Profile