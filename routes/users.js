var express = require('express');
var router = express.Router();
//var user = require('../models/userDBO');
var mysql = require('mysql');
var config = require('../configuration/config');
var pool = mysql.createPool(config.MySQL_db);

/* GET users list. */
router.get('/', function (req, res, next) {

  pool.query("SELECT * FROM USER WHERE ISACTIVE=true", function (err, result) {
    if (err) throw err;
    res.send(result);
  });

});

// router.get('/', function (req, res, next) {
//   user1 = new user(2, 'Rinku', 'Patel', 'rinkuPatel1', 'Taksh.shweta.patel@gmail.com', 'myPassword', '../images/design/user2.jpg');
//   //console.log(user.prototype);
//   //console.log(user.selectAllActiveUsers());
//   var resultsArray = [];
//   resultsArray = user1.selectAllActiveUsers();
//   console.log(resultsArray);
// });
module.exports = router;
