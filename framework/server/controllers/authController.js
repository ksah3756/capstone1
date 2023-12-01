const User = require('../models/user');
const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = (err) =>{
    console.log(err.message, err.code) //콘솔 창에 에러를 표현
    let errors = { name: '', user_id: '', email: '', password: '' };

    //incorrect ID
    if(err.message === 'incorrect ID') {
        errors.user_id = 'that ID is not registered';
    }

    //incorrect password
    if(err.message === 'incorrect password') {
        errors.password = 'that password is incorrect';
    }

    // duplicate errors
    if (err.code === 11000 && err.keyPattern && err.keyPattern.user_id) {
        errors.user_id = 'This user_id is already registered.';
    }
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
        errors.email = 'This email is already registered.';
    }


    // validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            //원래는 잘못되 데이터가 들어오면 엄청 긴 error message가 출력되는데,
            //error의 properties 영역만 콘솔창에 출력(입력 중 어디가 틀렸는지 알 수 있도록)
            //console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// Token 만들어준는 method
const maxAge = 3* 24 * 60 * 60; //3days in sec
const createToken = (id) => {
    return jwt.sign({ id }, 'secret holymoly huripizo', {
        expiresIn: maxAge  //jwt가 유지되는 기간(한번씩 지워줘야한다)
    })
}


module.exports.signup_get = (req,res) =>{
    res.render('signup');
}

module.exports.login_get = (req,res) =>{
    res.render('login');
}

module.exports.signup_post = async (req,res) =>{
    const { name, user_id, email, password } = req.body;

    try{
        const user = await User.create({ name, user_id, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: maxAge * 1000}); //3days in milisec(쿠키도 3일간 유지)
        res.status(201).json({ user: user._id });
    }
    catch (err){
        const errors = handleErrors(err); //입력 error가 났을 때 어떤 이유인지 string data로 표시해준다. 물론 그 data가 DB에 저장되지는 않는다.
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req,res) =>{
    const { user_id, password } = req.body;

    try{
        const user = await User.login(user_id, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: maxAge * 1000});
        // 로그인 성공 시 user_id를 response로 넘김
        res.status(200).json({ user: user.user_id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req,res) => {  //로그아웃을 위해서는 jwt cookie를 없애줘야한다.
    res.cookie('jwt', '', { maxAge: 1 });   //jwt 쿠키를 empty string으로 바꾸고 1ms만에 expire시키자
    res.redirect('/');   //로그 아웃하면 홈으로 돌아감
}