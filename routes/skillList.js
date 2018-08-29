var express = require('express');
var router = express.Router();
var path = require('path');
var institute = require('../models/institute');

/* GET all skill List and display. */

router.get('/', function (req, res, next) {
    const skillList = [
        { name: 'Painting and Drawing', imagePath: path.join('images', 'skill_1.jpg'), description: 'Enhance your skill of pencil drawings and acrylic painting with extremely talented trainer Ms. Melanie Gill' },
        { name: 'Origami', imagePath: path.join('images', 'skill_2.jpg'), description: 'Enhance your skill of pencil drawings and acrylic painting with extremely talented trainer Ms. Melanie Gill' },
        { name: 'Craft and art', imagePath: path.join('images', 'skill_3.jpg'), description: 'Enhance your skill of pencil drawings and acrylic painting with extremely talented trainer Ms. Melanie Gill' }
    ];

    res.render('skillList', { listName: 'Skills', skillList: skillList });
    res.end();
});

router.get('/select', function (req, res, next) {
    const skillList = [
        { name: 'Painting and Drawing', imagePath: path.join('../images/skill_1.jpg'), description: 'Enhance your skill of pencil drawings and acrylic painting with extremely talented trainer Ms. Melanie Gill' },
        { name: 'Origami', imagePath: path.join('images', 'skill_2.jpg'), description: 'Enhance your skill of pencil drawings and acrylic painting with extremely talented trainer Ms. Melanie Gill' },
        { name: 'Craft and art', imagePath: path.join('images', 'skill_3.jpg'), description: 'Enhance your skill of pencil drawings and acrylic painting with extremely talented trainer Ms. Melanie Gill' }
    ];
    var searchedSkills = [];

    skillList.forEach(skill => {
        if (toString(skill.name) == toString(req.params.skillName)) {
            console.log(toString(req.params.skillName));
            console.log(skill.name);

            searchedSkills.push(skill);
        }
    });
    if (searchedSkills.length > 0) {
        res.render('skill', { skill: searchedSkills[0] });
    }

});

router.post('/addSkill', function (req, res, next) {
    console.log("Inserting new skill :");
});

router.get('/institutes', function (req, res, next) {
    var dataJson = institute.selectAllInstitutes();
    res.json(dataJson);
    console.log(dataJson);
});



module.exports = router;
