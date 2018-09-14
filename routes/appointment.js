var express = require('express');
var router = express.Router();
var skillClass = require('../models/skillClass');
var appointment = require('../models/appointment');

router.get('/:skillId', function (req, res, next) {

    var skillId = req.params.skillId;
    skillClass.getSkill(skillId, function (result) {
        res.render('appointment', { title: "Book an appointment", id: skillId, skillClass: result });
        res.end();
    })

});

router.post('/', function (req, res, next) {
    // var params = "firstName=" + firstName + "&lastName=" + lastName + "&phone=" + phone + "&email=" + email +
    //     "&date=" + appointmentDate + "&time=" + appointmentDate + "&reminder=" + remind + "&subject=" + subjectText;

    var skillId = req.body.skillId;
    var date = req.body.date;
    var reminderDate = req.body.reminderDate;
    var time = req.body.time;
    var email = req.body.email;
    var wantReminder = req.body.reminder;
    var subject = req.body.subject;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

    appointment.addAppointment(skillId, date, time, subject, wantReminder, firstName, lastName, email, reminderDate, function (status) {
        var message = "";
        if (status) {
            message = "Booked an appointment successfully. \n Date : " + date + " \n Time : " + time;
        }
        res.send(message);
        res.end();
    });

    //insert data into reminder table 

    //send acknowledgement email

});

router.get('/seeAll', function (req, res, next) {

    appointment.selectAllAppointments(function (result) {
        res.send(result);
        res.end();
    })

});


module.exports = router;
