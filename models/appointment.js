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

    addAppointment: function (skillId, date, time, subject, wantReminder, passData) {
        var queryStr = "INSERT INTO `skilllocatedatabase`.`appointment` (`userID`,`skillClassID`,`appointmentDate`,`appointmentTime`,`reminder`,`subject`)" +
            " VALUES ( 1," + skillId + ",'" + date + "','" + time + "','" + wantReminder + "','" + subject + "')";
        pool.query(queryStr, function (err, result) {
            if (err) throw err; //result = false;
            passData(result);
        });
    }

};

