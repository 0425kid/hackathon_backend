const {Pool} = require('pg');
const bodyParser = require('body-parser')
const jwt = require('./jwt')

var pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hackathon',
  password: 'password',
  port: 5432 //postgres의 기본 포트인듯?
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })
}

const getUserById = (request, response, id) => {
  pool.query('SELECT * FROM users WHERE id=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })
}

const getUserByEmail = (request, response) => {
  const user = request.body;
  console.log(user);
  //email

  pool.query('SELECT * FROM users WHERE email=$1', [user.email], (error, results) => {
    if (error) {
      throw error
    }
    if(results.rows.length > 0){
      response.status(200).json(results.rows[0]);
    }
    else {
      response.status(201).json({isSuccess:false});
    }
    
  })
}



const getUserByNickname = (request, response, nickname) => {
  pool.query(`SELECT * FROM user WHERE nickname=$1`, [nickname], (error, results) => {
    if(error) {
      throw error
    }
    return results.rows;
  })
}

const createUser = (request, response) => {
  const user = request.body;
  console.log(user);
  //nickname
  //email
  //department

  pool.query('INSERT INTO users (nickname, email, department) VALUES ($1, $2, $3);', 
  [user.nickname, user.email, user.department], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json({isSuccess:true});
  })
}

const signinProcess = (request, response) => {

  const user = request.body;
  console.log(user);
  //email

  pool.query('SELECT * FROM users WHERE email=$1', [user.email], function(error, results){   
    if(error) {
      throw error
    }
    if(results.rows.length > 0) {
      var userdata = results.rows[0];
      console.log(userdata);
      console.log("JWT 토큰발급!");
      token = jwt.sign({
        type: 'JWT',
        nickname: "yuchan"
    }, SECRET_KEY, {
        expiresIn: '14d',
        issuer: 'beomjun',
    });
  
    return res.status(200).json({
        code: 200,
        message: '토큰이 발급되었습니다',
        token: token
    });
    } else {
      console.log("그런거 없네요?")
      response.status(401).json('{isSuccess:true}');
    }
  });
}

const getMainQuests = (request, response) => {
  pool.query('SELECT * FROM mainquests', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({list: results.rows});
  })
}

const getWeeklyQuests = (request, response) => {
  pool.query('SELECT * FROM weeklyquests', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({list: results.rows});
  })
}

const createWeeklyQuest = (request, response) => {
  const quest = request.body;
  console.log(quest);
  const difficulty = quest.starpoint * 1;

  pool.query('INSERT INTO weeklyquests (questname, description, difficulty) VALUES ($1, $2, $3);', 
  [quest.name, quest.description, difficulty], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send("추가 성공!");
  })
}

const getDepartmentQuests = (request, response) => {
  pool.query('SELECT * FROM departmentquests', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({list: results.rows});
  })
}

const createDepartmentQuest = (request, response) => {
  const quest = request.body;
  //name
  //description
  //dept
  //starpoint
  console.log(quest);
  const dept = department_list[quest.dept];
  const difficulty = quest.starpoint * 1;

  pool.query('INSERT INTO departmentquests (questname, description, department, difficulty) VALUES ($1, $2, $3, $4);', 
  [quest.name, quest.description, dept, difficulty], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send("추가 성공!");
  })
}



const showDepartmentQuests = (request, response) => {
  pool.query('SELECT * FROM departmentquests', (error, results) => {
    if (error) {
      throw error
    }
    var result = results.rows;
    console.log(result);
    response.render('deptquests', {title: '학과 퀘스트 목록', quests: result})
  })
}



const getRequests = (request, response) => {
  pool.query('SELECT * FROM requests;', (error, results) => {
    if (error) {
      throw error
    }
    var result = results.rows;
    console.log(result);
    response.render('request', {title: '퀘스트 클리어 요청', requests: result})
  })
}

const createRequests = (request, response) => {
  const requests = request.body;
  console.log(requests);
  //userid
  //questcode
  //questid
  //description


  pool.query('INSERT INTO requests (userid, questcode, questid, description) VALUES ($1, $2, $3, $4);', [requests.userid, requests.questcode, requests.questid, requests.description], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send("추가 성공!");
  })
}
// const questSuccess(request, response){
//   const data = request.body;
//   //유저 닉네임
//   //퀘스트 인덱스

// }

const createMessage = (request, response) => {
  const message = request.body;
  console.log(message);
}



department_list = ['IBT학과', 'ISE학과', 'KLC학과', '간호학과', '건축학부', '경영학과', '경제학과', '고분자공학과', '공간정보공학과', '공과대학(FVE)', '교육학과', '국어교육과', '국제통상학과', '글로벌금융학과', '금융투자학과', '기계공학과', '데이터사이언스학과', '디자인융합학과', '디자인테크놀로지학과', '메카트로닉스공학과', '문화콘텐츠문화경영학과', '물리학과', '미디어커뮤니케이션학과', '바이오제약공학과', '사학과', '사회교육과', '사회복지학과', '사회인프라공학과', '산업경영공학과', '산업경영학과', '생명공학과', '생명과학과', '소비자학과', '소프트웨어융합공학과', '소프트웨어융합대학(SCSC)', '수학과', '수학교육과', '스마트모빌리티공학과', '스포츠과학과', '식품영양학과', '신소재공학과', '아동심리학과', '아태물류학부', '에너지자원공학과', '연극영화학과', '영어교육과', '영어영문학과', '의류디자인학과', '의예과', '의학과', '인공지능공학과', '일본언어문화학과', '전기공학과', '전자공학과', '정보통신공학과', '정치외교학과', '조선해양공학과', '조형예술학과', '중국학과', '철학과', '체육교육과', '컴퓨터공학과', '통계학과', '프랑스언어문화학과', '프런티어학부대학', '한국어문학과', '항공우주공학과', '해양과학과', '행정학과', '화학공학과', '화학과', '환경공학과'];


module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  getUserByNickname,

  createUser,
  signinProcess,

  getMainQuests,
  getWeeklyQuests,
  getDepartmentQuests,

  createDepartmentQuest,
  createWeeklyQuest,

  showDepartmentQuests,
  getRequests,
  createRequests,

  createMessage
}