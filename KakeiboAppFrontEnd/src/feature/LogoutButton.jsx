import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function LogoutButton() {
    const navigate = useNavigate();
    const [loggingUsername, setLoggingUsername] = useContext(UserContext);


    const handleLogout = () => {
        sessionStorage.removeItem("jwt");
        setLoggingUsername(null);
        console.log("ログインユーザ名：" + loggingUsername);
        navigate("./login");
    };

    return <button onClick={handleLogout }>ログアウト</button>
}