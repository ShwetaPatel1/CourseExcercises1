function filterSkills() {
    var str = document.getElementById("name").value;

    alert(document.URL + "And search string is :" + str);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("skillOrderedList").innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", "/skillList/:" + str, true);
    xhttp.send();
}