import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("jwt");
        navigate("./login");
    };

    return <button onClick={handleLogout }>ログアウト</button>
}