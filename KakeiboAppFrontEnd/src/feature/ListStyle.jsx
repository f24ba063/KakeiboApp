import '../css/listStyle.css'

export default function CardStyle({ KakeiboDto, moveDetail, ToggleHeart, setKakeiboDto, dateGet }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th id="date-width">日付</th>
                        <th id="category-width">カテゴリー </th>
                        <th id="amount-width">金額</th>
                        <th id="memo-width">メモ</th>
                        <th>
                            <img
                                src= "/img/heart.png"
                                alt="heart"
                                className="card-heart2"
                            /></th>
                    </tr>
                </thead>
                <tbody>
                    {KakeiboDto.map(e =>
                    <tr key={e.id }>
                            <td>{e.tradeDate}</td>
                            <td>{e.category}</td>
                            <td>{e.amount}</td>
                            <td>{e.memo}</td>
                            <td>
                                <img src={e.homeru === 1 ? "/img/heart.png" : "/img/heart_gray.png"}
                                    alt="heart"
                                    className="card-heart2"
                                    onClick={() => 
                                        ToggleHeart(e.id, e.homeru, setKakeiboDto)
                                    }
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    )
}