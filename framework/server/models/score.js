const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const scoreSchema = new Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  user_id: {
    type: String,
    required: true,
  },
  // 0~4까지 ratio 저장
  kneck_score_ratio: Number,
  elbow_score_ratio: Number,
  hip_score_ratio: Number,
  knee_score_ratio: Number,
  date: {
    type: String,
    default: ()=>moment().format("YYYY-MM-DD")
  }
});

module.exports = mongoose.model('Score', scoreSchema);