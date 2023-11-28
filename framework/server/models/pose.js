const mongoose = require('mongoose');
const moment = require('moment')
const { Schema } = mongoose;

const poseSchema = new Schema({
  user_id:{
    type: String,
    required: true,
  },
  kneck: Boolean,
  hip: Boolean,
  knee: Boolean,
  date: {
    type: String,
    default: ()=>moment().format("YYYY-MM-DD") 
  }
});

module.exports = mongoose.model('Pose', poseSchema);