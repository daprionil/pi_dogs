import { createContext, useContext, useEffect, useState } from "react"
import { auth } from '../firebase/firebaseConfig';
import Loader from "../base_components/Loader";
import styled from "styled-components";

const authUserContext = createContext();

//Hook authFirebase
export const useAuthFirebase = () => {
    return useContext(authUserContext);
};

const AuthProvider = ({ children }) => {
    const [ usuario, setUsuario ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(true);
        auth.onAuthStateChanged(user => {
            setLoading(false);
            setUsuario(user);
        });
    },[]);

    return (
        <authUserContext.Provider value={usuario}>
            {
                loading ?
                    <ContainerLoaderPage>
                        <Loader />
                    </ContainerLoaderPage>
                : children
            }
        </authUserContext.Provider>
    )
}

const ContainerLoaderPage = styled.div`
    position: fixed;
    
    width: 100%;
    height: 100vh;

    background: white;

    display: flex;
    align-items: center;
`;

export default AuthProvider