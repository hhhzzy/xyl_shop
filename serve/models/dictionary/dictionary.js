const mongoose = require('mongoose');
const db = require('../../db/connect.js');
const dicSchema = new mongoose.Schema({
    typeOne: { type: String },
    typeTwo: { type: Array },
    title: { type: String },
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});
let dicModel = db.model('dictionarys', dicSchema);
module.exports = dicModel;