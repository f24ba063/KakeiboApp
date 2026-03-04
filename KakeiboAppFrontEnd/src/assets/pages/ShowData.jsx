import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../../css/showData.css'

export default function ShowData() {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);//編集モードボタン

    const [kakeiboDto, setKakeiboDto] = useState({
        id: 0,
        category: "",
        tradeDate: "",
        amount: 0,
        inOut: "IN",
        homeru: 0,
        memo: "",
        createdAt: "",
        updatedAt: "",
        softDelete: 0
    });
    //当該idのデータをjavaから吸い出す
    useEffect(() => {
        fetch(`http://localhost:8080/index/showdata/${id}`)
            .then(res => res.json())
            .then(data => setKakeiboDto(data))
    }, [id]);

    //日付のフォーマット
    const datestr = kakeiboDto.createdAt ? kakeiboDto.createdAt.split('T')[0] : "";
    const updstr = kakeiboDto.updatedAt ? kakeiboDto.updatedAt.split('T')[0] : "";

    const dtg = (s) => {
        const [y, m, d] = s.split('-');
        return `${y % 100}年${m}月${d}日`;
    };
    
    //削除ボタン設定(softDeleteを9にすると削除扱い)
    const handleDelete = async (id) => {
        if (!confirm("本当に削除しますか？")) return;

        try {
            //DBにsoftDelete=9を反映
            const res = await fetch(`http://localhost:8080/index/delete/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ softDelete: 9 })
            });

            if (!res.ok) throw new Error("削除失敗");

            //indexに戻る
            navigate("/index");
        } catch (err) {
            alert("削除できませんでした：" + err.message);
        }
    };

    //戻るボタンでホームに移動
    const navigate = useNavigate();
    const moveHome = () => {
        navigate("/index");
    }

    const handleSubmit = () => {

    }

    return (
        <>
            <form onSubmit={handleSubmit} className="area">
                {/*IDは隠蔽している*/}
                <h2 id="id-hidden">id: {id}</h2>
                {/*カテゴリー*/}
                {isEditing ? 
                    <select>
                        
                    </select>
                    :
                <h2>カテゴリー: {kakeiboDto.category}</h2>
                }

                {isEditing ? <p></p> : 
            <h2>
                {kakeiboDto.inOut === "IN" ? "収入" : "支出"}：{kakeiboDto.amount}
            </h2>}

                <h2>メモ：{kakeiboDto.memo}</h2>
                <h2>データ作成日：{dtg(datestr)}</h2>
                <h2>最終更新日：{dtg(updstr)}</h2>
                <h2>すごい！
                <img
                        className="homeru-icon"
                        src={kakeiboDto.homeru === 1 ? "/img/heart.png" : "/img/heart_gray.png"}
                        onClick={(e) => {
                            setKakeiboDto({
                                ...kakeiboDto,
                                homeru: kakeiboDto.homeru === 1 ? 0 : 1
                            });
                            
                        } }
                    /></h2>
                <button onClick={() => handleDelete(kakeiboDto.id)}>削除</button>
                {isEditing ?
                    <button type="submit">保存</button> : 
                    <button type="submit">編集</button>
                }
            </form>
            <button type="button" onClick={moveHome }>ホームに戻る</button>
        </>
    )
}