const express = require("express"); 
const User = require("../models/user"); // User model 불러오기
const router = express.Router();           // express의 Router 사용
const bcrypt = require("bcryptjs");        // 암호화 모듈
const jwt = require("jsonwebtoken");

// @route  POST api/register
// @desc   Register user
// @access Public
router.post(
  "/",
  async (req, res) => {
    // req의 body 정보를 사용하려면 server.js에서 따로 설정을 해줘야함
    const { user_id, name, email, password } = req.body;

    try {
      // email을 비교하여 user가 이미 존재하는지 확인
      let user = await User.findOne({ user_id });
		if (user) {
            return res
              .status(400)
              .json({ errors: [{ msg: "User already exists" }] });
      }
      else{
        user = await User.findOne({ email });
        if (user) {
            return res
              .status(400)
              .json({ errors: [{ msg: "Email already exists" }] });
          }
      }
      
			
      // user에 name, id, email, password 값 할당
      user = new User({
        // _id: new mongoose.Types.ObjectId(),
        user_id,
        name,
        email,
        password,
      });

      // password를 암호화 하기
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save(); // db에 user 저장

      // json web token 생성 및 response
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,            // token으로 변환할 데이터
        "jwtSecret",        // secret key 값
        { expiresIn: "1h" },// token의 유효시간을 1시간으로 설정
        (err, token) => {   
          if (err) throw err;
          res.send({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;