var mysql = require('mysql');
var config = require('../configuration/config');
var pool = mysql.createPool(config.MySQL_db);

module.exports = {
    selectAllCategories: function (passData) {

        var queryResult;
        pool.query("SELECT * FROM skilllocatedatabase.category", function (err, result) {
            if (err) throw err;
            passData(result);
        });

        return queryResult;
    },

    selectCategoryNames: function (passData) {

        var queryResult;
        pool.query("SELECT NAME FROM skilllocatedatabase.category ", function (err, result) {
            if (err) throw err;
            passData(result);
        });

        return queryResult;
    }

};

