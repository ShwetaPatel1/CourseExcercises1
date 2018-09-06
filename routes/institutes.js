var express = require('express');
var router = express.Router();
var path = require('path');
var institute = require('../models/institute');


router.get('/', function (req, res, next) {

    institute.selectAllInstitutes(function (data) {
        res.render('institute', { instituteList: data });
        res.end();

    });
});

router.get('/instituteNames', function (req, res) {
    var dataJson = institute.selectInstituteNames(function (data) {
        res.send(data);
    });
});
module.exports = router;
