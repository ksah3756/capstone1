const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const auth = function (req, res, next) {
  // Get token from header
  // header에서 x-auth-token 은 token의 key 값
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    // token 해독, token을 만들 때 설정한 secret key 값 : jwtSecret
    const decoded = jwt.verify(token, "jwtSecret");
    // req에 해독한 user 정보 생성 
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// @route  GET api/auth
// @desc   Auth
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    // auth 미들웨어에서 생성해준 req.user를 사용하여 DB에서 user 탐색
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;