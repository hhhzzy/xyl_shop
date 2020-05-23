const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
let operate = require('../../models/article/operate');
const fs = require('fs');
//获取用户
exports.upload = async (ctx, next) => {
    const file = ctx.request.files.i;	// 获取上传文件
    return ctx.body = {
        code: '0',
        data: 'uploads/'+ctx.request.files.file.name,
        msg: 'success'
    }
}