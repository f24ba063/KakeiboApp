
export default async function LoginSequence(username,
                                    password,
                                    setLoggingUsername) {

    try {
        const res = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        
        if (!res.ok) {
            if (res.status === 401)
                return { success: false, message: "ユーザー名またはパスワードが間違っています" };
            if (res.status === 400)
                return { success: false, message: "サーバーで問題が発生しています" };
            return { success: false, message: `予期せぬエラーが発生しました:(${res.status})` }
        }

        const data = await res.json();

        sessionStorage.setItem("jws", data.token);
        setLoggingUsername(username);

        return { success: true};
    } catch (error) {
        return {success:false, message:"サーバーに接続できません：" + error}
    }
}