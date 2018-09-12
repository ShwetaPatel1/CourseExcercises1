function selectSkillClass(id) {
    window.location.href = "/appointment/" + id;
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
/***********************************Populate Categories Dropdown************************************** */
function loadCategories() {
    let dropdown = document.getElementById('ddInstitute');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose Institute';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = '/instituteNames';

    fetch(url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response  
                response.json().then(function (data) {
                    let option;

                    for (let i = 0; i < data.length; i++) {
                        option = document.createElement('option');
                        option.text = data[i].name;
                        option.value = data[i].abbreviation;
                        dropdown.add(option);
                    }
                });
            }
        )
        .catch(function (err) {
            console.error('Fetch Error -', err);
        });
}

/*********************************Javascript for appointment.pug *******************/
function openForm() {
    document.getElementById("form_container").style.display = "block";
    document.getElementsByClassName("skillItem-Container").style.display = "none";
}

function bookAppointment() {

    //Get values from form elements and perform Validation
    var firstName = document.forms["appointmentForm"]["firstName"].value.trim();
    if (firstName == "") {
        alert("Enter proper First Name");
        return false;
    }

    var lastName = document.forms["appointmentForm"]["lastName"].value.trim();
    if (lastName == "") {
        alert("Enter proper Last Name");
        return false;
    }

    var phone = document.forms["appointmentForm"]["phone"].value.trim();
    if (phone == "") {
        alert("Enter proper Phone Number");
        return false;
    }

    var email = document.forms["appointmentForm"]["email"].value.trim();
    if (!validEmail(email)) {
        alert("Enter proper email address");
        return false;
    }

    var appointmentDate = document.forms["appointmentForm"]["dateTime"].value.trim();
    let msg = dateTimeValidationMessage(appointmentDate);
    if (msg != "") {
        alert(msg);
        return false;
    }

    var subjectText = document.forms["appointmentForm"]["subject"].value.trim();
    var remind = document.forms["appointmentForm"]["remind"].value ? 1 : 0;
    var skillId = document.getElementById('id').textContent.trim();
    //Data manipulation

    //Ajax request - POST req to same page with JSON passed in (prevent go back)
    var params = "skillId=" + skillId + "&firstName=" + firstName + "&lastName=" + lastName + "&phone=" + phone + "&email=" + email +
        "&date=" + getDatePart(appointmentDate) + "&time=" + getTimePart(appointmentDate) + "&reminder=" + remind + "&subject=" + subjectText;
    alert(params);

    postAjax('/appointment', params, function (message) {
        if (message != "") {
            closeForm();
            var para = document.createElement("P");
            var t = document.createTextNode(message);
            para.appendChild(t);
            document.getElementsByClassName("mainHome")[0].appendChild(para);
        }
        else {
            alert("Could not book an appointment for this time. Please retry");
        }
    });

    //hide the form and display the acknowledgment message

    //send an email for confirmation
}

function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status == 200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

function getDatePart(strDate) {
    var date = new Date(strDate);
    var day = date.getDate(); //tomorrow's date
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var datePart = year + "-" + month + "-" + day;
    return datePart;
}

function getTimePart(strDate) {
    var date = new Date(strDate);
    var hr = date.getHours();
    var min = date.getMinutes();

    var timePart = hr + ":" + min;
    return timePart;
}

const validEmail = function (email) {
    // this is a simple email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}


const dateTimeValidationMessage = function (strDate) {
    let d = new Date(strDate);
    let day = d.getDay();
    if (day == 0 || day == 6) {
        return "Appointments are not available during weekends.";
    }
    let time = d.getHours();
    if (time < 9 || time > 17) {
        return "Appointments are available only during working hours. 9:00 AM to 5:00 PM"
    }
    return "";
}

function closeForm() {
    document.getElementById("form_container").style.display = "none";
}
//*************slide show js*********************************/
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
function showTime(e) {
    //alert(e.target.value);
    var d = e.target.value;
    alert(d.getTime());
    alert(d.getDate());

}