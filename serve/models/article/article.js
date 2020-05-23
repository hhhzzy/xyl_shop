const mongoose = require('mongoose');
const db = require('../../db/connect.js');
const articleSchema = new mongoose.Schema({
    title: {type: String},
    summary: {type: String},
    dic: {type: Array},
    content: {type: String},
    createTime: {type: String},
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});
let articleModel = db.model('articles', articleSchema);
module.exports = articleModel;