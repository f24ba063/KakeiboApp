import { useState, useContext } from 'react';
import { useNavigate, } from 'react-router-dom';
import { useAuthFetch } from '../../hooks/useAuthFetch';
import { UserContext } from '../../context/UserContext';
import LoginSequence from '../../feature/LoginSequence';

import '../../css/registerUser.css';

//import { useAuth } from ',/AuthProvider'; 

export default function RegisterUser() {
    const [username, setUsername] = useState("");//ユーザー名登録
    const [password, setPassword] = useState("");//パスワード登録
    const [payday, setPayday] = useState(25);//給料日登録
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});//入力エラーを受け止めるstate
    const { loggingUsername, setLoggingUsername } = useContext(UserContext);//ログインユーザ名を格納
    const navigate = useNavigate();
    const authFetch = useAuthFetch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            if (!username.trim() || !password.trim()) {
                alert("ユーザー名とパスワードを1文字以上入力してください");
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
            
            const data = res.data;

            //通信失敗、あるいはユーザー重複を検知
            if (!res.ok) {
                let message = "登録に失敗しました";

                if (res.status === 400) {
                    message = "禁止されている入力文字があります";
                } else if (res.status === 409) {
                    message = "このユーザー名はすでに使われています";
                } else if (res.status === 500) {
                    message = "サーバー側で問題が発生しています";
                }

                setErrors({
                    ...data,
                    general: `${message} (${res.status})`
                });

                return;
            }
            //登録成功したら、ただちにログインして収支ホーム画面へ遷移
            if (data && data.registered === true) {
                try {
                    const result = await LoginSequence(
                        username,
                        password,
                        setLoggingUsername
                    );

                    if (result.success) {
                        navigate("/home");
                    } else {
                        setErrors({ general: result.message })
                    }

                    const logindata = await result.json();
                    sessionStorage.setItem("jws", logindata.token);
                    setLoggingUsername(username);

                    navigate("/home");
                } catch (error) {
                    setErrors({ general: "通信エラー:" + error });
                }
                
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
                {errors.message &&
                    <div className="warning">{errors.message}</div>
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