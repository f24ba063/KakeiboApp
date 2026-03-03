
import { useState } from 'react';
import { useEffect } from 'react';
import getNextSalaryDay from '../../feature/getNextSalaryDay';
import pageMonth from '../../feature/pageMonth'
import { Link, useNavigate } from 'react-router-dom'
import '../../css/index.css';

export default function Index() {
    const now = new Date();
    const [KakeiboDto, setKakeiboDto] = useState([]);//家計簿全データ
    const [monthlyIncome, setMonthlyIncome] = useState(0);//月収
    const [monthlyOutgo, setMonthlyOutgo] = useState(0);//支出
    const [year, setYear] = useState(now.getFullYear());//年を取得
    const [month, setMonth] = useState(now.getMonth() + 1);//月を取得
    const [date, setDate] = useState(now.getDate());//日を取得
    const [warning, setWarning] = useState("");
    const nextSalaryDay = getNextSalaryDay();
    const navigate = useNavigate();

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
                };
                console.log("fetch結果:", data.data); // ← ここで確認
                setKakeiboDto(data.data);
            });
    
    //今月の収入を取得
        fetch(`http://localhost:8080/index/monthlyIncome/${year}/${month}/${date}`,
            { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                setMonthlyIncome(data)
            }
            );
    //今月の支出を取得
    fetch(`http://localhost:8080/index/monthlyOutgo/${year}/${month}/${date}`,
        { cache: "no-store" })
        .then(res => res.json())
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

    //カード上のハートマークをクリックすると、homeruフラグが変遷する
    const toggleHomeru = async (id, current) => {
        await fetch(`http://localhost:8080/index/homeru/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                homeru: current === 1 ? 0 : 1
            })
        });

        setKakeiboDto(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, homeru: current === 1 ? 0 : 1 }
                    : item
            )
        );
    };

    //頑張った数を計上して♡付与に参考する
    const heartCount = KakeiboDto.filter(m => m.homeru == 1).length;

    //詳細情報ページへ遷移
    const moveDetail = (id) => { navigate(`/showdata/${id}`) }

    return (
        <>
            <div id="outbounds">
                <h1>家計簿アプリ練習</h1> 
                <h3>
                    <span className="top-lines">{formatDate2(year, month)}収入：{monthlyIncome}</span>
                    <span className="top-lines">{formatDate2(year, month)}支出：{monthlyOutgo}</span>
                    <span className="top-lines">次の給料日：{nextSalaryDay }</span>
                </h3>
                <div id="second-line">
                    <h3>
                        <span className="top-lines">今月収入/支出：{monthlyIncome > monthlyOutgo ? "+" : ""}{monthlyIncome - monthlyOutgo }</span>
                        <span className="top-lines">次の給料日： {nextSalaryDay}</span>
                    </h3>
                    <span className="top-lines" id="heart-row">
                        <h3 className="ganbatta-title">がんばった：</h3>
                        {Array.from({ length: heartCount }).map((_, i) => (
                        <img
                            className="ganbatta"
                            key={i}
                            src="/img/heart.png"
                            alt="heart"
                        />
                    ))}
                    </span>
                </div>
                

                <div id="paging">
                    <span>
                        {/*前の月への移動リンク*/}
                        <button type="button" className="paging-button" onClick={() =>
                            pageMonth("back", year, month, setMonth, setYear)}
                            disabled={warning === "最古のデータ以前の月は閲覧できません！" }>
                            前の月</button>

                        {/*次の月への移動リンク*/}
                        <button type="button" className="paging-button" onClick={() => 
                            pageMonth("forward", year, month, setMonth, setYear)}
                            disabled={warning === "これより後のデータはありません"}>
                            後の月</button>

                        {/*新規データ登録ページへ*/}
                        <Link className="paging-button" to="/newdata">追加</Link>
                    </span>

                    {/*表示ページをめくったとき、データが無かった時の各種警告文*/}
                    <p id="warning">{warning}</p>
                </div>

                <div id="card-base">
                    {KakeiboDto
                        .filter(e => e.softDelete != 9)
                        .map(e => (
                            //カード形式にした各種入出金データ
                            <ul key={e.id} id="trade-card"
                                onClick={() => {
                                    moveDetail(e.id)
                                }}
                                >

                                {/*褒めるハートマークイメージ*/}
                                <img
                                    src={e.homeru === 1 ? "/img/heart.png" : "/img/heart_gray.png"}
                                    alt="heart"
                                    className="card-heart"
                                    onClick={() => toggleHomeru(e.id, e.homeru) }
                                />
                                {/*日付文字列*/}
                                <li className="block">
                                    <h3>{dateGet(e.tradeDate)}</h3>
                                </li>

                                {/*入出金カテゴリー文字列*/}
                                <li className="block">
                                    <h3>{e.category} : {e.amount}</h3>
                                </li>

                                {/*詳細メモ文字列*/}

                                <li className="comment-block" >
                                    <h3>{e.memo}</h3>
                                </li>
                            </ul>
                    ))}
                </div>
            </div>
        </>
    );
}