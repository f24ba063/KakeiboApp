export default function getNextSalaryDay(){
	const today = new Date();

	const addMonth = today.getDate() >= 12 ? 1 : 0;

	const d =  new Date(
		today.getFullYear(),
		today.getMonth() + addMonth,
		11
	);

	const yyyy = d.getFullYear() % 100;
	const mm = String(d.getMonth() + 1).padStart(2, '0');
	const dd = String(d.getDate()).padStart(2, '0');

	return `${yyyy}年${mm}月${dd}日`;
}