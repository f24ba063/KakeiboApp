import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useAuthFetch } from "../hooks/useAuthFetch";
//import '../css/monthly-chart.css'

export default function MonthlyChart() {
    const [data, setData] = useState([]);
    const { loggingUsername } = useContext(UserContext);
    const authFetch = useAuthFetch();

    useEffect(() => {
        async function fetchData() {
            const res = await authFetch(
                `http://localhost:8080/kakeibo/monthly-summary/${loggingUsername}`
            );
            const json = await res.json();
            console.log(json);
            setData(json);
        }
        fetchData();
    }, []);

    return (
        <BarChart width={600} height={300} data={data} id="background">
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" name="収入" fill="#4CAF50" />
            <Bar dataKey="outGo" name="支出" fill="#F44336" />
        </BarChart>
    );
}