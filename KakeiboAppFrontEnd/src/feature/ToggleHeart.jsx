export default async function toggleHeart(id, current, setKakeiboDto){
    await fetch(`http://localhost:8080/index/homeru/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            homeru: current === 1 ? 0 : 1
        })
    });

    setKakeiboDto(prev =>
        prev.map(item =>
            item.id === id
                ? { ...item, homeru: current === 1 ? 0 : 1 }
                : item
        )
    );
}