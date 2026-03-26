
export default function LoginSequence(username,
                                    password,
                                    setLoggingUsername,
                                    setError,
                                    navigate) {
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
            setError("通信エラー:" + error.message);
        }
    };

    return handleLogin;
}