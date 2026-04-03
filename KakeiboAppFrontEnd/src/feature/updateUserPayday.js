export default function updateUserPayday(authFetch, username, editPayday){
	if (!confirm(`給料日を${editPayday}日に変更します`)) return;

	if (typeof editPayday !== "number") {
		console.log("数値以外が給料日に入力されました");
		return;
	}
	return authFetch("http://localhost:8080/register/setPayday", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, payday: editPayday })
	})
		.then(res => res.json())
		.then(data => data.payday)
		.catch(err => {
			console.log("給料日の変更に失敗しました：" + err);
			return null;
		});
}