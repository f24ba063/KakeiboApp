import { useEffect, useState } from 'react';
import {
    LineChart, Line,
    XAxis, YAxis,
    CartesianGrid, Tooltip, Legend,
    ResponsiveContainer
} from 'recharts';

export default function LineChartDrawer({ authFetch, date, token }) {
    const [lineData, setLineData] = useState([]);
    const [categories, setCategories] = useState([]);
    const COLORS = ['#bb0000', '#00bb00', '#0000bb', '#00bbbb', '#bbbb00', '#bb00bb'];

    useEffect(() => {
        async function fetchData() {
            const res = await authFetch(`http://localhost:8080/graph/line`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ date: date.toISOString().split("T")[0] })
            });

            if (!res.ok) {
                console.error("折れ線グラフデータ取得に失敗しました：" + res.status);
                return;
            }

            const data = await res.json();

            // yearMonth ごとにカテゴリをまとめる
            const map = {};
            const categorySet = new Set();

            data.forEach(d => {
                const yearMonth = d.yearMonth.split("-").slice(0, 2).join("-"); // YYYY-MM
                categorySet.add(d.category);

                if (!map[yearMonth]) {
                    map[yearMonth] = { date: yearMonth }; // date キーに yearMonth をセット
                }

                map[yearMonth][d.category] = d.total;
            });

            // 月昇順にソートして配列化
            const sortedLineData = Object.values(map)
                .sort((a, b) => a.date.localeCompare(b.date));

            setLineData(sortedLineData);
            setCategories(Array.from(categorySet));
        }

        fetchData();
    }, [authFetch, date, token]);

    return (
        <ResponsiveContainer width={600} height={300}>
            <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {categories.map((cat, idx) => (
                    <Line
                        key={cat}
                        type="linear"
                        dataKey={cat}
                        stroke={COLORS[idx % COLORS.length]}
                        activeDot={{ r: 6 }}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}