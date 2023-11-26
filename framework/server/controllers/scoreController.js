const Score = require('../models/score');
const Pose = require('../models/pose');

exports.getScoresByDate = async (req, res, next) => {
  try {
    const scores = await Score.find({ user_id: req.params.id, date: req.params.date });
    res.json(scores);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.createScores = async (req, res, next) => {
  try {
    const counts = await calculateScores(req.params.id, req.params.date);

    const score = await Score.create({
      user_id: req.params.id,
      kneck_score_ratio: Math.round((counts.kneckCnt / counts.totalCnt) * 10000) / 100,
      elbow_score_ratio: Math.round((counts.elbowCnt / counts.totalCnt) * 10000) / 100,
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
  const totalCnt = await getPoseCount({ user_id: userId, date });
  const kneckCnt = await getPoseCount({ user_id: userId, date, kneck: true });
  const elbowCnt = await getPoseCount({ user_id: userId, date, elbow: true });
  const hipCnt = await getPoseCount({ user_id: userId, date, hip: true });
  const kneeCnt = await getPoseCount({ user_id: userId, date, knee: true });

  return {
    totalCnt,
    kneckCnt,
    elbowCnt,
    hipCnt,
    kneeCnt,
  };
};

