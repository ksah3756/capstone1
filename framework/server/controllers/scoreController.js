const Score = require('../models/score');
const Pose = require('../models/pose');

exports.getScoresByDate = async (req, res, next) => {
  try {
    const scores = await Score.find({ user_id: req.params.user_id, date: req.params.date });
    res.json(scores);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.createScores = async (req, res, next) => {
  try {
    const counts = await calculateScores(req.body.user_id, req.body.date);

    const score = await Score.create({
      user_id: req.body.user_id,
      neck_score_ratio: Math.round((counts.neckCnt / counts.totalCnt) * 10000) / 100,
      hip_score_ratio: Math.round((counts.hipCnt / counts.totalCnt) * 10000) / 100,
      knee_score_ratio: Math.round((counts.kneeCnt / counts.totalCnt) * 10000) / 100,
    });

    console.log(score);
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
  const neckCnt = await getPoseCount({ user_id: userId, date: date, neck: true });
  const hipCnt = await getPoseCount({ user_id: userId, date: date, hip: true });
  const kneeCnt = await getPoseCount({ user_id: userId, date: date, knee: true });

  return {
    totalCnt,
    neckCnt,
    hipCnt,
    kneeCnt,
  };
};

