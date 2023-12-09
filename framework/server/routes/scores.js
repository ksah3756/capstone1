const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

router.post('/', scoreController.createScores);
router.get('/:user_id/:date', scoreController.getScoresByDate);

module.exports = router;
