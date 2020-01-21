const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    googleId: String,
    history: [{
        type: Schema.Types.ObjectId,
        ref: 'history'
    }],
    weapons: [{
        type: Schema.Types.ObjectId,
        ref: 'Weapon'
    }]
})
module.exports = mongoose.model('User', userSchema)