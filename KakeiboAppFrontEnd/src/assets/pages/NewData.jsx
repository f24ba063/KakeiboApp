
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../../css/newData.css'
import showCategory from '../../feature/showCategory';
export default function NewData() {
       //カテゴリー(category)、日付(tradeDate)、
	    //入出金額(amount)、数値型の誉めるフラグ( homeru =0)、
	//雑記メモ(memo)を入力する

    const [categories, setCategories] = useState([]);
    const [inOut, setInOut] = useState(true);
    const today = new Date().toISOString().split("T")[0];
    const [kakeibo, setKakeibo] = useState({
        categoryId: 1,
        tradeDate: today,
        amount: 0,
        homeru: 0,
        memo: ""
    });

    //ドロップリストにカテゴリー一覧を設定
    useEffect(() => {
        fetch("http://localhost:8080/index/categoryParameter")
            .then(res => res.json())
            .then(data => setCategories(data))
            .then(data => console.log(data));
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();
        
        await fetch("http://localhost:8080/index/save", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(kakeibo)
        });
        navigate("/index");
    };

    //戻るボタンでホームに移動
    const navigate = useNavigate();
    const moveHome = () => {
        navigate("/index");
    }

    return (
        <>
            <h2>新しい情報</h2>
            <div id="new-data">
            {/*入力を「収入」に切り替えるボタン*/}
                <button
                    className="in-out-button" onClick={() => setInOut(true)}>収入</button>
                
            {/*入力を「支出」に切り替えるボタン*/}
                <button
                    className="in-out-button" onClick={() => setInOut(false)}>支出</button>

            {/*入力フォーム*/}
                <form onSubmit={handleSubmit} >
                    <label className="lbl">入出区分：{inOut ? "収入" : "支出"}</label>
                    {/*カテゴリ*/}
                    <select
                        value={kakeibo.categoryId}
                        onChange={e =>
                            setKakeibo({
                                ...kakeibo,
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
                        value={kakeibo.amount}
                        onChange={ (e) => 
                        setKakeibo({
                            ...kakeibo,
                            amount:Number(e.target.value)
                        })}
                    />
                    <br />

                    {/*日付*/}
                    <label htmlFor="day-input">日付</label>
                    <input type="date"
                    id="day-input"
                        value={kakeibo.tradeDate}
                        onChange={e =>
                            setKakeibo({
                                ...kakeibo,
                                tradeDate: e.target.value
                            })}
                    />
                    <br />

                    {/*メモ*/}
                    <label htmlFor="memo">メモ：</label>
                    <input type="text"
                        id="memo"
                        value={kakeibo.memo}
                        onChange={e => 
                            setKakeibo({
                                ...kakeibo,
                                memo: e.target.value
                        })}
                    />
                    <br />

                    {/*誉めるフラグ*/}
                    <img
                        className="homeru-icon"
                        src={kakeibo.homeru === 1 ? "/img/heart.png" : "/img/heart_gray.png"}
                        onClick={() => setKakeibo({
                            ...kakeibo,
                            homeru: kakeibo.homeru === 1 ? 0 : 1
                        })}
                    />
                    <br></br>

                    <button type="submit"
                    id="sender-button">送信</button>
                    
                </form>
                <br></br>

                <button onClick={moveHome}
                id="back-button">戻る</button>
            </div>
        </>
    )
}