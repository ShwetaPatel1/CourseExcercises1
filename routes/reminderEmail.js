var email = require("emailjs")
var schedule = require("node-schedule")
var emailConfig = require('../configuration/config');

//var email   = require("./path/to/emailjs/email");

//institute, skillClass, address, phone, email, date, time

const emailJson = {
  institute: "MOKSHA YOGA",
  skillClass: "Yoga classes",
  address: "#4, 26 summers place",
  phone: "111-111-1111",
  email: "abc@moksha.yoga.com",
  date: "2018-10-10",
  time: "10:30 AM"
};
const sendReminder = function () {
  //scheduleJob(sec, min, hour, day of month (1 - 31), month, day of week (0 - 6))
  var j = schedule.scheduleJob('10 26 17 * * 0-6', function () {

    console.log('Sending reminder emails to users');

    //email- account configuration
    var server = email.server.connect(emailConfig.email);

    // send the message and get a callback with an error or details of the message that was sent
    server.send({
      text: prepareMailText(emailJson),
      from: "you " + emailConfig.email.user,
      to: "shweta_mehoni@yahoo.co.in",
      cc: "",
      subject: "Reminder - You have an appointment"
    }, function (err, message) { console.log(err || message); });


    console.log('Reminder emails sent!!');
  });

}
//institute, skillClass, address, phone, email, date, time
function prepareMailText(emailJson) {
  var emailText = "Dear Shweta,\n\n" +

    "This is a reminder email for your appointment at " + emailJson.institute + " institute for inquiry regarding " + emailJson.skillClass + " skill Class. Here is your appointment schedule details : \n\n" +

    "Institute : " + emailJson.institute + "\n" +
    "Address : " + emailJson.address + "\n" +
    "Phone : " + emailJson.phone + "\n" +
    "email : " + emailJson.email + "\n" +
    "Skill Class : " + emailJson.skillClass + "\n" +
    "Date : " + emailJson.date + "\n" +
    "Time : " + emailJson.time + "\n\n" +

    "Happy to help you. Thank you.\n" +
    "SkillLocate ";

  return emailText;
}

module.exports = sendReminder;