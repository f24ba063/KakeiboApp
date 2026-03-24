import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export default function LoginForm() {
    const [username, setUsername] = useState("user1");
    const [password, setPassword] = useState("1234");
    const [error, setError] = useState("");
    const { loggingUsername, setLoggingUsername } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) {
                setError("ログイン失敗");
                return;
            }

            //console.log("resのステータス："+res.status);
            const data = await res.json();
            sessionStorage.setItem("jws", data.token);
            setLoggingUsername(username);
            //console.log("loggingusername:" + loggingUsername);

            navigate("/home");
        } catch (error) {
            setError("通信エラー:" + error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>ユーザー名：</label>
                <input value={username} onChange={e => setUsername(e.target.value) } />
            </div>
            <div>
                <label>パスワード：</label>
                <input value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit">ログイン</button>
            {error && <p>{error}</p> }
        </form>
    )
}