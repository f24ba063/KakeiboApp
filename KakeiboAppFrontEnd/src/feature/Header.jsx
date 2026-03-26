import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { loggingUsername } = useContext(UserContext);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (

        <header id="header">
            <div id="top">
                <button onClick={handleLogout}>ログアウト</button>
                <h3>ユーザー：{loggingUsername}</h3>
            </div>
        </header>
    )
}