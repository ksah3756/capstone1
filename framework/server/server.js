// 설치한 express module을 불러와서 변수(express)에 저장
const express = require("express");

// mongodb 연결
const connect = require('./models');
connect();
//express를 실행하여 app object를 초기화 
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const cookieParser = require('cookie-parser');
// auth 미들웨어 함수 불러오기
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// 사용할 포트 번호를 port 변수에
const port = process.env.PORT || 5000;

// 라우터 불러오기
// const indexRouter = require('./routes');
const posesRouter = require('./routes/poses');
const scoresRouter = require('./routes/scores');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.set('view engine', 'ejs');

// app.use('/', indexRouter);
app.use('/poses', posesRouter);
app.use('/scores', scoresRouter);

// 로그인 관련 
app.get('*', checkUser); //유저가 정상적으로 로그인 했을때, view를 로그인 한 것에 맞게 해주기 위함
app.get('/', (req, res) => res.render('home')); //여기에도 requireAuth 함수를 넣어주면 홈페이지 자체도 로그인 해야 접속 가능하게 할 수 있다.
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));  //Auth가 성공하면 requireAuth함수 내부의 next()에 의해 smoothies로 넘어감, 즉 인증 받아야 smoothies 페이지로 접속 가능
app.use(authRoutes);

// port변수를 이용하여 포트에 node.js 서버를 연결
app.listen(port, () => {
  console.log(`Server is now running on port : ${port}`);
});