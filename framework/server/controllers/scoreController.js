const Score = require('../models/score');
const Pose = require('../models/pose');
const moment = require('moment');

exports.getScoresById = async (req, res, next) => {
  try {
    const scores = await Score.find({ user_id: req.params.user_id });
    res.json(scores);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// 같은 날짜에 이미 score 데이터가 있는 경우 다시 계산해서 업데이트하도록 수정(날짜당 한개의 score 데이터만 있도록 수정)
exports.createScores = async (req, res, next) => {
  try {
    const counts = await calculateScores(req.body.user_id, req.body.date);

    const new_neck_score_ratio = Math.round((counts.neckCnt / counts.totalCnt) * 10000) / 100;
    const new_hip_score_ratio = Math.round((counts.hipCnt / counts.totalCnt) * 10000) / 100;
    const new_knee_score_ratio = Math.round((counts.kneeCnt / counts.totalCnt) * 10000) / 100;

    let score = await Score.findOneAndUpdate(
      { date: moment().format("YYYY-MM-DD") },
      {
        neck_score_ratio: new_neck_score_ratio,
        hip_score_ratio: new_hip_score_ratio,
        knee_score_ratio: new_knee_score_ratio,
      },
      { new: true, upsert: true } // upsert 옵션을 사용하여 조건에 맞는 문서가 없을 때 새로운 문서 생성
    );

    if (!score) {
      // 조건에 맞는 문서가 없을 때
      score = await Score.create({
        user_id: req.body.user_id,
        date: moment().format("YYYY-MM-DD"),
        neck_score_ratio: new_neck_score_ratio,
        hip_score_ratio: new_hip_score_ratio,
        knee_score_ratio: new_knee_score_ratio,
      });
    }

    res.status(201).json(score);
  } catch (err) {
    console.error(err);
    next(err);
  }
};


const getPoseCount = async (condition) => {
  try {
    const count = await Pose.countDocuments(condition).exec();
    return count;
  } catch (err) {
    throw err;
  }
};

const calculateScores = async (userId, date) => {
  const totalCnt = await getPoseCount({ user_id: userId, date: date });
  const neckCnt = await getPoseCount({ user_id: userId, date: date, neck: false });
  const hipCnt = await getPoseCount({ user_id: userId, date: date, hip: false });
  const kneeCnt = await getPoseCount({ user_id: userId, date: date, knee: false });

  return {
    totalCnt,
    neckCnt,
    hipCnt,
    kneeCnt,
  };
};

