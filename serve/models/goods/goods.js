const mongoose = require('mongoose');
const db = require('../../db/connect.js');
const goodsSchema = new mongoose.Schema({
    title: {type: String},
    typeOne: {type: String},
    typeTwo: {type: String},
    typeThree: {type: String},
    typeOneId: {type: String},
    typeTwoId: {type: String},
    typeThreeId: {type: String},
    summary: {type: String},
    sortIndex: {type: Number},
    imgUrl: {type: String},
    stock: {type:Number},
    price: {type:Number},
    createTime: {type: String},
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});
let goodsModel = db.model('good', goodsSchema);
module.exports = goodsModel;