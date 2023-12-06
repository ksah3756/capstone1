const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

router.route('/')
  .get(scoreController.getScoresByDate)
  .post(scoreController.createScores);

module.exports = router;
