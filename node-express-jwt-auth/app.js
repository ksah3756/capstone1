const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = "mongodb+srv://ohjunsoo13:jeu5LDgM6J4vfWYZ@cluster0.chyhsl6.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI);

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
})
app.listen(port, ()=>{
  console.log(`Server is running on port: ${port}`);
});


// routes
app.get('*', checkUser); //유저가 정상적으로 로그인 했을때, view를 로그인 한 것에 맞게 해주기 위함
app.get('/', (req, res) => res.render('home')); //여기에도 requireAuth 함수를 넣어주면 홈페이지 자체도 로그인 해야 접속 가능하게 할 수 있다.
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));  //Auth가 성공하면 requireAuth함수 내부의 next()에 의해 smoothies로 넘어감, 즉 인증 받아야 smoothies 페이지로 접속 가능
app.use(authRoutes);

//cookie 개념
// cookies 기능
// create cookie
/*app.get('/set-cookies', (req,res) =>{
  //res.setHeader('Set-cookie', 'newUser=true'); // cookie가 계속 남아 있음(localhost의 다른 페이지로 넘어가도 남아있게됨)

  res.cookie('newUser', false); //newUser를 false로 바꿈
  res.cookie('isEmployee', true, { maxAge: 1000*60*60*24 });  //1day in milisec, 1일 이후 expire됨 //다른 옵션을 통해 쿠키에 대한 보안 설정 가능

  res.send('you got the cookies!');
});

// read cookie
app.get('/read-cookies', (req,res) =>{
  const cookies = req.cookies;
  console.log(cookies.newUser);  //newUser의 쿠키에 대한 사태를 알려줌 => 콘솔창에 false나타나는 것 정상

  res.json(cookies);
}); */