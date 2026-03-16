import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //const answer = await fetch("http://localhost:8080/login", {
    //    method: "POST",
    //    headers: {
    //        "Content-Type": "applicarion/json"
    //    },
    //    body: JSON.stringify({
    //        username,
    //        password
    //    }).them(res => res.json())
    //});

    return (
        <>
            <form>
                ユーザー名
                <input type="text" name="username"></input>
                <br />
                パスワード
                <input type="text" name="password"></input>
                <br />
                <button type="submit">ログイン</button>
            </form>
            <Link to="/createUser">新規登録</Link>
        </>
    )
}