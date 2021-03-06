const mongoose = require('mongoose');
const db = require('../../db/connect.js');
const dicSchema = new mongoose.Schema({
    typeOneId: { type: String },
    typeOne: { type: String },
    typeTwo: { type: String },
    sortNumber: { type: Number, default: null}
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});
let typeTwoModel = db.model('typetwos', dicSchema);
module.exports = typeTwoModel;