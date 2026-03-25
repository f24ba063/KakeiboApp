import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';

export default function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();

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