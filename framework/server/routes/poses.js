const express = require('express');
const poseController = require('../controllers/poseController');
const router = express.Router();

router.get('/:id', poseController.getAllPoses);
router.post('/:id', poseController.createPose);
router.get('/:id/:date', poseController.getPosesByDate);

module.exports = router;
