var express = require('express');
var router = express.Router();
var db = require('../lib/database.js');

// router.get('/flutter', function(req, res) {
//     res.sendFile(path.join(__dirname, '/../web/web/index.html'));
// });

router.get('/signup', function(req, res) {
    res.sendFile(__dirname + "/a.html");
});

router.get('/getmainquests', db.getMainQuests);
router.get('/getweeklyquests', db.getWeeklyQuests);
router.get('/getdeptquests', db.getDepartmentQuests);

router.get('/users', db.getUsers)

router.get('/createmessage', db.createMessage);

module.exports = router;