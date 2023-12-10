const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

router.post('/', scoreController.createScores);
router.get('/:user_id', scoreController.getScoresById);

module.exports = router;
