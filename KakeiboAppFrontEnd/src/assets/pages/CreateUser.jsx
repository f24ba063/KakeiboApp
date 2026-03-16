import { useState } from 'react';

export default function CreateUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [payday, setPayday] = useState(25);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = fetch("http://localhost:8080/resister", {
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
                    type="text"
                    value={password}
                    onChange={e =>setPassword(e.target.value)} />
                <br />
                給料日
                <input
                    type="number"
                    value={payday}
                    onChange={(e) => setPayday(e.target.value)}
                />

                <button type="submit">新規ユーザー登録</button>
            </form>
        </>
    )
}