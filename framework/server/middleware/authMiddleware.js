const jwt = require('jsonwebtoken');
const User = require('../models/user');


// 사용자가 정상적으로 로그인 된 사용자인지 확인
const requireAuth = (req, res, next) => {  //req,res, next method를 받는다
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token){
        jwt.verify(token, 'secret holymoly huripizo', (err, decodedToken)=>{   //내가 설정한 secret string을 넣어줘야 검증 가능
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();    //인증 되면 next method로 넘어감
            }
        })
    }
    else{   //토큰이 없으면 로그인화면으로 리다이렉트(로그인 해야 컨텐츠 사용가능)
        res.redirect('/login');
    }
}

// check current user  //유저가 정상적으로 로그인 했을때, view를 user 정보에 맞게 해주기 위함
// 토큰이 존재하고, 검증이 되면 그 유저의 정보를 가져옴 (res.locals.user = user) , 아니면 null
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'secret holymoly huripizo', async (err, decodedToken)=>{   //내가 설정한 secret string을 넣어줘야 검증 가능
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else{
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };