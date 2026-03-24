import { Navigate } from 'react-router-dom';
//import { useAuth } from './AuthProvider';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

export default function PrivateRoute({ children }){
    //const { isLoggedIn } = useAuth();
    const { loggingUsername } = useContext(UserContext);


    if (!loggingUsername || loggingUsername === "") {
        return <Navigate to="/login" replace />
    }
    return children;
}