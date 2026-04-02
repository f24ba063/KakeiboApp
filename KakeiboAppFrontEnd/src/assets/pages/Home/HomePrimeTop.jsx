export default function HomePrimeTop({ year, month, currentPayday,
    setIsModalOpen, isModalOpen, monthlyIncome, monthlyOutgo }) {
    //「今月収入・支出」の表現に使うための年・月を取得
    function formatDate2(year, month) {
        return `${year}年${month}月`;
    }

    return (
        <div id="first-line">
            <h3>
                <span className="top-lines">{formatDate2(year, month)}収入：{monthlyIncome}</span>
                <span className="top-lines">{formatDate2(year, month)}支出：{monthlyOutgo}</span>
                <span className="top-lines">給料日：{currentPayday}日</span>
                <span>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}>
                        給料日変更
                    </button>
                </span>
            </h3>
            {isModalOpen && <Modal /> }
        </div>
    )

}