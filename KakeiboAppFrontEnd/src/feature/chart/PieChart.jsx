import { useEffect } from 'react';
import { useAuthFetch } from '../../hooks/useAuthFetch';

export default function PieChart() {
    const authFetch = useAuthFetch();
    const date = new Date();
    
    useEffect(() => {
        async function fet() {
            const res = await authFetch(`http://localhost:8080/graph/pie`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(date.toISOString().split("T")[0])
            });
            console.log(date);
            //const data = await res.json();
            //console.log(data);
        }
        fet();
    }, []);
}