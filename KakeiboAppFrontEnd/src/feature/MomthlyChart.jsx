import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useAuthFetch } from "../../hooks/useAuthFetch";

export default function MonthlyChart() {
    const [data, setData] = useState([]);
    const { loggingUsername } = useContext(UserContext);
    const authFetch = useAuthFetch();

    useEffect(() => {
        async function fetchData() {
            const res = await authFetch(
                `http://localhost:8080/monthly-summary/${loggingUsername}`
            );
            const json = await res.json();
            setData(json);
        }
        fetchData();
    }, []);

    return (
        <BarChart width={600} height={300} data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" />
            <Bar dataKey="expense" />
        </BarChart>
    );
}