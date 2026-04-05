//保護APIに自動でJWTを付与、401は自動処理

export function useAuthFetch() {

	async function authFetch(url, options = {}) {
		const token = sessionStorage.getItem("jws");
		const headers = {
			"Content-Type": "application/json",
			...(options.headers || {}),
			...(token ? { Authorization: `Bearer ${token}` } : {})

		};
		const res = await fetch(url, { ...options, headers });

		return res
	}
	return authFetch;
}