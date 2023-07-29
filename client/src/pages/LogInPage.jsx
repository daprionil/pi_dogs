import { Title } from "react-head"
import GroupPageDefault from "../components/GroupPageDefault"
import styled from "styled-components"
import Form from "../base_components/Form"
import Input from "../base_components/Input"
import Button from "../base_components/Button"
import { Link, useNavigate } from "react-router-dom"
import LinkText from "../base_components/LinkText"
import { useState } from "react"
import { messageEmptyFieldValue } from "../utils/formAuthValidation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import Loader from "../base_components/Loader"
import Message, { ERROR_TYPE_MESSAGE, SUCCESS_TYPE_MESSAGE } from "../base_components/Message"
import errorAuthFirebase from "../utils/errorAuthFirebase"

const LogInPage = () => {
    const navigate = useNavigate();

    const [valuesForm, setValuesForm] = useState({
        email:"",
        password:""
    });
    const [errors, setErrors] = useState({});
    const [ loading, setLoading ] = useState(false);
    const [message, setMessage] = useState({msg: null, type: null});


    const changeMessageState = (msg = null, type = null) => {
        setMessage({msg, type});
    };

    const handleChangeValuesForm = ({target:{name, value}}) => {
        setValuesForm(state => {
            //Format data values from form
            const dataFormValue = {
                ...state,
                [name]: value
            };
            
            setErrors(validateFormLogInValues(errors));
            return dataFormValue;
        });
    };

    const handleSubmitLogIn = evt => {
        evt.preventDefault();
        const errors = validateFormLogInValues(valuesForm);
        setErrors(errors);
        changeMessageState();

        //If exist empty values, dont execute this block of code
        if(!Object.entries(errors).length){
            setLoading(true);

            signInWithEmailAndPassword(auth, valuesForm.email, valuesForm.password)
            .then( () => {
                changeMessageState('Se ha iniciado sesión satisfactoriamente', SUCCESS_TYPE_MESSAGE);
                setTimeout(() => navigate('/home'), 2000);
            })
            .catch(({ code }) => {
                changeMessageState(errorAuthFirebase[code] ?? 'Ha ocurrido un error', ERROR_TYPE_MESSAGE)
            })
            .finally(() => {
                setLoading(false);
            });
        }
    };

    return (
        <GroupPageDefault>
            <Title>Dogest - Iniciar Sesion</Title>
            <ContenedorLogIn>
                <FormLogIn onSubmit={handleSubmitLogIn}>
                    <div style={{ display: 'inline-flex', justifyContent: "space-between" }}>
                        <h1>Iniciar Sesion</h1>
                        <Button
                            as={Link}
                            to="/sign-in"
                            color="white"
                            bgcolor="black"
                            style={{ fontSize: '1rem' }}
                        >
                            Ir a Registrarse
                        </Button>
                    </div>
                    <Input
                        onChange={handleChangeValuesForm}
                        value={valuesForm.email}
                        type="text"
                        placeholder="Correo Electrónico"
                        name="email"
                    />
                    {
                        errors?.email && <TextErrorValidationField>{errors.email}</TextErrorValidationField>
                    }
                    <Input
                        onChange={handleChangeValuesForm}
                        value={valuesForm.password}
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                    />
                    {
                        errors?.password && <TextErrorValidationField>{errors.password}</TextErrorValidationField>
                    }
                    <LinkText style={{ textAlign: "right" }}>¿Has olvidado tu contraseña?</LinkText>
                    {
                        message.msg && <Message type={message.type} message={message.msg}/>
                    }
                    {
                        loading ?
                            <Loader />
                        : <ButtonLogIn type="submit">Iniciar Sesion</ButtonLogIn>
                    }
                </FormLogIn>
            </ContenedorLogIn>
        </GroupPageDefault>
    )
}

const validateFormLogInValues = data => {
    let errors = []
    //Validate Empty values
    for(let [key,val] of Object.entries(data)){
        if(!val){
            errors = {
                ...errors,
                [key]:messageEmptyFieldValue[key]
            };
        }
    }
    return errors;
}

const ContenedorLogIn = styled.div`
    height: 80vh;
    width: 100%;
    max-width: 500px;
    
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FormLogIn = styled(Form)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ButtonLogIn = styled(Button)`
    width: min-content;
    white-space: nowrap;
    background: red;
    color: white;
    font-size: 1rem;
`;

const TextErrorValidationField = styled.p`
    color: red;
    font-weight: 500;
    font-size: .9rem;
    margin: 0;
`;

export default LogInPage;