const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const middleware = require('../middleware/bycryptMiddleware')

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
    middleware.generateHashedPassword(next);
})

// static method to login user
userSchema.statics.login = async function(user_id, password) {
    middleware.login(user_id, password);
}

module.exports = mongoose.model('User', userSchema);