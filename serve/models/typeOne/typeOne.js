const mongoose = require('mongoose');
const db = require('../../db/connect.js');
const dicSchema = new mongoose.Schema({
    typeOne: { type: String },
    sortNumber: { type: Number, default: null}
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});
let typeOneModel = db.model('typeones', dicSchema);
module.exports = typeOneModel;