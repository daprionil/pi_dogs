import { Title } from "react-head";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TbUserEdit } from "react-icons/tb";

import GroupPageDefault from "../components/GroupPageDefault";
import Form from "../base_components/Form";
import { useAuthFirebase } from "../context/AuthProvider";
import UserInputImageProfile from "../components/UserInputImageProfile";
import Button from "../base_components/Button";
import Input from "../base_components/Input";
import Message, { ERROR_TYPE_MESSAGE } from "../base_components/Message";
import validateValuesProfileForm from "../utils/formProfileValidation";
import updateProfileUserFirebase from "../controllers/updateProfileUserFirebase";
import { reactSwalErrorAlert, reactSwalSuccessAlert } from "../utils/alertsSwal";


const ProfilePage = () => {
    const usuario = useAuthFirebase();
    const [favoriteCount, lastDog] = useSelector(({favorite_dogs,all_dogs}) => [
        favorite_dogs?.length ?? 0,
        favorite_dogs ? all_dogs.find(({id}) => id === favorite_dogs[favorite_dogs.length - 1]) ?? null : {}
    ]);
    
    const [isEditMode, setIsEditMode] = useState(false);
    
    //? Initial values to profile update form
    const initialValuesFormProfile = {
        username: usuario.displayName ?? '',
        emailuser: usuario.email ?? ''
    };
    const [ valuesFormProfile, setValuesFormProfile ] = useState(initialValuesFormProfile);
    const [ errorsFormProfile, setErrorsFormProfile ] = useState({
        username: null,
        emailuser: null
    });
    
    //================================================================
    const resetFormProfile = () => setValuesFormProfile(initialValuesFormProfile);
    const handleChangeMode = () => setIsEditMode(state => !state);

    const handleChangeFormProfile = ({target:{name, value}}) => {
        setValuesFormProfile(state => {
            const newState = {
                ...state,
                [name]:value
            }
            
            //? Validate and set Errors
            const errorsValidate = validateValuesProfileForm(newState);
            setErrorsFormProfile(errorsValidate);

            return newState;
        });
    };
    
    const handleSubmit = async evt => {
        evt.preventDefault();

        //! Validate form with errors validations
        const errors = validateValuesProfileForm(valuesFormProfile);
        setErrorsFormProfile(errors);
        
        //! Validate if exist errors
        const validateIfExistNotErrors = Object.values(errors).every(val => !val);
        
        //! If doesn't exist errors execute to updateUser
        if(validateIfExistNotErrors){
            try {
                //? Update user
                await updateProfileUserFirebase(valuesFormProfile);
                
                //? Display success alert
                reactSwalSuccessAlert({message: 'Los cambios han sido realizados satisfactoriamente'})

                //! Default actions
                handleChangeMode();
                resetFormProfile();
            } catch ({message}) {
                console.log(message);

                //? Display error alert
                reactSwalErrorAlert({message: 'Ha ocurrido un error, Intentalo nuevamente mas tarde'})
            }
            return;
        }
    }

    return (
        <GroupPageDefault>
            <Title>Mi Perfil</Title>
            <ContainerProfileInfo>
                <Form onSubmit={handleSubmit}>
                    {
                        isEditMode ?
                            <>
                                <UserInputImageProfile />
                                <ContainerListInfo>
                                    <label htmlFor="username">
                                        <InputFormProfile
                                            value={valuesFormProfile.username}
                                            onChange={handleChangeFormProfile}
                                            placeholder="Nombre de Usuario"
                                            type="text"
                                            name="username"
                                            id="username"
                                        />
                                        {
                                            errorsFormProfile.username && <Message
                                                style={{fontSize: '.7rem'}}
                                                type={ERROR_TYPE_MESSAGE}
                                                message={errorsFormProfile.username}
                                            />
                                        }
                                    </label>
                                    <label htmlFor="emailuser">
                                        <InputFormProfile
                                            value={valuesFormProfile.emailuser}
                                            onChange={handleChangeFormProfile}
                                            placeholder="Correo Electrónico"
                                            type="email"
                                            name="emailuser"
                                            id="emailuser"
                                        />
                                        {
                                            errorsFormProfile.emailuser && <Message
                                                style={{fontSize: '.7rem'}}
                                                type={ERROR_TYPE_MESSAGE}
                                                message={errorsFormProfile.emailuser}
                                            />
                                        }
                                    </label>
                                </ContainerListInfo>
                                <div style={{display:'flex', justifyContent:'space-around'}}>
                                    <Button onClick={handleChangeMode} bgcolor='#bb5d5d' color="white"> Cancelar </Button>
                                    <Button
                                        type="submit"
                                        bgcolor={"#458fff"}
                                        color="white"
                                    >
                                        Guardar
                                    </Button>
                                </div>
                            </>
                        :   <>
                                <UserInputImageProfile />
                                <ContainerListInfo>
                                    <p><span>Nombre Usuario: </span>{usuario.displayName ?? 'sin definir'}</p>
                                    <p><span>Correo Electrónico: </span>{usuario.email ?? 'sin definir'}</p>
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
                                <HandleButtonEditMode onClick={handleChangeMode}>
                                    <TbUserEdit />
                                </HandleButtonEditMode>
                            </>
                    }
                </Form>
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

const ContainerListInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    gap: 1.3rem;
    padding: 30px 10px;
    
    width: 100%;

    & label{
        width: 100%;
    }

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

const fadeInFadeOut = keyframes`
    0%,100%{
        opacity: 1;
    }
    50%{
        opacity: 0;
    }
`;

const HandleButtonEditMode = styled(Button)`
    position: absolute;
    top: 1%;
    right: 0;
    background: #f0f0f0;

    &::before{
        content: "";
        position: absolute;
        
        width: 10px;
        height: 10px;

        background: red;
        border-radius: 50%;
        top: 0;
        right: -5%;

        animation: ${fadeInFadeOut} 1.2s ease-in infinite;
    }
`;

const InputFormProfile = styled(Input)`
    width: 100%;
`;


export default ProfilePage;