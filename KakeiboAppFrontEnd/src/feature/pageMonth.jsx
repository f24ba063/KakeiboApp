export default function pageMonth(step, year, month,setMonth,setYear) {
    let newYear = year;
    let newMonth = month;

    if (step == "forward") {
        newMonth = month == 12 ? 1 : month + 1;
        newYear  = month == 12 ? year + 1 : year;
    } else {
        newMonth = month == 1 ? 12 : month - 1;
        newYear =  month == 1 ? year - 1 : year;
    }

    setYear(newYear);
    setMonth(newMonth);
}