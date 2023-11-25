// middleware/bcryptMiddleware.js
const bcrypt = require('bcrypt');

const generateHashedPassword = async function(next) {
    // ... (bcrypt 로직)
    const salt = await bcrypt.genSalt();  //salt값 생성(salt는 hash 알고리즘에 사용대는 랜덤 값)
    this.password = await bcrypt.hash(this.password, salt); //이제 password가 hash화 됨(db에도 이 비밀번호가 저장됨)
    next();
};

const login = async function(user_id, password) {
    // ... (로그인 로직)
    const user = await this.findOne({ user_id });  //user_id에 해당하는 것을 발견 못하면 정의 되지 않음
    if (user) {
        const auth = await bcrypt.compare(password, user.password)   //입력한 비번과 hashed 비번을 비교해줌+ match됐을 경우 auth는 true가 됨
        if(auth){ 
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect ID');
};

module.exports = { generateHashedPassword, login };
