export async function fetchWithJwt(url, options = {}) {
    const token = sessionStorage.getItem("jwt");
    const headers = {
        ...options.headers,
        "Authorization": token ? `Bearer ${token}` : ""
    };

    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
        sessionStorage.removeItem("jwt");
        throw new Error("認証失敗しました");
    }
    return res.json();
}