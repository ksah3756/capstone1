const express = require('express');
const Pose = require('../models/pose');
const router = express.Router();

router.route('/:id')
  // axios.get('/id') 로부터 요청 받음
  .get(async (req, res, next) => {
    try {
        const poses = await Pose.find({user_id: req.params.id}); // 해당 계정의 Pose 컬렉션 모두 가져오기
        res.json(poses); // json 형식으로 response 보내기
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  
  .post(async (req, res, next) => {
    try {
      // req.body로 받은 데이터를 Pose 컬렉션에 생성 & 등록
      const pose = await Pose.create({
        user_id: req.body.id,
        kneck: req.body.kneck,
        elbow: req.body.elbow,
        hip: req.body.hip,
        knee: req.body.knee,
      });
      
      console.log(pose);
      res.status(201).json(pose);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.route('/:id/:date')
  .get(async (req, res, next) => {
    try {
        const poses = await Pose.find({user_id: req.params.id, date: req.params.date}); // 해당 계정의 해당 date의 pose 컬렉션 불러오기
        res.json(poses);
    } catch (err) {
      console.error(err);
      next(err);
    }
});

module.exports = router;