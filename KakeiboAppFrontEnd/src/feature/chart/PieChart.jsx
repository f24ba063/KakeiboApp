import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, LabelList } from 'recharts';
import { useAuthFetch } from '../../hooks/useAuthFetch';


export default function PieChartDrawer() {
    const authFetch = useAuthFetch();//認証つきのfetch
    const [pieData, setPieData] = useState([]);//円グラフに入る数値
    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#6FDFE4'];//円グラフの塗り色
    const TEXT = ['black', 'black', 'black', 'black', 'black', 'black', 'black'];
    const date = new Date();//アクセスしたときの日取りを取得
    const token = sessionStorage.getItem("jws");

    useEffect(() => {
        async function fetch() {
            const res = await authFetch(`http://localhost:8080/graph/pie`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({date: date.toISOString().split("T")[0] })
            });
            if (res.ok) {
                const data = await res.json();
                setPieData(data);
                console.log(data);
            } else {
                console.error("円グラフデータ取得に失敗しました：" + res.status);
            }
        }
        fetch();
    }, []);

    return (
        <>
            <PieChart width={300} height={300}>
                <Pie
                    data={pieData}
                    dataKey="total"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    startAngle={90}
                    endAngle={450}
                    label={false}
                >
                    {pieData.map((p, index) => {
                        return (
                            <>
                                <Cell
                                    key={p.category}
                                    fill={COLORS[index]}
                                />
                               
                            </>
                        );
                    })}
                    <LabelList
                        dataKey="category"
                        formatter={(value, name, entry) =>
                            value + entry.category
                        }
                    />
                </Pie>
            </PieChart>
        </>

    )
}