var express = require('express');
var router = express.Router();
var db = require('../lib/database.js');

router.get('/', db.getUsers)
router.post('/signup', db.createUser)

module.exports = router;