
export default async function ToggleHeart(id, current, setKakeiboDto, authFetch) {

    try {
        const res = await authFetch(`http://localhost:8080/kakeibo/homeru/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                homeru: current === 1 ? 0 : 1
            })
        });
        if (!res.ok) {
            throw new Error("がんばり更新に失敗しました")
        }

        setKakeiboDto(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, homeru: current === 1 ? 0 : 1 }
                    : item
            )
        );
    } catch (err) {
        console.log("通信が失敗しました：", err);
    }
}