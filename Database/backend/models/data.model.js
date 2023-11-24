const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    idd: { type:String, required: true},
    score: {
        type: Number,
        required: true,
        trim: true, //remove empty space
        min: 0,
        max: 5,
    },
    part_name: {
        type: [String],
        required: false
    },
    date: {
        type:String,
        default: ()=>moment().format("hh:mm:ss")
    }
}, {
    timestamps: true,
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;