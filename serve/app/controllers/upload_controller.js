const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
let operate = require('../../models/article/operate');
const fs = require('fs');
//上传文件
exports.upload = async (ctx, next) => {
    const file = ctx.request.files.i;	// 获取上传文件
    console.log(ctx.request.files.file)
    return ctx.body = {
        code: '0',
        data: {
            path:'uploads/'+ctx.request.files.file.name,
            name:ctx.request.files.file.name
        },
        msg: 'success'
    }
    
}

//删除文件
exports.deleteImg = async (ctx, next) => {
    let param = ctx.query;
    console.log('uploads/'+param.name,'99999');
    const file = fs.unlinkSync('public/uploads/'+param.name);	// 获取上传文件
    console.log(file,'8888');
    if(file == undefined){
        return ctx.body = {
            code: '0',
            msg: 'success'
        }
    }
    
}