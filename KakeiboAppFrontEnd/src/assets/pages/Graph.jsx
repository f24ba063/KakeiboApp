import { useAuthFetch } from '../../hooks/useAuthFetch';
import { useState, useEffect, useContext } from 'react';

export default function Graph() {
    const [pieData, setPieData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [barData, setBarData] = useState([]);
    const authFetch = useAuthFetch();

    // 円グラフ
    const fetchPie = async (yearMonth) => {
        const res = await authFetch(`http://loclhost:8080/graph/pie?yearMonth=${yearMonth}`);
        return await res.json();
    };

    // 折れ線
    const fetchLine = async () => {
        const res = await authFetch(`http://loclhost:8080/graph/line`);
        return await res.json();
    };

    // 棒グラフ
    const fetchBar = async () => {
        const res = await authFetch(`http://loclhost:8080/graph/bar`);
        return await res.json();
    };

    useEffect(() => {
        fetchPie("2026-03").then(setPieData);
        fetchLine().then(setLineData);
        fetchBar().then(setBarData);
    }, []);

    const formatLineData = (data) => {
        const result = {};

        data.forEach(row => {
            if (!result[row.month]) {
                result[row.month] = { month: row.month };
            }
            result[row.month][row.category] = row.total;
        });

        return Object.values(result);
    };

    const formattedLine = formatLineData(lineData);
}