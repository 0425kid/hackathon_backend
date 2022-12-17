var express  = require('express');//import express NodeJS framework module
var cors = require('cors');
var app      = express();// create an object of the express module
var http     = require('http').Server(app);// create a http web server using the http library

app.use(cors())

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.json());

var router = require('./routes/index.js');
app.use('/', router);

var userRouter = require('./routes/users.js');
app.use('/users', userRouter);

http.listen(process.env.PORT ||8080, function(){
	console.log('listening on *:8080');
});
console.log("------- server is running -------");