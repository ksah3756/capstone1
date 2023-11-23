const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth"); // middleware 불러오기
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

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