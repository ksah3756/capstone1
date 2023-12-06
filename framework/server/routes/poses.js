const express = require('express');
const poseController = require('../controllers/poseController');
const router = express.Router();

// router.get('/:id', poseController.getAllPoses);
router.post('/', poseController.createPose);
// router.get('/:id/:date', poseController.getPosesByDate);

module.exports = router;
