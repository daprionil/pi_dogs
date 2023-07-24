import { Title } from "react-head"
import GroupPageDefault from "../components/GroupPageDefault"
import styled from "styled-components";
import Button from "../base_components/Button";
import { Link } from "react-router-dom";
import Input from "../base_components/Input";
import Form from "../base_components/Form";

const SignInPage = () => {

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
                    <Input
                        type="text"
                        placeholder="Correo Electrónico"
                        name="email"
                    />
                    <Input
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                    />
                    <Input
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

export default SignInPage