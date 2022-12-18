var express = require('express');
var router = express.Router();
var db = require('../lib/database.js');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'INEINE';

router.get('/', db.getUsers)
router.get('/:id', (request, response)=>{
    const id = parseInt(request.params.id)
  
    db.getUserById(request, response, id);
})
router.post('/email', db.getUserByEmail)

router.post('/signup', db.createUser)

router.post('/signin', db.signinProcess);

module.exports = router;