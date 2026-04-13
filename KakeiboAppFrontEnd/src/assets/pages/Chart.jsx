import { useEffect } from 'react';

import PieChartDrawer from '../../feature/chart/PieChart';
import LineChartDrawer from '../../feature/chart/LineChart';
import BarChartDrawer from '../../feature/chart/BarChart';
import { useNavigate } from "react-router-dom";
import { useAuthFetch } from '../../hooks/useAuthFetch';
import '../../css/chart.css';

export default function Chart() {
    const navigate = useNavigate();
    const authFetch = useAuthFetch()
    const date = new Date();
    let year = date.getFullYear();
    const month = date.getMonth() === 0 ? 12 : date.getMonth();//「0月」が発生したときの処理
    if (month === 1) year -= 1; //月またぎで去年になったときの処理
    const sixMonthsAgo = month > 7 ? month - 5 : month + 7; //半年前の月を計算
    const sixMonthsAgoYear = sixMonthsAgo > 6 ? year - 1: year;

    const token = sessionStorage.getItem("jws");

    const handleAuthFetch = () =>{
        navigate("/login");
    }

    useEffect(() => {
        if (!token) {
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    }, [token, navigate]);

    if (!token) {
        return (
            <h2 style={{ color: "red" }}>認証情報がありません。ログイン画面へ移動します....</h2>
        )
    }

    return (
        <>
            
            <button type="button"
                onClick={() => navigate("/home")}
            >ホームへ
            </button>
            <div id = "chart">
                <span>
                    <h3>{year}年{month}月の支出</h3>
                    <PieChartDrawer authFetch={authFetch} date={date} token={token} onAuthFetch={handleAuthFetch} />
                </span>
                <span>
                    <h3>{sixMonthsAgoYear}年{sixMonthsAgo}月 ～ {year}年{month}月の支出グラフ</h3>
                    <LineChartDrawer authFetch={authFetch} date={date} token={token} onAuthFetch={handleAuthFetch} />
                </span>
                <span>
                    <h3>{sixMonthsAgoYear}年{sixMonthsAgo}月 ～ {year}年{month}月の収支バランス</h3>
                    <BarChartDrawer authFetch={authFetch} date={date} token={token} onAuthFetch={handleAuthFetch} />
                </span>
            </div>
        </>
    )
}