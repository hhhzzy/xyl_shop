const mongoose = require('mongoose');
const db = require('../../db/connect.js');
const dicSchema = new mongoose.Schema({
    typeTwoId: { type: String },
    typeTwo: { type: String },
    typeOne: { type: String },
    typeOneId: { type: String },
    typeThree: { type: String }
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});
let typeThreeModel = db.model('typethrees', dicSchema);
module.exports = typeThreeModel;