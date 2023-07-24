import { Title } from "react-head"
import GroupPageDefault from "../components/GroupPageDefault"
import styled from "styled-components"
import Form from "../base_components/Form"
import Input from "../base_components/Input"
import Button from "../base_components/Button"
import { Link } from "react-router-dom"
import LinkText from "../base_components/LinkText"

const LogInPage = () => {
  return (
    <GroupPageDefault>
        <Title>Dogest - Iniciar Sesion</Title>
        <ContenedorLogIn>
            <FormLogIn onSubmit={evt => evt.preventDefault()}>
                <div style={{display:'inline-flex', justifyContent:"space-between"}}>
                    <h1>Iniciar Sesion</h1>
                    <Button
                        as={Link}
                        to="/sign-in"
                        color="white"
                        bgcolor="black"
                        style={{fontSize:'1rem'}}
                    >
                        Ir a Registrarse
                    </Button>
                </div>
                <Input type="text" placeholder="Correo Electrónico" name="email"/>
                <Input type="password" placeholder="Contraseña"/>
                <LinkText style={{textAlign:"right"}}>¿Has olvidado tu contraseña?</LinkText>
                <ButtonLogIn>Iniciar Sesion</ButtonLogIn>
            </FormLogIn>
        </ContenedorLogIn>
    </GroupPageDefault>
  )
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

export default LogInPage;