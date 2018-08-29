var mysql = require('mysql');
var config = require('../configuration/config');

var con = mysql.createPool(config.MySQL_db);

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");

// });

//Constructor for user object
function User(id, fName, lName, userName, email, pwd, imagePath) {
    this.id = id;
    this.fName = fName;
    this.lName = lName;
    this.userName = userName;
    this.email = email;
    this.pwd = pwd;
    this.imagePath = imagePath;

    this.selectAllActiveUsers = function () {

        con.query("SELECT * FROM USER WHERE ISACTIVE=true", function (err, result) {
            if (err) throw err;
            return result;
        });

    }

    this.addUser = function () {
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO `skilllocatedatabase`.`user` VALUES('" + this.id + ",'" + this.userName + "','" + this.pwd + "'+'" +
                this.email + "','" + this.fName + "','" + this.lName + "'," + true + ",'" + this.imagePath + "')";

            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record updated");
            });
        });
    }


    this.updateUser = function () {
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "UPDATE `skilllocatedatabase`.`user` SET ";

            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record updated");


            });
        });
    }
}


module.exports = User;
//addUser(1, "Shweta", "Patel", "ShwetaPatel1", "shweta_mehoni\@yahoo.co.in", "shwetaPassword", "/images/users/1.jpg");
