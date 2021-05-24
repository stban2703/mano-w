function getDateToTimestamp(date) {
    let dateParts = date.split("-");
    let newDate = new Date(dateParts[0], (parseInt(dateParts[1]) - 1).toString(), dateParts[2]);   
    return newDate.getTime();
}

function getTimestampToDate(timestamp) {
    let newDate = new Date(timestamp);
    let day = newDate.getDate().toString().length < 2 ? `0${newDate.getDate()}` : newDate.getDate();
    let intMonth = parseInt(newDate.getMonth());
    let month = intMonth.toString().length < 2 ? `0${intMonth + 1}` :  `${intMonth + 1}`;
    let year = newDate.getFullYear();
    let formattedDate = `${day}/${month}/${year}`
    return formattedDate;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }