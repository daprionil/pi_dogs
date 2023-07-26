import { Link } from "react-router-dom"
import Button from "../base_components/Button"

const SignInButton = () => {
  return (
    <Button
      bgcolor="#ffdada"
      color="red"
      as={Link}
      to="/sign-in"
    >Registrarse</Button>
  )
}

export default SignInButton