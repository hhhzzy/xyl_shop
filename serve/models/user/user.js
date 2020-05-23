const mongoose = require('mongoose');
const db = require('../../db/connect.js');
const userSchema = new mongoose.Schema({
    number: { type: Number},
    email: { type: String },
    userName: { type: String },
    password: { type: String },
    rePassword: { type: String },
    mobile: { type: String },
    question: { type: String },
    answer: { type: String },
});
let userModel = db.model('users', userSchema);
module.exports = userModel;