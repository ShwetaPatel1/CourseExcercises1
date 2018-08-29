var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET appointment page. */
router.get('/appointment', function (req, res, next) {
  res.render('appointment', { title: 'Appointment' });
});

module.exports = router;
