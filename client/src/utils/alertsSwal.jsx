import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const reactSwalErrorAlert = ({message}) => {
    //? Show Alert to Denied activity
    MySwal.fire({
        title:'Error',
        icon:'error',
        text: message,
        html:<>
            <p>Eso</p>
        </>,
        showConfirmButton:false
    });
}

const reactSwalSuccessAlert = ({message}) => {
    //? Show Alert to Denied activity
    MySwal.fire({
        title:'Operación exitosa',
        icon:'success',
        text: message,
        showConfirmButton:false
    });
}

export {
    reactSwalErrorAlert,
    reactSwalSuccessAlert
}