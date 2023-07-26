import { useAuthFirebase } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

function PrivateAuthRoute({ children, loged }) {
    const usuario = useAuthFirebase();
    
    return (
        /* If the route requires the user is not logged in */
        loged ?
            usuario ?
                <Navigate to='/' replace />
            : children
        /* If the route requires the user to be logged */
        : usuario ?
            children    
        : <Navigate to="/log-in" replace />
    );
}

export default PrivateAuthRoute;