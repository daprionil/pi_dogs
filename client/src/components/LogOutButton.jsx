import { IoMdLogOut } from 'react-icons/io';
import { signOut } from 'firebase/auth';

import { auth } from '../firebase/firebaseConfig';
import Button from "../base_components/Button"
import { useAuthFirebase } from '../context/AuthProvider';

// eslint-disable-next-line react/prop-types
const LogOutButton = ({text = null}) => {
    const usuario = useAuthFirebase();

    const handleClickLogOut = () => {
        signOut(auth).then(() => {
            if(usuario){
                window.location.reload();
            }
        });
    };

    return (
        <Button
            bgcolor="red"
            color="white"
            style={{ padding: ".5em .9em", whiteSpace:"nowrap", flexWrap: "nowrap", display:"flex", alignItems:"center", justifyContent:"space-around", gap:'5px'}}
            onClick={handleClickLogOut}
        >{
            text ?
                <>
                    <div style={{minWidth:'1rem', display:'flex'}}>
                        <IoMdLogOut />
                    </div>
                    <p>Cerrar Sesión</p>
                </>
            :   <IoMdLogOut />
        }</Button>
    )
}

export default LogOutButton