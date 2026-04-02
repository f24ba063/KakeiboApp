import {useNavigate} from 'react-router-dom';

//保護APIに自動でJWTを付与、401は自動処理

export function useAuthFetch(){
	const navigate = useNavigate();

	async function authFetch(url, options ={}){
		const token = sessionStorage.getItem("jws");
		const headers = {
			...(options.headers || {}), 
			...(token ? { Authorization: `Bearer ${token}`} : {})
		};
		try {
			const res = await fetch(url, {
				...options,
				headers
			});

			if (res.status === 401) {
				sessionStorage.removeItem("jws");
				navigate("/login");//トークン無効ならログイン画面へ
				throw new Error("認証失敗");
			}

			return res;

		} catch (err) {
			console.error("通信エラー：" + err);
			throw err;
		}
	}

	return authFetch;
}