import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthFetch } from '../../hooks/useAuthFetch';

//import { useAuth } from ',/AuthProvider'; 

export default function CreateUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [payday, setPayday] = useState(25);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const authFetch = useAuthFetch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            if (!username.trim() || !password.trim()) {
                alert("ユーザー名とパスワードを入力してください");
                setLoading(false);
                return;
            }

            // payday の正規化
            const normalizedPayday = Math.min(Math.max(Math.round(payday), 1), 28);

            //dbへのデータ転送
            const res = await authFetch("http://localhost:8080/register/registerUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username.trim(),
                    password: password.trim(),
                    payday  :normalizedPayday
                })
            });
            let data = null;

            const contentType = res.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                data = await res.json();
            }

            if (!res.ok) {
                throw new Error(data.message || "サーバーエラー");
            }

            if (data && data.resistered === true) {
                //login(data.token);
                navigate("./login", { replace: true });
                // 登録成功。ただちに家計簿ホーム画面へ
                
            } else {
                // 失敗
                alert(data?.message || "登録に失敗しました");
            }
        } catch (error) {
            alert("通信エラー:" + error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                ユーザー名
                <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    value={username}
                    required
                    onChange={e => setUsername(e.target.value)} />
                <br />
                パスワード
                <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={password}
                    required
                    onChange={e =>setPassword(e.target.value)} />
                <br />
                給料日
                <input
                    type="number"
                    name="payday"
                    min="1"
                    max="28"
                    step="1"
                    value={payday}
                    required
                    onChange={(e) => setPayday(Number(e.target.value) || 1)}
                />

                <button type="submit"
                    disabled={loading}>新規ユーザー登録</button>
            </form>
        </>
    )
}