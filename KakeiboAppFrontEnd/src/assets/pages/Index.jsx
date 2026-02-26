
import { useState } from 'react';
import { useEffect } from 'react';
import getNextSalaryDay from '../../feature/getNextSalaryDay';
import pageMonth from '../../feature/pageMonth'
import '../../css/index.css';

export default function Index() {
    const now = new Date();
    const [KakeiboDto, setKakeiboDto] = useState([]);//家計簿全データ
    const [monthlyIncome, setMonthlyIncome] = useState(0);//月収
    const [monthlyOutgo, setMonthlyOutgo] = useState(0);//支出
    //const [monthlyBalance, setMonthlyBalance] = useState(0);
    const [year, setYear] = useState(now.getFullYear());//年を取得
    const [month, setMonth] = useState(now.getMonth() + 1);//月を取得
    const [date, setDate] = useState(now.getDate());//日を取得
    const [warning, setWarning] = useState("");

    const nextSalaryDay = getNextSalaryDay();

    //家計簿の当該月のデータを引き入れている
    //日付まで取得しているのは、日付と給料日の兼ね合いで
    //出力される家計簿の月が違うから
    useEffect(() => {
        fetch(`http://localhost:8080/index/${year}/${month}/${date}`,
            { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                if (data.status === "BEFORE_OLDEST") {
                    setWarning("最古のデータ以前の月は閲覧できません！");
                } else if (data.status === "AFTER_NEWEST") {
                    setWarning("これより後のデータはありません");
                } else if (data.status === "EMPTY") {
                    setWarning("この月にはデータが存在しません");
                } else {
                    setWarning("");
                }

                setKakeiboDto(data.data)
            });
    
    //今月の収入を取得
        fetch(`http://localhost:8080/index/monthlyIncome/${year}/${month}/${date}`,
            { cache: "no-store" })
            .then(res => { return res.json(); })
            .then(data => { setMonthlyIncome(data) }
            );
    //今月の支出を取得
        fetch(`http://localhost:8080/index/monthlyOutgo/${year}/${month}/${date}`,
            { cache: "no-store" })
            .then(res => { return res.json(); })
            .then(data => { setMonthlyOutgo(data) }
            );
    }, [year, month, date]);

    //「今月収入・支出」の表現に使うための年・月を取得
    function formatDate2(year, month) {
        return `${year}年${month}月`;
    }

    //家計簿カードに表示される日付をデータベースから設定するのに使う
    function dateGet(ry) {
        const y = new Date(ry);
        const year = y.getYear() % 100;
        const month = y.getMonth() + 1;
        const day = y.getDate();
        return `${year}/${month}/${day}`;
    }

    return (
        <>
            <div id="outbounds">
                <h1>家計簿アプリ練習</h1> 
                <h3>
                    <span className="top-lines">{formatDate2(year, month)}収入：{monthlyIncome}</span>
                    <span className="top-lines">{formatDate2(year, month)}支出：{monthlyOutgo}</span>
                    <span className="top-lines">次の給料日：{nextSalaryDay }</span>
                </h3>

                <h3>
                    <span className="top-lines">今月収入/支出：{monthlyIncome > monthlyOutgo ? "+" : ""}{monthlyIncome - monthlyOutgo }</span>
                    <span className="top-lines">次の給料日： {nextSalaryDay}</span>
                    <span></span>
                </h3>

                <div id="paging">
                    <span>
                        <button type="button" className="paging-button" onClick={() =>
                            pageMonth("back", year, month, setMonth, setYear)}
                            disabled={warning === "最古のデータ以前の月は閲覧できません！" }>
                        前の月</button>
                        <button type="button" className="paging-button" onClick={() => 
                            pageMonth("forward", year, month, setMonth, setYear)}
                            disabled={warning === "これより後のデータはありません"}>
                        後の月</button>
                        <button type="button">追加</button>
                    </span>
                    <p id="warning">{warning}</p>
                </div>

                <div id="card-base">
                    {KakeiboDto
                        .map(e => (
                        //カード形式にした各種入出金
                        <ul key={e.id} id="trade-card">
                            {/*日付文字列*/}
                            <li id="date-figure-character">
                                <h3>{dateGet(e.tradeDate)}</h3>
                            </li>
                            <div id="date-figure-background"></div>
                            {/*入出金カテゴリー文字列*/}
                            <li id="category-figure-character">
                                <h3>{e.category} : {e.amount}</h3>
                            </li>
                            <div id="category-figure-background"></div>
                            {/*詳細メモ文字列*/}
                            <li id="memo-figure-character"><h3
                            >{e.memo}</h3></li>
                            <div id="memo-figure-background"></div>
                        </ul>
                    ))}
                </div>
            </div>
        </>
    );
}