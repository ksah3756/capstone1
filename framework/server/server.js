// 설치한 express module을 불러와서 변수(express)에 저장
const express = require("express");

// mongodb 연결
const connect = require('./models');
connect();
//express를 실행하여 app object를 초기화 
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

// 사용할 포트 번호를 port 변수에
const port = process.env.PORT || 5000;

// const indexRouter = require('./routes');
const posesRouter = require('./routes/poses');
const scoresRouter = require('./routes/scores');

app.use(cors());
app.use(express.json());
// app.use('/', indexRouter);
app.use('/poses', posesRouter);
app.use('/scores', scoresRouter);

// port변수를 이용하여 포트에 node.js 서버를 연결
app.listen(port, () => {
  console.log(`Server is now running on port : ${port}`);
});