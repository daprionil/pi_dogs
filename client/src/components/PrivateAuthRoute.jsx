import { useAuthFirebase } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

function PrivateAuthRoute({ children }) {
    const usuario = useAuthFirebase();

    return (
        usuario ?
            children
        : <Navigate />
    );
}

export default PrivateAuthRoute;