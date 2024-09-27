import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const today = dayjs();
const addedDate = today.subtract(1,'months');
console.log(addedDate);
console.log(addedDate.format('MMMM D dddd'));

function isWeekend (date) {
    const dateString = date.format('dddd');
    
    if(dateString === 'Saturday' || dateString === 'Sunday'){
        return `date is ${dateString}`;
    }
}
console.log(isWeekend(today.add(2 , 'days')))