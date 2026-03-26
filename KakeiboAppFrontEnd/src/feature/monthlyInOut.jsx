export default function monthlyInOut(
    year, month, date,
    setWarning, setKakeiboDto, setMonthlyIncome, setMonthlyOutgo,
    authFetch
) {
    authFetch(`http://localhost:8080/kakeibo/${year}/${month}/${date}`,
        { cache: "no-store" })
        .then(res => res.json())
        .then(data => {
            if (data.status === "NEW_USER") {
                setWarning("初めまして！");
            }else if (data.status === "EMPTY") {
                setWarning("この月にはデータが存在しません");
            } else if (data.status === "AFTER_NEWEST") {
                setWarning("これより後のデータはありません");
            } else if (data.status === "BEFORE_OLDEST") {
                setWarning("最古のデータ以前の月は閲覧できません！");
            } else {
                setWarning("");
            };

            //取得情報から一か月分の収支を計算
            const kdto = data.data;
            setKakeiboDto(kdto);
            //収入
            const MonthIn = kdto.filter(k => k.inOut === "IN");
            let sm = 0;
            MonthIn.forEach(e => {
                sm += e.amount;
            });
            setMonthlyIncome(sm);
            //支出
            const MonthOut = kdto.filter(k => k.inOut === "OUT");
            let su = 0;
            MonthOut.forEach(e => {
                su += e.amount;
            });
            setMonthlyOutgo(su);
        });
}