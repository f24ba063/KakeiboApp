export default async function monthlyInOut(
    year, month, date,
    setWarning, setKakeiboDto, setMonthlyIncome, setMonthlyOutgo,
    authFetch
) {
    try {
        const res = await authFetch(`http://localhost:8080/kakeibo/${year}/${month}/${date}`,
            { cache: "no-store" });

        const data = await res.json();
        
        switch (data.status) {
            case "NEW_USER":
                setWarning("初めまして！");
                break;
            case "EMPTY":
                setWarning("この月にはデータが存在しません");
                break;
            case "AFTER_NEWEST":
                setWarning("これより後のデータはありません");
                break;
            case "BEFORE_OLDEST":
                setWarning("最古のデータ以前の月は閲覧できません！");
                break;
            default:
                setWarning("");
            }
            
            //取得情報から一か月分の収支を計算
            const kdto = Array.isArray(data.data) ? data.data : [];
            setKakeiboDto(kdto);
            //収入
            const MonthIn = kdto.filter(k => k.inOut === "IN");
            let sm = 0;
            MonthIn.forEach(e => {
                sm += e.amount ?? 0;
            });
            setMonthlyIncome(sm);
            //支出
            const MonthOut = kdto.filter(k => k.inOut === "OUT");
            let su = 0;
            MonthOut.forEach(e => {
                su += e.amount ?? 0;
            });
            setMonthlyOutgo(su);
        }catch(err) {
            setWarning("データ取得に失敗しました：" + err);
            console.log("月次データ取得に失敗しました");
            setMonthlyIncome(0);
            setMonthlyOutgo(0);
        }
}