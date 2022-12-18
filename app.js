const express = require('express')
const app = express()
var http     = require('http').Server(app);// create a http web server using the http library
const port = 8080

var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());


app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

http.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// //var path = require('path');




// // var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.json());

var router = require('./routes/index.js');
app.use('/', router);

var userRouter = require('./routes/users.js');
app.use('/users', userRouter);

var manageRouter = require('./routes/manage.js');
app.use('/manage', manageRouter);

app.set( 'views', __dirname + '/views' );  
app.set('view engine' , 'pug');

app.use('/img', express.static(__dirname + '/images'))
app.use('/style', express.static(__dirname + '/style'))