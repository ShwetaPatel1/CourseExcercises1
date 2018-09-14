var express = require('express');
var router = express.Router();
var path = require('path');
var skillClass = require('../models/skillClass');
var category = require('../models/category');

/* GET all skill List and display. */

router.get('/', function (req, res, next) {

    var categoryList;
    category.selectAllCategories(function (data) {
        categoryList = data;
    });

    skillClass.selectAll(function (skillList) {
        res.render('skillList', { title: "Get an appointment", itemList: skillList });
        res.end();
    });

});

router.get('/:skillName', function (req, res, next) {
    let filterOn = req.params.skillName;
    skillClass.selectFiltered(filterOn, function (data) {
        res.send(prepareSkillItem_HTMLResponse(data));
        res.end();
    });

});

//function for preparing innerHTML for each skill class in the list
function prepareSkillItem_HTMLResponse(itemList) {
    let htmlResponse = "";
    if (itemList.length === 0 || itemList === 'undefined') {
        htmlResponse += "<br><h4>Such skill classes are not available. </h4>";
    } //<div class="skillItem" onclick="selectSkillClass(3)">
    else {
        htmlResponse += "<br>";
        itemList.forEach(item => {
            htmlResponse += '<div class="skillItem" onclick="selectSkillClass(' + item.id + ')"><div class="skillImgContainer">';
            htmlResponse += '<img src="' + item.image1 + '"></div>';
            htmlResponse += '<h3><a href="#" onclick="selectSkillClass()">' + item.skillName + '</a></h3><hr><br>';
            htmlResponse += '<p>Category : ' + item.categoryName + '</p>';
            htmlResponse += '<p>Trainer : ' + item.trainerName + '</p>';
            htmlResponse += '<p>Duration : ' + item.duration + '</p>';
            htmlResponse += '<p>Total Seats : ' + item.seats + '</p></div>';
        });
        htmlResponse += " ";
    }
    //console.log(htmlResponse); 
    return htmlResponse;
}

module.exports = router;
