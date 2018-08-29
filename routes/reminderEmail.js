var email = require("emailjs")
var schedule = require("node-schedule")
var emailConfig = require('../configuration/config');

//var email   = require("./path/to/emailjs/email");

const sendScheduledReminder = function () {
 // let startTime = new Date(Date.now() + 5000);
 // let endTime = new Date(startTime.getTime() + 2000);
 var j = schedule.scheduleJob('10 52 14 * * 0-5', function(){

    console.log('Sending reminder emails to users');

    //email- account configuration
    var server = email.server.connect({
    user: emailConfig.email.user,
    password: emailConfig.email.password,
    host: emailConfig.email.host,
    ssl: emailConfig.email.ssl
    });

    // send the message and get a callback with an error or details of the message that was sent
    server.send({
      text: "Dear User, This is a reminder email for your appointment on XYZ date ABC time with XYZXYZ skill classes.",
      from: "you "+emailConfig.email.user,
      to: "shweta_mehoni@yahoo.co.in",
      cc: "",
      subject: "Reminder - You have an appointment for tommorow"
    }, function (err, message) { console.log(err || message); });


    console.log('Reminder emails sent!!');
  });

}

module.exports = sendScheduledReminder;