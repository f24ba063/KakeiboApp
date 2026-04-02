export default function updateUserPayday(authFetch, username, editPayday){
	if (!confirm(`給料日を${editPayday}日に変更します`)) return;
	return authFetch("http://localhost:8080/register/setPayday", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, payday:editPayday })
	})
		.then(res => res.json())
		.then(data => data.payday);
}