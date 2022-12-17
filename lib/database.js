const {Pool} = require('pg');
const bodyParser = require('body-parser')

var pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hackathon',
  password: 'password',
  port: 5432 //postgres의 기본 포트인듯?
})

const jwt = require('jsonwebtoken');

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows);
    })
}

const createUser = (request, response) => {
  const user = request.body;
  console.log(user);

  pool.query('INSERT INTO users (nickname, userid, userpw) VALUES ($1, $2, $3);', 
  [user.name, user.id, user.pw], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added`);
  })
}

const signinProcess = (request, response) => {

  const user = request.body;

  pool.query('SELECT * FROM users WHERE userid = $1 AND userpw = $2', [user.id, user.pw], function(error, results){
      
      if(error) {
      throw error
      }
      if(results.rows.length > 0) {
      var user = results.rows[0];
      response.cookie('id', user.id);
      response.cookie('nickname', user.nickname);
      response.status(302).redirect(`/`)
      } else {
      response.send(
          `<script>
          alert('Login Failed');
          location.href='/signin';
          </script>`
      );
      }
  });
}



module.exports = {
    getUsers,
    createUser,
    signinProcess
}