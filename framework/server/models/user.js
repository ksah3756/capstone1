const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter an name'], //name이 비어있을 때 출력할 error message
    },
    user_id: {
        type: String,
        required: [true, 'Please enter an user_id'],  //user_id가 비어있을 때 출력할 error message
        unique: true,
    },
    email: {
        type: String,
        required:[true, 'Please enter an email'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']  //validaator인 isEmail은 data가 이메일 형식이면 true, 아니면 false가 된다.
    },
    password:{
        type: String,
        required:[true, 'Please enter an password'], //password가 비어있을 때 출력할 error message
        minLength: [4,'Minimum password length is 4 charcaters'],
    },
});
//Error: user validation failed: name: Please enter an name, user_id: Please enter an user_id, email: Please enter an email, password: Please enter an password
//모든 속성에 비어있는 데이터가 올 때, 위처럼 결과가 나오면 정상


//fire a function after doc saved to db
/*userSchema.post('save', function(doc, next){
    console.log('new user was created and saved', doc);
    next(); //next 안해주면 다음 실행이 안돼서 프로그램이 멈춘다
});*/

// fire a function before doc saved to db(hashed password를 db에 저장하기 위해 사용)
userSchema.pre('save', async function(next){
    // bcryptMiddleware.generateHashedPassword(next);
    const salt = await bcrypt.genSalt();  //salt값 생성(salt는 hash 알고리즘에 사용대는 랜덤 값)
    this.password = await bcrypt.hash(this.password, salt); //이제 password가 hash화 됨(db에도 이 비밀번호가 저장됨)
    next();
})

// static method to login user
userSchema.statics.login = async function(user_id, password) {
    // bcryptMiddleware.login(user_id, password);
    const user = await this.findOne({ user_id });  //user_id에 해당하는 것을 발견 못하면 정의 되지 않음
    if (user) {
        const auth = await bcrypt.compare(password, user.password)   //입력한 비번과 hashed 비번을 비교해줌+ match됐을 경우 auth는 true가 됨
        if(auth){ 
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect ID');
}

module.exports = mongoose.model('User', userSchema);