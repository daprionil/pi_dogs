import { Title } from "react-head"
import GroupPageDefault from "../components/GroupPageDefault"
import styled from "styled-components";
import Button from "../base_components/Button";
import { Link } from "react-router-dom";
import Input from "../base_components/Input";
import Form from "../base_components/Form";
import { useState } from "react";
import { validateValues } from "../utils/formAuthValidation";

const SignInPage = () => {
    const [errors, setErrors] = useState([]);
    const [valuesForm, changeValuesForm] = useState({
        email:"",
        password:"",
        password2:""
    });

    const handleChangeFormValues = ({target:{value, name}}) => {
        changeValuesForm(state => {
            const values = {
                ...state,
                [name]:value
            };
            setErrors(Object.fromEntries(validateValues(values)));
            return values;
        });
    };

    return (
        <GroupPageDefault>
            <Title>Dogest - Registrarse</Title>
            <ContenedorSignIn>
                <FormSignIn onSubmit={evt => evt.preventDefault()}>
                    <div style={{ display: 'inline-flex', justifyContent: "space-between" }}>
                        <h1>Registrate</h1>
                        <Button
                            as={Link}
                            to="/log-in"
                            color="white"
                            bgcolor="black"
                            style={{ fontSize: '1rem' }}
                        >
                            Iniciar Sesion
                        </Button>
                    </div>
                    {
                        errors['email'] && <TextErrorValidationField>{errors['email']}</TextErrorValidationField>
                    }
                    <Input
                        value={valuesForm.email}
                        onChange={handleChangeFormValues}
                        type="text"
                        placeholder="Correo Electrónico"
                        name="email"
                    />
                    {
                        errors['password'] && <TextErrorValidationField>{errors['password']}</TextErrorValidationField>
                    }
                    <Input
                        value={valuesForm.password}
                        onChange={handleChangeFormValues}
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                    />
                    {
                        errors['password2'] && <TextErrorValidationField>{errors['password2']}</TextErrorValidationField>
                    }
                    <Input
                        value={valuesForm.password2}
                        onChange={handleChangeFormValues}
                        type="password"
                        placeholder="Repite tu Contraseña"
                        name="password2"
                    />
                    <ButtonSignIn>Registrarse</ButtonSignIn>
                </FormSignIn>
            </ContenedorSignIn>
        </GroupPageDefault>
    )
}

const ContenedorSignIn = styled.div`
    height: 80vh;
    width: 100%;
    max-width: 500px;
    
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FormSignIn = styled(Form)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ButtonSignIn = styled(Button)`
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

export default SignInPage