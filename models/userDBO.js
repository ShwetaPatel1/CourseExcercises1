var mysql = require('mysql');
var config = require('../configuration/config');
var pool = mysql.createPool(config.MySQL_db);

module.exports = {
    selectAllActiveUsers: function () {

        pool.query("SELECT * FROM USER WHERE ISACTIVE=true", function (err, result) {
            if (err) throw err;
            return result[0];
        });
    }
};
