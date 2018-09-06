//SELECT * FROM skilllocatedatabase.skillclass
var mysql = require('mysql');
var config = require('../configuration/config');
var pool = mysql.createPool(config.MySQL_db);

module.exports = {
    selectAll: function (passData) {

        var queryResult;
        pool.query("SELECT  a.*, b.name as categoryName FROM skillclass a INNER JOIN category b ON a.category_id = b.id", function (err, result) {
            if (err) throw err;
            passData(result);
        });

        return queryResult;
    },

    selectFiltered: function (filterStr, passData) {

        var queryResult;
        var qry = "SELECT  a.*, b.name as categoryName FROM skillclass a INNER JOIN category b ON a.category_id = b.id" +
            " where b.name like '%" + filterStr + "%'  or a.skillname like '%" + filterStr + "%' or a.trainerName like '%" + filterStr + "%'";
        pool.query(qry, function (err, result) {
            if (err) throw err;
            passData(result);
        });

        return queryResult;
    }
};

//"INSERT INTO `skilllocatedatabase`.`skillclass` (`id`,`skillName`,`instituteID`,`categoty`,`subCategory`,`trainerName`,`description`,`image1`,`image2`,`image3`,
// `seats`,`duration`,`institute_id`,`category_id`)VALUES (<{id: }>,<{skillName: }>,<{instituteID: }>,<{categoty: }>,<{subCategory: }>,<{trainerName: }>, <{description: }>,<{image1: }>,
// <{image2: }>,<{image3: }>, <{seats: }>,<{duration: }>,<{institute_id: }>,<{category_id: }>);"
//module.exports = selectAllInstitutes;

