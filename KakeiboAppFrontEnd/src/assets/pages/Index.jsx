
import { useState } from 'react';
import { useEffect } from 'react';
import '../../css/index.css';

export default function Index() {
    const now = new Date();
    const [KakeiboDto, setKakeiboDto] = useState([]);//家計簿全データ
    const [monthlyIncome, setMonthlyIncome] = useState(0);//月収
    const [monthlyOutgo, setMonthlyOutgo] = useState(0);//支出
    const [year, setYear] = useState(now.getFullYear());//年を取得
    const [month, setMonth] = useState(now.getMonth() + 1);//月を取得
    const [date, setDate] = useState(now.getDate());//日を取得
    const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);//現在の月を取得

    //家計簿の全データを引き入れている
    useEffect(() => {
        fetch('http://localhost:8080/index',
            { cache: "no-store" } )
            .then(res => res.json())
            .then(data => setKakeiboDto(data));
    }, []);

    //今月の収入を取得
    useEffect(() => {
        fetch(`http://localhost:8080/index/monthlyIncome/${year}/${month}/${date}`,
            { cache: "no-store" } )
            .then(res => { return res.json();})
            .then(data => { setMonthlyIncome(data)}
            );
    }, []);

    //今月の支出を取得
    useEffect(() => {
        fetch(`http://localhost:8080/index/monthlyOutgo/${year}/${month}/${date}`,
            { cache: "no-store" }
        )
            .then(res => { return res.json();})
            .then(data => { setMonthlyOutgo(data) }
            );
    }, []);

    //useEffetct(() => {
    //    fetch('http://localhost:8080/index/checkExisting')
    //        .then(res => res.json())
    //        .then(data => set)
    //})

    function formatDate2(year,month) {
        return `${year}年${month}月`;
    }

    function dateGet(ry) {
        const y = new Date(ry);
        const year = y.getYear() % 100;
        const month = y.getMonth() + 1;
        const day = y.getDate() + 1;
        return `${year}/${month}/${day}`;
        }

    return (
        <>
            <h1>家計簿アプリ練習</h1>
            <h3>
                <span>{formatDate2(year,month)}収入：{monthlyIncome}</span>
                <br />
                <span>{formatDate2(year,month)}支出：{monthlyOutgo}</span>
            </h3>

            <div id="paging">

                <span>
                    <button type="button">前の月</button>
                    <button type="button">次の月</button>
                </span>

            </div>
            <br /><br />


            <div id="card-base">
                {KakeiboDto.
                    filter(e => new Date(e.tradeDate).getMonth() + 1 == currentMonth )

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
        </>
    );
}