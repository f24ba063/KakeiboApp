export default function getNextSalaryDay(salaryGetDay){
	const today = new Date();

	//今日が給料日よりも後なら、翌月の給料日を出す
	const addMonth = today.getDate() > salaryGetDay ? 1 : 0;

	const d =  new Date(
		today.getFullYear(),
		today.getMonth() + addMonth,
		salaryGetDay
	);

	const yyyy = d.getFullYear() % 100;
	const mm = String(d.getMonth() + 1).padStart(2, '0');
	const dd = String(d.getDate()).padStart(2, '0');

	return `${yyyy}年${mm}月${dd}日`;
}