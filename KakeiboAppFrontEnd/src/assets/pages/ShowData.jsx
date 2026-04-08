import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useAuthFetch } from '../../hooks/useAuthFetch';
import '../../css/showData.css'
import showCategory from '../../feature/showCategory';


export default function ShowData() {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);//編集モードボタン
    const [categories, setCategories] = useState([]);//カテゴリー情報
    const [error, setError] = useState(null);
    const { loggingUsername } = useContext(UserContext);
    const authFetch = useAuthFetch();

    const [kakeiboDto, setKakeiboDto] = useState({
        username: loggingUsername,
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
        async function fetchData() {
            try {
                const res = await authFetch(`http://localhost:8080/kakeibo/showdata/${id}`);

                if (!res.ok) {
                    if (res.status === 401) {
                        setError("認証情報が消えています。もう一度ログインしてください");
                    } else if (res.status === 404) {
                        setError("そのデータは存在しません");
                    }
                    return;
                }

                const data = await res.json();
                setKakeiboDto(data);
            } catch (err) {
                setError("サーバーとの通信に失敗しました:" + err.message);
            }
        }

        fetchData();
    }, [id]);

    //カテゴリー一覧を取得する
    useEffect(() => {
        authFetch("http://localhost:8080/kakeibo/categoryParameter")
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
            const res = await authFetch(`http://localhost:8080/kakeibo/delete/${id}`, {
                method: "PUT"
            });

            if (!res.ok) throw new Error("削除失敗");

            //indexに戻る
            navigate("/home");
        } catch (err) {
            alert("削除に失敗しました：" + err.message);
        }
    };

    //戻るボタンでホームに移動
    const navigate = useNavigate();
    const moveHome = () => {
        navigate("/home");
    }

    //データ更新確定の操作
    const handleSubmit = async () => {
        try {
            const res = await authFetch(`http://localhost:8080/kakeibo/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(kakeiboDto)
            });
            if (!res.ok) {
                const data = await res.json();
                throw data;
            }
            navigate("/home");
        } catch (err) {
            console.log("情報更新に失敗しました：" + err);
        }
    }
     
    return (
        error ? (
            <>
                <h2 style={{ color: "red" }} > {error}</h2>
                <button type="button" onClick={moveHome}>ホームに戻る</button>
            </>
    ) : (
        <>

            <form className={kakeiboDto.inOut === "IN" ? "incomeShade" : "outgoShade"}>
                {/*IDは隠蔽している*/}
                {/*<h2 id="id-hidden">id: {id}</h2>*/}
                {/*<h2 id="username-hidden">{loggingUsername}</h2>*/}



                {/*日付*/}
                {isEditing ?
                    <input
                        type="date"
                        onChange={
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
                                        () => {
                                            setKakeiboDto({
                                                ...kakeiboDto,
                                                inOut: kakeiboDto.inOut === "IN" ? "OUT" : "IN",
                                                //直前のinOutが反映される前のデータを参照しているので、入力が逆になる
                                                categoryId: kakeiboDto.inOut === "IN" ? 11 : 1 
                                            });
                                            console.log(kakeiboDto.inOut);
                                        }}
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
                            value={kakeiboDto.amount.toLocaleString()}
                            onChange={(e) => setKakeiboDto({
                                ...kakeiboDto,
                                amount: Math.max(Number(e.target.value), 0)
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
                                onChange={e => {
                                    setKakeiboDto({
                                        ...kakeiboDto,
                                        categoryId: Number(e.target.value)
                                    });
                                }
                            }
                        >
                            {showCategory(categories, kakeiboDto.inOut)}
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
                                    memo: e.target.value
                                })
                            }}
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
                    : <button type="button" onClick={() => setIsEditing(true)}>編集</button>
                }
                {isEditing ?
                    <button type="button" onClick={() => setIsEditing(false)}>キャンセル</button>
                    : <button type="button" onClick={() => handleDelete(kakeiboDto.id)}>削除</button>
                }
            </form>
            <button type="button" onClick={moveHome}>ホームに戻る</button>
        </>
    ))
}