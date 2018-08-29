var mysql = require('mysql');
var config = require('../configuration/config');
var pool = mysql.createPool(config.MySQL_db);

module.exports = {
    selectAllInstitutes: function () {

        pool.query("SELECT * FROM skilllocatedatabase.institute where city = 'SASKATOON'", function (err, result) {
            if (err) throw err;
            return result;
        });
    }
};
