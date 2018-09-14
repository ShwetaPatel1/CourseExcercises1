// function filterSkills() {
//     var str = document.getElementById("name").value;

//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById("skillOrderedList").innerHTML = this.responseText;
//         }
//     };

//     xhttp.open("GET", "/skillList/:" + str, true);
//     xhttp.send();
// }

function getReminderDatePart(strDate) {
    var date = new Date(strDate);
    var day = date.getDate() - 1;
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var datePart = year + "-" + month + "-" + day;
    return datePart;
    //console.log(datePart);
}

//getReminderDatePart('2018-01-01');