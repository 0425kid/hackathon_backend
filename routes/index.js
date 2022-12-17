var express = require('express');
var router = express.Router();
var path = require('path');
//var db = require('../lib/database.js');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/../web/web/index.html'));
});

router.get('/signup', function(req, res) {
    res.sendFile(__dirname + "/a.html");
});

//router.get('/users', db.getUsers)

module.exports = router;