const Pose = require('../models/pose');

exports.getAllPoses = async (req, res, next) => {
  try {
    const poses = await Pose.find({ user_id: req.params.id });
    res.json(poses);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.createPose = async (req, res, next) => {
  try {
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
};

exports.getPosesByDate = async (req, res, next) => {
  try {
    const poses = await Pose.find({ user_id: req.params.id, date: req.params.date });
    res.json(poses);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
