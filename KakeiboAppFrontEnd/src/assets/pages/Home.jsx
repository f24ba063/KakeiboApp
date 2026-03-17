
import { useState, useEffect } from 'react';
import getNextSalaryDay from '../../feature/getNextSalaryDay';
import ToggleHeart from '../../feature/ToggleHeart';
import pageMonth from '../../feature/pageMonth'
import CardStyle from '../../feature/CardStyle'
import ListStyle from '../../feature/ListStyle'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useExpressionStyle from "../../feature/useExpressionStyle";

import '../../css/index.css';
import '../../css/mordal-overlay.css';

export default function Home() {
    const now = new Date();
    const [KakeiboDto, setKakeiboDto] = useState([]);//家計簿全データ
    const [monthlyIncome, setMonthlyIncome] = useState(0);//月収
    const [monthlyOutgo, setMonthlyOutgo] = useState(0);//支出
    const [year, setYear] = useState(now.getFullYear());//年を取得
    const [month, setMonth] = useState(now.getMonth() + 1);//月を取得
    const [date, setDate] = useState(now.getDate());//日を取得
    const [salaryGetDay,setSalaryGetDay] = useState(11);//給料日の設定
    //const [salaryDateEditToggle, setSalaryDateEditToggle] = useState(false);
    const [warning, setWarning] = useState("");
    const nextSalaryDay = getNextSalaryDay(salaryGetDay);
    const navigate = useNavigate();
    const { expressionStyle, changeStyle } = useExpressionStyle();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [payDay, setPayDay] = useState(11);
    const [editPayDay, setEditPayDay] = useState(1);
    const location = useLocation();
    const message = location.state?.message || "";

    //家計簿の当該月のデータを引き入れている
    //日付まで取得しているのは、日付と給料日の兼ね合いで
    //出力される家計簿の月が違うから
    useEffect(() => {
        fetch(`http://localhost:8080/index/${year}/${month}/${date}`,
            { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                if (data.status === "EMPTY") {
                    setWarning("この月にはデータが存在しません");
                } else if (data.status === "AFTER_NEWEST") {
                    setWarning("これより後のデータはありません");
                } else if (data.status === "BEFORE_OLDEST") {
                    setWarning("最古のデータ以前の月は閲覧できません！");
                } else {
                    setWarning("");
                };

                //取得情報から一か月分の収支を計算
                const kdto = data.data;
                setKakeiboDto(kdto);
                //収入
                const MonthIn = kdto.filter(k => k.inOut === "IN");
                let sm = 0;
                MonthIn.forEach(e => {
                    sm += e.amount;
                });
                setMonthlyIncome(sm);
                //支出
                const Monthout = kdto.filter(k => k.inOut === "OUT");
                let su = 0;
                Monthout.forEach(e => {
                    su += e.amount;
                });
                setMonthlyOutgo(su);
            });
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

    //頑張った数を計上してハート付与の参考にする
    const heartCount = KakeiboDto.filter(m => m.homeru == 1).length;

    //詳細情報ページへ遷移
    const moveDetail = (id) => { navigate(`/showdata/${id}`) }

    //給料日設定
    const setSala = (e) =>{
        if(e > 28){
            setSalaryGetDay(28);
            setWarning("29日以降は給料日として設定できません");
        }
       else  if(e < 1){
            setSalaryGetDay(1);
            setWarning("1日以前は給料日として設定できません");
        }
        else{
            setSalaryGetDay(e);
        }
    }

    return (
        <>
            <div id="outbounds">
                <h1>家計簿アプリ練習</h1> 
                {/*上の段・収支個別表示＋給料日表示*/}
                <div id="first-line">
                    <h3>
                        <span className="top-lines">{formatDate2(year, month)}収入：{monthlyIncome}</span>
                        <span className="top-lines">{formatDate2(year, month)}支出：{monthlyOutgo}</span>
                        <span className="top-lines">
                            給料日：
                            <span onClick={() => setIsModalOpen(true)}>
                                {payDay}
                            </span>
                            日
                        </span>
                    </h3>
                    {isModalOpen && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <h3>給料日を入力</h3>

                                <input
                                    type="number"
                                    value={payDay}
                                    onChange={(e) => setEditPayDay(e.target.value)}
                                />

                                <button onClick={() => {
                                    setPayDay(editPayDay);
                                    setEditPayDay(1);
                                    setIsModalOpen(false)
                                }
                                }>
                                    保存
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {/*下の団・収支総計、次の給料日、頑張った総数表示*/}
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

                {/*他画面から遷移したとき、メッセージを表示する共用スペース*/}
                {message && (
                    <div className="system-message">
                        {message}
                    </div>
                ) }


                <div id="paging">
                    <span>
                        {/*表示形式をカード・リストで切り替えるスイッチ*/}
                        <button
                            type="button"
                            id="expression-style-button"
                            onClick={changeStyle}>
                            {expressionStyle === "card" ? "リスト形式表示" : "カード形式表示"}
                        </button>
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
                        <Link id="new-information-button" to="/newdata">追加</Link>
                    </span>

                    {/*表示ページをめくったとき、データが無かった時の各種警告文*/}
                    <p id="warning">{warning}</p>
                </div>

                {/*-------------------------------------------------------------*/}

                {/*収支カードの表示*/}
                {expressionStyle==="card" ? 
                    <CardStyle
                        KakeiboDto={KakeiboDto}
                        moveDetail={moveDetail}
                        ToggleHeart={ToggleHeart}
                        setKakeiboDto={setKakeiboDto}
                        dateGet={dateGet} />
                    :
                    <ListStyle
                        KakeiboDto={KakeiboDto}
                        moveDetail={moveDetail}
                        ToggleHeart={ToggleHeart}
                        setKakeiboDto={setKakeiboDto}
                        dateGet={dateGet} />
                }
            </div>
        </>
    );
}