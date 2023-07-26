import { Link } from "react-router-dom"
import Button from "../base_components/Button"

const LogInButton = () => {
  return (
    <Button
      bgcolor="red"
      color="white"
      as={Link}
      to="/log-in"
    >Iniciar Sesion</Button>
  )
}

export default LogInButton