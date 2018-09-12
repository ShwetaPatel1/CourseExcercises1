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
    var time = req.body.time;
    var wantReminder = req.body.reminder;
    var subject = req.body.subject;

    appointment.addAppointment(skillId, date, time, subject, wantReminder, function (status) {
        console.log("status : " + status);
        var message = "";
        if (status) {
            message = "Booked an appointment successfully. \n Date : " + date + " \n Time : " + time;
        }
        res.send(message);
        res.end();
    })

});


module.exports = router;
