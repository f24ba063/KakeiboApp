import { useEffect, useState } from 'react';
import {
    BarChart, Bar, 
    XAxis, YAxis, 
    Tooltip,  Legend, CartesianGrid
} from 'recharts';

export default function BarChartDrawer({ authFetch, date, token, onAuthFetch }) {
    const [barData, setBarData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                const res = await authFetch(`http://localhost:8080/graph/bar`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ date: date.toISOString().split("T")[0] })
                });

                if (!res || !res.ok) {
                    if (res.status === 401) { 
                        onAuthFetch();
                        return;
                    }
                    throw new Error("データの取得に失敗しました");
                }

                const data = await res.json();

                if (!Array.isArray(data)) {
                    throw new Error("取得データが配列ではありません");
                }

                // 月順ソート（安全策）
                const sortedData = [...data].sort((a, b) => a.month.localeCompare(b.month));
                setBarData(sortedData);
            } catch (err) {
                console.error(err);
                setError("棒グラフの表示に失敗しました：" + (err.message || "不明なエラー"));
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [authFetch, date, token]);

    return (
        <>
            {loading && <h2>Loading....</h2>}
            {error && <h2 style={{ color: "red" }}>棒グラフの表示に失敗しました:{error}</h2>}

            <BarChart
                width={600}
                height={300}
                data={barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />  {/* グリッド線 */}
                <XAxis dataKey="month" />                {/* X軸に month */}
                <YAxis />                                {/* Y軸は自動スケール */}
                <Tooltip />                              {/* ホバー時に値表示 */}
                <Legend />                               {/* 収入・支出の凡例 */}
                <Bar dataKey="income" fill="#A2daBd" />  {/* 収入の棒 */}
                <Bar dataKey="outGo" fill="#8884d8" />   {/* 支出の棒 */}
            </BarChart>
        </>
    );
}