
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthFetch } from '../../hooks/useAuthFetch';
import { UserContext } from '../../context/UserContext'
import '../../css/newData.css'
import showCategory from '../../feature/showCategory';
export default function NewData() {
       //カテゴリー(category)、日付(tradeDate)、
        //入出金額(amount)、数値型の誉めるフラグ( homeru =0)、
    //雑記メモ(memo)を入力する
    const { loggingUsername } = useContext(UserContext);//ユーザー名を受け取る
    const [categories, setCategories] = useState([]);
    const [inOut, setInOut] = useState("OUT");
    const [errors, setErrors] = useState({});
    const today = new Date().toISOString().split("T")[0];
    const authFetch = useAuthFetch();
    const [kakeiboDto, setKakeiboDto] = useState({
        username: loggingUsername,
        category: "",
        categoryId: 1,
        tradeDate: today,
        amount: 0,
        homeru: 0,
        memo: ""
    });

    //ドロップリストにカテゴリー一覧を設定
    useEffect(() => {
        try {
            authFetch("http://localhost:8080/kakeibo/categoryParameter")
                .then(res => res.json())
                .then(data => {
                    setCategories(data);
                });
        } catch (err) {
            setErrors("カテゴリー情報の取得に失敗しました:" + err);
        }
    }, [])

    //新規データ作成決定時の処理
    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({});
        try {
            const res = await authFetch("http://localhost:8080/kakeibo/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(kakeiboDto)
            });
            if (!res.ok) {
                let data;
                try {
                    data = await res.json();
                } catch {
                    data = { general: "予期せぬエラーが発生しました" };
                }
                throw data;
            };

            navigate("/home", { state: { refresh: true } });

        } catch (err) {
            //errがオブジェクトでない場合はgeneralに文字列をセット
            if (typeof err === "object" && err !== null) {
                setErrors(err);
            } else {
                setErrors({ general: "サーバーに接続できません" });
            }
        }
    };

    //戻るボタンでホームに移動
    const navigate = useNavigate();
    const moveHome = () => {
        navigate("/home");
    }

    return (
        <>
            <h2>新しい情報</h2>
            <div className={inOut === "IN" ? "income-background" :"outgo-background" }>
            {/*入力を「収入」に切り替えるボタン*/}
                <button
                    className="in-out-button" onClick={() => {
                        setInOut("IN")
                        setKakeiboDto({
                            ...kakeiboDto,
                            categoryId:1
                        })
                    }}>収入</button>
                
            {/*入力を「支出」に切り替えるボタン*/}
                <button
                    className="in-out-button" onClick={() => {
                        setInOut("OUT")
                        setKakeiboDto({
                            ...kakeiboDto,
                            categoryId: 11
                        })
                    }}>支出</button>

            {/*入力フォーム*/}
                <form onSubmit={handleSubmit} >
                    <label className="lbl">入出区分：{inOut === "IN" ? "収入" : "支出"}</label>
                    <br />

                    {/*カテゴリ*/}
                    <select
                        className="select-category"
                        value={kakeiboDto.categoryId}
                        onChange={e =>
                            setKakeiboDto({
                                ...kakeiboDto,
                                categoryId: Number(e.target.value)
                            })
                        }
                    >  
                        {showCategory(categories, inOut)}
                    </select>

                    <br />
                    {/*金額*/}
                    <label htmlFor="moneyInput">金額:</label>
                    <input
                        type="number"
                        value={kakeiboDto.amount}
                        
                        onChange={ (e) => 
                            setKakeiboDto({
                                ...kakeiboDto,
                            amount:Number(e.target.value)
                        })}
                    />
                    {errors.amount && <div>{errors.amount}</div> }
                    <br />

                    {/*日付*/}
                    <label htmlFor="day-input">日付</label>
                    <input type="date"
                    id="day-input"
                        value={kakeiboDto.tradeDate}
                        onChange={e =>
                            setKakeiboDto({
                                ...kakeiboDto,
                                tradeDate: e.target.value
                            })}
                    />
                    <br />

                    {/*メモ*/}
                    <label htmlFor="memo">メモ：</label>
                    <input type="text"
                        id="memo"
                        value={kakeiboDto.memo}
                        onChange={e => 
                            setKakeiboDto({
                                ...kakeiboDto,
                                memo: e.target.value
                        })}
                    />
                    {errors.memo && <div>{errors.memo}</div>}
                    <br />

                    {/*誉めるフラグ*/}
                    <img
                        className="homeru-icon"
                        src={kakeiboDto.homeru === 1 ? "/img/heart.png" : "/img/heart_gray.png"}
                        onClick={() => setKakeiboDto({
                            ...kakeiboDto,
                            homeru: kakeiboDto.homeru === 1 ? 0 : 1
                        })}
                    />
                    <br></br>

                    <button type="submit"
                    id="sender-button">送信</button>
                    
                </form>
                <br></br>
                {errors.general && <div className="error">{errors.general}</div>}
                <button onClick={moveHome}
                id="back-button">戻る</button>
            </div>
        </>
    )
}