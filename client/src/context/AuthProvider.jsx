import { createContext, useContext, useEffect, useState } from "react"
import { auth } from '../firebase/firebaseConfig';

const authUserContext = createContext();

//Hook authFirebase
export const useAuthFirebase = () => {
    return useContext(authUserContext);
};

const AuthProvider = ({ children }) => {
    const [ usuario, setUsuario ] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(setUsuario);
    },[]);

    return (
        <authUserContext.Provider value={usuario}>
            {
                children
            }
        </authUserContext.Provider>
    )
}

export default AuthProvider