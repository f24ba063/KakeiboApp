import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthFetch } from '../../hooks/useAuthFetch';
import '../../css/registerUser.css';

//import { useAuth } from ',/AuthProvider'; 

export default function RegisterUser() {
    const [username, setUsername] = useState("");//ユーザー名登録
    const [password, setPassword] = useState("");//パスワード登録
    const [payday, setPayday] = useState(25);//給料日登録
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});//入力エラーを受け止めるstate
    const navigate = useNavigate();
    const authFetch = useAuthFetch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            if (!username.trim() || !password.trim()) {
                alert("ユーザー名とパスワードを登録してください");
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
                setErrors(data || {});
                setLoading(false);
                return;
            }

            if (data && data.resistered === true) {
                navigate("/home", { replace: true });
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
                {errors.username &&
                    <div className="warning">{errors.username}</div>
                }
                <br />
                パスワード
                <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)} />
                {errors.password &&
                    <div className="warning">{errors.password}</div>
                }
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
                <br />
                <button type="submit"
                    disabled={loading}>新規ユーザー登録
                </button>
            </form>
            <button type="button"
                onClick={() => navigate("/login")}>
                キャンセル
            </button>
        </>
    )
}