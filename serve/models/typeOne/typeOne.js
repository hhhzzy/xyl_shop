const mongoose = require('mongoose');
const db = require('../../db/connect.js');
const dicSchema = new mongoose.Schema({
    typeOne: { type: String },
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});
let typeOneModel = db.model('typeones', dicSchema);
module.exports = typeOneModel;