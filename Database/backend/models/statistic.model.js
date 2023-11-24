const mongoose = require('mongoose')
const moment = require('moment');

const Schema = mongoose.Schema;

const statisticSchema = new Schema({
    //score_ratio: { type:[Number], required: true },
    idd: { type:String, required: true},
    score_ratio : {
        list:[{
            0 : Number,
            1 : Number,
            2 : Number,
            3 : Number,
            4 : Number,
            5 : Number
        }]
    },
    date: {
        type:String,
        default: ()=>moment().format("YYYY-MM-DD")
    }
}, {
    timestamps: true,
});

const Statistic = mongoose.model('Statistic', statisticSchema);

module.exports = Statistic;