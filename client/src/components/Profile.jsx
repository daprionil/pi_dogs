import styled from 'styled-components';
import { BiSolidUserCircle } from 'react-icons/bi';

import { useAuthFirebase } from "../context/AuthProvider"

const Profile = () => {
    const usuario = useAuthFirebase();

    if(usuario){
        return (
            <>
                <ContainerProfile>
                    {
                        usuario.photoURL ?
                            <ImageProfile src={usuario.photoURL} alt={`${usuario.email} profile Dogest`} />
                        :   <IconProfile />
                    }
                </ContainerProfile>
            </>
        )
    }
    return null;
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

const IconProfile = styled(BiSolidUserCircle)`
    font-size: 2.7rem;
`;

export default Profile