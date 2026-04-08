import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import  LoginSequence  from '../../feature/LoginSequence';

export default function LoginForm() {
    const [username, setUsername] = useState("user1");//ログインユーザー名受け止め先
    const [password, setPassword] = useState("1234");//ログインパスワード受け止め先
    const [error, setError] = useState("");
    const { loggingUsername, setLoggingUsername } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const result = await LoginSequence(username,
                password, setLoggingUsername, navigate);
            setError("");

            if (!result.success) {
                setError(result.message);
                return;
            } else {
                navigate("/home");
            } 

        } catch (err) {
            setError("ログインに失敗しました：" + err);
        }
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <div>
                    <label>ユーザー名：</label>
                    <input value={username} onChange={e => setUsername(e.target.value) } />
                </div>
                <div>
                    <label>パスワード：</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <span>
                    <button type="submit">ログイン</button>
                
                </span>
                {/*エラー表示欄*/}
                {error && <p style={{color: "red"} }>{error}</p>}
            </form>
            <button
                type="button"
                onClick={() => navigate("/registerUser") }
            >
                新規登録
            </button>
        </>
    )
}