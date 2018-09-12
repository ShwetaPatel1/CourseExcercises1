//SELECT * FROM skilllocatedatabase.skillclass
var mysql = require('mysql');
var config = require('../configuration/config');
var pool = mysql.createPool(config.MySQL_db);

module.exports = {
    selectAll: function (passData) {

        pool.query("SELECT  a.*, b.name as categoryName FROM skillclass a INNER JOIN category b ON a.category_id = b.id", function (err, result) {
            if (err) throw err;
            passData(result);
        });

    },

    selectFiltered: function (filterStr, passData) {

        var qry = "SELECT  a.*, b.name as categoryName FROM skillclass a INNER JOIN category b ON a.category_id = b.id" +
            " where b.name like '%" + filterStr + "%'  or a.skillname like '%" + filterStr + "%' or a.trainerName like '%" + filterStr + "%'";
        pool.query(qry, function (err, result) {
            if (err) throw err;
            passData(result);
        });

    },

    getSkill: function (id, passData) {

        var qry = "SELECT a.id as skillId, a.*, b.name as categoryName, c.* FROM ((SkillClass a INNER JOIN Category b ON a.Category_id = b.id) INNER JOIN Institute c ON a.Institute_id = c.id) " +
            " where a.id ='" + id + "'";
        pool.query(qry, function (err, result) {
            if (err) throw err;
            passData(result);
        });

    }
};

