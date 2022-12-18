var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../lib/database.js');

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/../views/home.html'))
})


router.get('/deptquests', db.showDepartmentQuests);

// router.get('/makemainquest', (req, res)=>{
//     res.sendFile(path.join(__dirname, '/../views/makeweeklyquest.html'))
// })

router.get('/makedeptquest', (req, res)=>{
    res.sendFile(path.join(__dirname, '/../views/makedeptquest.html'))
})

router.post('/makedeptquest', db.createDepartmentQuest);

router.get('/makeweeklyquest', (req, res)=>{
    res.sendFile(path.join(__dirname, '/../views/makeweeklyquest.html'))
})

router.post('/makeweeklyquest', db.createWeeklyQuest);

router.get('/makerequests', (req, res)=>{
    res.sendFile(path.join(__dirname, '/../views/makerequest.html'))
})

router.post('/makerequests', db.createRequests);


router.get('/requests', db.getRequests);

//router.get('/users', db.getUsers)

module.exports = router;