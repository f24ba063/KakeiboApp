import '../../css/login.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useAuth } from '../../AuthProvider';
import { UserContext } from '../../context/UserContext';

export default function Login() {
    const [ inputUser, setInputUser ] = useState("");
    const [ password, setPassword ] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    //const { login } = useAuth();
    const { setUserName } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {

            if (!inputUser.trim() || !password.trim()) {
                setError("ユーザー名とパスワードを入力してください");
                setLoading(false);
                return;
            }

            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: inputUser, password })
            });
            
            if (!res.ok) {
                setError(data.message || "ログイン失敗");
                return;
            } 

            const data = await res.json();
            setUserName(data.username);

            navigate("/home");
        } catch (err) {
            setError("サーバーエラー: " + err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div id="login-outline">
            <h2>ログイン</h2>
            <form onSubmit={handleLogin}>

                {/*ユーザー名*/}
                <div>
                    <label>ユーザー名</label>
                    <input
                        type="text"
                        value={inputUser}
                        onChange={e => setInputUser(e.target.value)}
                        required
                    />
                </div>

                {/*パスワード*/}
                <div id="password">
                    <label>パスワード</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div id="error-message">{error}</div>}
                <button type="submit" id="submit-button">ログイン</button>
                <button type="button" onClick={() => navigate("createUser") }>登録</button>
            </form>
        </div>
    )
}