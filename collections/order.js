const mongoose = require('mongoose');
const { milkTypes } = require('../enums')
const orderSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: milkTypes, // can we read the values dynamically from the milk documents 
        default: 'cow',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Cannot be empty'],
    },
    status: {
        type: String,
        required: true,
        default: "placed"
    },
    date: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);