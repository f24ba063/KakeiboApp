
import { useState, useEffect } from 'react'
import '../../css/newData.css'
export default function NewData() {
       //カテゴリー(category)、日付(tradeDate)、
	    //入出金額(amount)、数値型の誉めるフラグ( homeru =0)、
	//雑記メモ(memo)を入力する

    const [categories, setCategories] = useState([]);
    const [selectedId, setSelectedId] = useState(1);
    const [inOut, setInOut] = useState(true);
    const today = new Date().toISOString().split("T")[0];
    const [kakeibo, setKakeibo] = useState({
        category: "",
        tradeDate: today,
        amount: 0,
        homeru: 0,
        memo: ""
    });

    //ドロップリストにカテゴリー一覧を設定
    useEffect(() => {
        fetch("http://localhost:8080/index/categoryParameter")
            .then((res => res.json()))
            .then(data => setCategories(data));
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();

        const res = await fetch("http://localhost:8080/index/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(kakeibo)
        });

        const data = await res.json();
        console.log(data);
    }

    return (
        <>
            <h2>新しい情報</h2>
            <div>
            {/*入力を「収入」に切り替えるボタン*/}
                <button
                    className="in-out-button" onClick={() => setInOut(true)}>収入</button>
                
            {/*入力を「支出」に切り替えるボタン*/}
                <button
                    className="in-out-button" onClick={() => setInOut(false)}>支出</button>

            {/*入力フォーム*/}
                <form action="@{/save}" onSubmit={handleSubmit}>
                    <label className="lbl">入出区分：{inOut ? "収入" : "支出"}</label>
                    {/*カテゴリ*/}
                    <select
                        value={selectedId}
                        onChange={e => setSelectedId(e.target.value)}
                    >  
                        {categories
                            .filter(e => (e.id <= 10) == inOut)
                            .map(cat => (
                            <option key={cat.id} value={cat.category}>
                                {cat.category}
                            </option>
                        )) }
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
                        src={kakeibo.homeru === 1 ? "img/heart.png" : "img/heart_gray.png"}
                        onClick={() => setKakeibo({
                            ...kakeibo,
                            homeru: kakeibo.homeru === 1 ? 0 : 1
                        })}
                    />

                    <button type="submit">送信</button>
                </form>
            </div>
        </>
    )
}