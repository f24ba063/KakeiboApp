import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../../css/showData.css'

export default function ShowData() {
    const { id } = useParams();

    const [kakeibo, setKakeibo] = useState({
        id: 0,
        category: "",
        amount: 0,
        homeru: 0,
        memo: "",
        inOut: "",
        createdAt: "",
        updatedAt: "",
        softDelete: 0
    });
    //当該idのデータを呼び込む
    useEffect(() => {
        fetch(`http://localhost:8080/index/showdata/${id}`)
            .then(res => res.json())
            .then(data => setKakeibo(data))
    }, [id]);

    //日付のフォーマット
    const datestr = kakeibo.createdAt.split('T')[0];
    const updstr = kakeibo.updatedAt.split('T')[0];

    const dtg = (s) => {
        const [y, m, d] = s.split('-');
        return `${y % 100}年${m}月${d}日`;
    };
    
    //削除ボタン設定(softDeleteを9にすると削除扱い)
    const handleDelete = (id) => {
        if (confirm("本当に削除しますか？")) {
            setKakeibo({
                ...kakeibo,
                softDelete: 9
            });

            fetch(`http://localhost:8080/index/delete/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ softDelete: 9 })
            });
        }
    };

    //戻るボタンでホームに移動
    const navigate = useNavigate();
    const moveHome = () => {
        navigate("/index");
    }

    return (
        <>
            <div class="area">
                <h2>id: {id}</h2>
                <h2>カテゴリー: {kakeibo.category}</h2>

                <h2>
                    {kakeibo.inOut === "IN" ? "収入" : "支出"}：{kakeibo.amount }
                </h2>
                <h2>メモ：{kakeibo.memo}</h2>
                <h2>データ作成日：{dtg(datestr)}</h2>
                <h2>最終更新日：{dtg(updstr)}</h2>
                <h2>すごい！
                <img
                    className="homeru-icon"
                    src={kakeibo.homeru === 1 ? "/img/heart.png" : "/img/heart_gray.png"}
                    onClick={() => setKakeibo({
                        ...kakeibo,
                        homeru: kakeibo.homeru === 1 ? 0 : 1
                    })}
                    /></h2>
                <button onClick={() =>handleDelete(kakeibo.id)}>削除</button>
            </div>
            <button type="button" onClick={moveHome }>ホームに戻る</button>
        </>
    )
}