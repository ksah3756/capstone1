const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
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
}, {
    timestamps: {createdAt: 'date'},
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;