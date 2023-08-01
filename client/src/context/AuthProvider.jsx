import { createContext, useContext, useEffect, useState } from "react"
import { auth } from '../firebase/firebaseConfig';
import Loader from "../base_components/Loader";
import styled from "styled-components";
import { getDogsFavorite } from "../redux/createActions";
import { useDispatch } from "react-redux";

const authUserContext = createContext();

//Hook authFirebase
export const useAuthFirebase = () => {
    return useContext(authUserContext);
};

const AuthProvider = ({ children }) => {
    const dispatchRedux = useDispatch();
    const [ usuario, setUsuario ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(true);
        auth.onAuthStateChanged(user => {
            setLoading(false);
            setUsuario(user);
            
            if(user){
                dispatchRedux(getDogsFavorite({uid:user.uid}));
            }
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