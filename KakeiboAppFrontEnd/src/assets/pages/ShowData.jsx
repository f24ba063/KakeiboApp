import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../../css/showData.css'
import showCategory from '../../feature/showCategory';

export default function ShowData() {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);//編集モードボタン
    const [categories, setCategories] = useState([]);

    const [kakeiboDto, setKakeiboDto] = useState({
        id: 0,
        categoryId: 0,
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
    //当該idのデータを取得する
    useEffect(() => {
        fetch(`http://localhost:8080/kakeibo/showdata/${id}`)
            .then(res => res.json())
            .then(data => setKakeiboDto(data))
    }, [id]);

    //カテゴリー一覧を取得する
    useEffect(() => {
        fetch("http://localhost:8080/kakeibo/categoryParameter")
            .then((res => res.json()))
            .then(data => setCategories(data));
    }, [])

    //日付のフォーマット
    const datestr = kakeiboDto.createdAt ? kakeiboDto.createdAt.split('T')[0] : "";
    const updstr = kakeiboDto.updatedAt ? kakeiboDto.updatedAt.split('T')[0] : "";

    const dateOutput = (s) => {
        const [y, m, d] = s.split('-');
        return `${y % 100}年${m}月${d}日`;
    };
    
    //削除ボタン設定(softDeleteを9にすると削除扱い)
    const handleDelete = async (id) => {
        if (!confirm("本当に削除しますか？")) return;

        try {
            //DBにsoftDelete=9を反映
            const res = await fetch(`http://localhost:8080/kakeibo/delete/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ softDelete: 9 })
            });

            if (!res.ok) throw new Error("削除失敗");

            //indexに戻る
            navigate("/kakeibo");
        } catch (err) {
            alert("削除できませんでした：" + err.message);
        }
    };

    //戻るボタンでホームに移動
    const navigate = useNavigate();
    const moveHome = () => {
        navigate("/kakeibo");
    }

    const handleSubmit = async () => {
            await fetch(`http://localhost:8080/kakeibo/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(kakeiboDto)
            });
            navigate("/kakeibo");
    }

    return (
        <>
            <form className="area">
                {/*IDは隠蔽している*/}
                <h2 id="id-hidden">id: {id}</h2>

                {/*日付*/}
                {isEditing ?
                    <input
                        type="date"
                        onClick={
                            (e) => setKakeiboDto({
                                ...kakeiboDto,
                                tradeDate: e.target.value
                            })}
                        value={kakeiboDto.tradeDate}
                    />
                :
                <h2>{dateOutput(kakeiboDto.tradeDate)}</h2>
                    }
                

                {/*収支表示・切替ボタン*/}
                <div className="edit">
                    <h2>収支分類：</h2>{isEditing ?
                        <button type="button"
                            onClick={
                                () => setKakeiboDto({
                                    ...kakeiboDto,
                                    inOut: kakeiboDto.inOut === "IN" ? "OUT" : "IN"
                                })}
                        >
                            {kakeiboDto.inOut === "IN" ? "収入" : "支出"}
                        </button>
                        :
                        <h2>
                            {kakeiboDto.inOut === "IN" ? "収入" : "支出"}
                        </h2>
                    }
                </div>

                {/*金額*/}
                <div className="edit">
                <h2>金額：</h2>
                    {isEditing ?
                        <input type="number"
                            value={kakeiboDto.amount}
                            onChange={(e) => setKakeiboDto({
                                ...kakeiboDto,
                                amount: Number(e.target.value)
                            })}></input>
                        :
                        <h2>{kakeiboDto.amount}</h2>
                    }
                </div>

                {/*カテゴリー*/}
                {isEditing ?
                    <div id="edit-category">
                        <h2>カテゴリー：</h2>
                        <select
                            value={kakeiboDto.categoryId}
                            onChange={e => 
                                setKakeiboDto({
                                    ...kakeiboDto,
                                    categoryId: Number(e.target.value)
                                })
                            }
                        >
                                {showCategory(categories, kakeiboDto.inOut === "IN") }
                        </select>
                    </div>
                        :
                    <h2>カテゴリー: {kakeiboDto.category}</h2>
                }

                {/*メモ*/}
                {isEditing ?
                    <div className="edit">
                        <h2>メモ：</h2>
                        <input type="text" value={kakeiboDto.memo}
                            onChange={e => {
                                setKakeiboDto({
                                    ...kakeiboDto,
                                    memo:e.target.value
                                })
                            } }
                        ></input>
                    </div>
                    :
                    <h2>メモ：{kakeiboDto.memo}</h2>
                 }
                <h2>データ作成日：{dateOutput(datestr)}</h2>
                <h2>最終更新日：{dateOutput(updstr)}</h2>
                <h2>すごい！
                    {isEditing ?
                        <img
                            className="homeru-icon"
                            src={kakeiboDto.homeru === 1 ? "/img/heart.png" : "/img/heart_gray.png"}
                            onClick={() => {
                                setKakeiboDto({
                                    ...kakeiboDto,
                                    homeru: kakeiboDto.homeru === 1 ? 0 : 1
                                });
                            }}
                        />
                    :
                        <img className="homeru-icon"
                            src={kakeiboDto.homeru === 1 ? "/img/heart.png" : "/img/heart_gray.png"} />
                    }
                    </h2>
                {isEditing ?
                    <button type="button" onClick={handleSubmit}>保存</button>
                   :<button type="button" onClick={() => setIsEditing(true)}>編集</button>
                }
                {isEditing ?
                    <button type="button" onClick={() => setIsEditing(false)}>キャンセル</button>
                   :<button type="button" onClick={() => handleDelete(kakeiboDto.id)}>削除</button>
                    }
            </form>
            <button type="button" onClick={moveHome }>ホームに戻る</button>
        </>
    )
}