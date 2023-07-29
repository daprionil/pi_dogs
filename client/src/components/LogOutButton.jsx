import { IoMdLogOut } from 'react-icons/io';
import { signOut } from 'firebase/auth';

import { auth } from '../firebase/firebaseConfig';
import Button from "../base_components/Button"
const LogOutButton = () => {
    const handleClickLogOut = () => {
        signOut(auth);
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