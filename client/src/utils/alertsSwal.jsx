import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "../base_components/Button";

const MySwal = withReactContent(Swal);

const reactSwalErrorAlert = ({message}) => {
    //? Show Alert to Denied activity
    MySwal.fire({
        title:'Error',
        icon:'error',
        html:<>
            <p>{message}</p>
            <br />
            <Button
                bgcolor="red"
                color="white"
                onClick={Swal.close}
            >Cerrar</Button>
        </>,
        showConfirmButton:false
    });
}

const reactSwalSuccessAlert = ({message}) => {
    //? Show Alert to Denied activity
    MySwal.fire({
        title:'Operación exitosa',
        icon:'success',
        html:<>
            <p>{message}</p>
            <br />
            <Button
                bgcolor="#3be051"
                color="white"
                onClick={Swal.close}
            >Aceptar</Button>
        </>,
        showConfirmButton:false
    });
}

export {
    reactSwalErrorAlert,
    reactSwalSuccessAlert
}