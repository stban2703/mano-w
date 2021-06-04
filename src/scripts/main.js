function getDateToTimestamp(date) {
    let dateParts = date.split("-");
    let newDate = new Date(dateParts[0], (parseInt(dateParts[1]) - 1).toString(), dateParts[2]);
    return newDate.getTime();
}

function getTimestampToDate(timestamp) {
    let newDate = new Date(timestamp);
    let day = newDate.getDate().toString().length < 2 ? `0${newDate.getDate()}` : newDate.getDate();
    let intMonth = parseInt(newDate.getMonth());
    let month = intMonth.toString().length < 2 ? `0${intMonth + 1}` : `${intMonth + 1}`;
    let year = newDate.getFullYear();
    let formattedDate = `${day}/${month}/${year}`
    return formattedDate;
}

function getTimestampToFullDate(timestamp) {
    let weekDayList = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let monthNameList = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let newDate = new Date(timestamp);
    let dayName = weekDayList[newDate.getDay()];
    let day = newDate.getDate().toString().length < 2 ? `0${newDate.getDate()}` : newDate.getDate();
    let monthName = monthNameList[newDate.getMonth()];
    let year = newDate.getFullYear();
    let formattedDate = `${dayName}, ${day} de ${monthName.toLowerCase()} del ${year}`
    return formattedDate;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getFormattedTime(time){
    let fourDigitsTime = time.replace(":", "");
    let hours24 = parseInt(fourDigitsTime.substring(0,2));
    let hour = ((hours24 + 11) % 12) + 1;
    let amOrPm = hours24 > 11 ? 'PM' : 'AM';
    let minute = fourDigitsTime.substring(2);
    return `${hour}:${minute} ${amOrPm}`;
};