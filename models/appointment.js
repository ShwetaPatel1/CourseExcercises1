var mysql = require('mysql');
var config = require('../configuration/config');
var pool = mysql.createPool(config.MySQL_db);

module.exports = {
    selectAllAppointments: function (passData) {

        var queryResult;
        pool.query("SELECT * FROM skilllocatedatabase.appointment", function (err, result) {
            if (err) throw err;
            passData(result);
        });

        return queryResult;
    },

    addAppointment: function (skillId, date, time, subject, wantReminder, firstName, lastName, email, reminderDate, passData) {


        var queryStr = "INSERT INTO `skilllocatedatabase`.`appointment` (`userID`,`skillClassID`,`appointmentDate`,`appointmentTime`,`reminder`,`subject`,`firstName`,`lastName`)" +
            " VALUES ( 1," + skillId + ",'" + date + "','" + time + "','" + wantReminder + "','" + subject + "','" + firstName + "','" + lastName + "')";
        pool.query(queryStr, function (err, result) {
            if (err) throw err; //result = false;

            // var qry = "INSERT INTO `skilllocatedatabase`.`reminder` ( `reminderText`,`reminderDate`,`email`,`reminderSent`,`appointmentId`) VALUES " +
            //     "('" + subject + "','" + reminderDate + "','" + email + "','0','" + result.insertedId + "')";

            passData(result);
        });

    }

};

