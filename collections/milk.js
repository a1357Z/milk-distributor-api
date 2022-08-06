const mongoose = require('mongoose');
const { milkTypes } = require('../enums')
const milkSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: milkTypes, // can we read the values dynamically from the milk documents 
        default: "cow",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Cannot be negative'],
        default: 1000
    },
    date: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('milk', milkSchema);