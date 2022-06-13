const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        required: true
    },
    password: {
        type: String,
        min: 2,
        required: true
    },
    email: {
        type: String,
        min: 2,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }    
})

module.exports = mongoose.model('user-data', User);