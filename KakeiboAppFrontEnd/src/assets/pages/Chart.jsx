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
    const token = sessionStorage.getItem("jws");

    return (
        <>
            <button type="button"
                onClick={() => navigate("/home")}
            >ホームへ
                </button>
            <PieChartDrawer authFetch={authFetch} date={date} token={token} />
            <LineChartDrawer authFetch={authFetch} date={date} token={token} />
            <BarChartDrawer authFetch={authFetch} date={date} token={token} />
        </>
    )
}