const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://' +
    'ksah3756:cYHyQIaYFpCzv9tc' + // 관리자아이디 : 비밀번호
    '@' +
    'capstone.0cacawf.mongodb.net/' + 
    '?retryWrites=true&w=majority' 

// 몽구스 연결 함수
const connect = async () => {
  // 만일 배포용이 아니라면, 디버깅 on
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true); // 몽고 쿼리가 콘솔에서 뜨게 한다.
  }

  try {
    await mongoose.connect(dbUrl, {
      dbName: 'nodejs', // 실제로 데이터 저장할 db명
    });

    console.log('몽고디비 연결 성공');
  } catch (error) {
    console.error('몽고디비 연결 에러', error);
  }
};

// 몽구스 커넥션에 이벤트 리스너를 달게 해준다. 에러 발생 시 에러 내용을 기록하고, 연결 종료 시 재연결을 시도한다.
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', async () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  await connect(); // 연결 재시도
});



module.exports = connect;