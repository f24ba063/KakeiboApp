import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, LabelList } from 'recharts';

export default function PieChartDrawer({ authFetch, date, token }) {
    const [pieData, setPieData] = useState([]);//円グラフに入る数値
    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#6FDFE4'];//円グラフの塗り色
    const TEXT = ['black', 'black', 'black', 'black', 'black', 'black', 'black'];
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    try {
        useEffect(() => {
            async function fetch() {
                const res = await authFetch(`http://localhost:8080/graph/pie`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ date: date.toISOString().split("T")[0] })
                });
                if (res.ok) {
                    const data = await res.json();
                    //データをまとめないとグラフに両方表示できない
                    const newData = data.map(d => ({
                        ...d,
                        label: `${d.category} : ${d.total}`
                    }));
                    setPieData(newData);
                    //console.log(pieData);
                } else {
                    console.error("円グラフデータ取得に失敗しました：" + res.status);
                }
            }
        }
    }catch (err) {
        console.log(err);
    } finally {
        setLoading(false);
    };
    fetch();
    }, []);

    return (
        <>
            <PieChart width={600} height={300}
                id="pieChart-background">
                <Pie
                    data={pieData}
                    dataKey="total"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    startAngle={90}
                    endAngle={450}

                    label={(props) => {
                        const { cx, cy, midAngle, outerRadius, index } = props;

                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius + 20;

                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);

                        const label = pieData[index].label;

                        return (
                            <g>
                                <rect
                                    x={x}
                                    y={y}
                                    rx={6}
                                    ry={6}
                                    width={100}
                                    height={24}
                                    fill="#bbb"
                                    opacity="0.5"
                                />
                                <text
                                    x={x}
                                    y={y}
                                    textAnchor="middle"
                                    dy={4}
                                    fill="black"
                                    ref={(el) => {
                                        if (!el) return;

                                        const box = el.getBBox();
                                        const rect = el.previousSibling;

                                        rect.setAttribute("x", box.x - 4);
                                        rect.setAttribute("y", box.y - 4);
                                        rect.setAttribute("width", box.width + 8);
                                        rect.setAttribute("height", box.height + 4);
                                    } }
                                >
                                    {label}
                                </text>
                            </g>
                        );
                    }}
                >
                    {pieData.map((p, index) => {
                        return (
                                <Cell key={p.category} fill={COLORS[index]} />
                        );
                    })}
                    {/*<LabelList*/}
                    {/*className="label-list"*/}
                    {/*    dataKey="label"*/}
                    {/*    position="outside"*/}
                    {/*    fill="black"*/}
                    {/*/>*/}


                </Pie>
            </PieChart>
        </>

    )
}