var express = require('express');
var router = express.Router();
var category = require('../models/category');

router.get('/', function (req, res, next) {

    category.selectAllCategories(function (result) {
        res.render('category', { title: "Categories", categoryList: result });
        res.end();
    })

});


module.exports = router;
