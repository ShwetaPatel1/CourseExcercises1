function selectSkillClass() {
    alert("Skill select window pop up...");
}

//function that will toggle the visibility of Categories List
function showCategoryList() {
    document.getElementById('categoryList').style.display = "block";
    document.getElementById('instituteList').style.display = "none";
}

function showInstituteList() {
    document.getElementById('categoryList').style.display = "none";
    document.getElementById('instituteList').style.display = "block";
}

//Ajax used for filtering the skills
function filterSkills() {
    var xhttp = new XMLHttpRequest();
    var str = document.getElementById("name").value.trim();
    if (str == '') {
        document.getElementById("name").value = '';
        xhttp.open("GET", "/skillList", true);
        xhttp.send();
    }
    else {
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("skillOrderedList").innerHTML = this.responseText;
            }
        };

        xhttp.open("GET", "/skillList/" + str, true);
        xhttp.send();
    }
}