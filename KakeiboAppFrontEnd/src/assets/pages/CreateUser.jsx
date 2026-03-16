import { useState } from 'react';

export default function CreateUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [payday, setPayday] = useState(25);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/resisterUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password,
                    payday
                })
            });
            const data = await res.json();
            if (data.resistered) {
                console.log("登録成功");
                // 登録成功
            } else {
                // 失敗
                alert(data.message);
            }
        } catch (error) {
            alert("通信エラー:", error);
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
                    value={username}
                    onChange={e => setUsername(e.target.value)} />
                <br />
                パスワード
                <input
                    type="password"
                    value={password}
                    onChange={e =>setPassword(e.target.value)} />
                <br />
                給料日
                <input
                    type="number"
                    min="1"
                    max="28"
                    step="1"
                    value={payday}
                    onChange={(e) => setPayday(Number(e.target.value) || 1)}
                />

                <button type="submit"
                    disabled={loading}>新規ユーザー登録</button>
            </form>
        </>
    )
}