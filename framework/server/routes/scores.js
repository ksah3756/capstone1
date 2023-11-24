const express = require('express');
const Score = require('../models/score');
const Pose = require('../models/pose');
const router = express.Router();

router.route('/:id/:date')
  
  .get(async (req, res, next) => {
    try {
        const scores = await Score.find({user_id: req.params.id, date: req.params.date}); // 해당 계정의 해당 date의 Scores 가져오기
        res.json(scores);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  
  .post(async (req, res, next) => {
    try{
        const getCount = async (condition) => {
            try {
                const count = await Pose.countDocuments(condition).exec();
                return count;
            } catch (err) {
                throw err;
            }
        };
    
      const func = async () => {
        let totalCnt = 0,
          kneckCnt = 0,
          elbowCnt = 0,
          hipCnt = 0,
          kneeCnt = 0;
        try {
          totalCnt = await getCount({ user_id: req.params.id, date: req.params.date });
          kneckCnt = await getCount({ user_id: req.params.id, date: req.params.date, kneck: true });
          elbowCnt = await getCount({ user_id: req.params.id, date: req.params.date, elbow: true });
          hipCnt = await getCount({ user_id: req.params.id, date: req.params.date, hip: true });
          kneeCnt = await getCount({ user_id: req.params.id, date: req.params.date, knee: true });
          
          // 계산된 값을 객체로 반환
          return {
            totalCnt,
            kneckCnt,
            elbowCnt,
            hipCnt,
            kneeCnt,
          };
        } catch (error) {
          console.error(error);
          throw error; // 오류를 상위로 전파
        }
      };
  
      const counts = await func(); // func 함수 호출하여 반환값 받기
  
      const score = await Score.create({
        user_id: req.params.id,
        kneck_score_ratio: Math.round(counts.kneckCnt / counts.totalCnt * 10000) / 100,
        elbow_score_ratio: Math.round(counts.elbowCnt / counts.totalCnt * 10000) / 100,
        hip_score_ratio: Math.round(counts.hipCnt / counts.totalCnt * 10000) / 100,
        knee_score_ratio: Math.round(counts.kneeCnt / counts.totalCnt * 10000) / 100,
      });
  
      console.log(score);
      res.status(201).json(score);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  

module.exports = router;