import { useAuth } from '../AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/header.css';

export default function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === "/login" || location.pathname === "/createUser") {
        return null; // Login と CreateUser では Header を非表示
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header id="header">
            <button onClick={handleLogout}>ログアウト</button>
        </header>
    )
}