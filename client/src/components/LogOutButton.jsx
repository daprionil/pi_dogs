import { IoMdLogOut } from 'react-icons/io';
import { signOut } from 'firebase/auth';

import { auth } from '../firebase/firebaseConfig';
import Button from "../base_components/Button"
import { useAuthFirebase } from '../context/AuthProvider';
const LogOutButton = () => {
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
            style={{ padding: ".5em .9em" }}
            onClick={handleClickLogOut}
        ><IoMdLogOut /></Button>
    )
}

export default LogOutButton