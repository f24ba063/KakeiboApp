
export default function CardStyle({ KakeiboDto, moveDetail, ToggleHeart, setKakeiboDto, dateGet }) {
return(
<div id="card-base">
    {KakeiboDto
        .filter(e => e.softDelete != 9)
        .map(e => (
            //カード形式にした各種入出金データ
            <ul key={e.id}
                className={`${e.inOut === "IN" ? "income-card" : "outgo-card"}`}
                onClick={() => {
                    moveDetail(e.id)
                }}
            >

                {/*褒めるハートマークイメージ*/}
                <img
                    src={e.homeru === 1 ? "/img/heart.png" : "/img/heart_gray.png"}
                    alt="heart"
                    className="card-heart"
                    onClick={(event) => {
                        event.stopPropagation();
                        ToggleHeart(e.id, e.homeru, setKakeiboDto)
                    }}
                />
                {/*日付文字列*/}
                <li className="block">
                    <h3>{dateGet(e.tradeDate)}</h3>
                </li>

                {/*入出金カテゴリー文字列*/}
                <li className="block">
                    <h3>{e.category} : {e.amount}</h3>
                </li>

                {/*詳細メモ文字列*/}

                <li className="comment-block" >
                    <h3>{e.memo}</h3>
                </li>
            </ul>
        ))}
</div>
)
}