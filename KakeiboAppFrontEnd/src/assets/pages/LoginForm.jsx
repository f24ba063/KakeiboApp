import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
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

            const data = await res.json();
            sessionStorage.setItem("jws", data.token);
            setUserName(username);

            navigate(`/home`);
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