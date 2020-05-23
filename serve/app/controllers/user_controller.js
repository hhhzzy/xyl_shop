const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const jwt = require('jsonwebtoken');
let operate = require('../../models/user/operate');
//获取用户
exports.getUser = async (ctx, next) => {
        //如果id != 1抛出API 异常
    // if(ctx.query.id != 1){
    //     return ctx.body = {
    //         code: 1,
	// 		data: null,
	// 		msg: '没找到'
    //     }
    // }
    ctx.body = {
        userName: 'hzy',
        age: 30
    }
}
//用户登录
exports.login = async (ctx, next) => {
    const data = ctx.request.body;
	if(!data.userName || !data.password){
		return ctx.body = {
			code: 1,
			data: null,
			msg: '参数不合法'
		}
    }
    const result = await operate.findOne({
		userName: data.userName,
		password: data.password
    })
	if(result !== null){
		const token = jwt.sign({
			name: result.name,
			_id: result._id
		}, 'hzy_token', { expiresIn: '2h' });
		return ctx.body = {
			code: '0',
			data: token,
			msg: '登录成功'
		}
	}else{
		return ctx.body = {
			code: 1,
			data: null,
			msg: '用户名或密码错误'
		}
	}
}
//用户注册
exports.registerUser = async (ctx, next) => {
    console.log('registerUser', ctx.request.body);
}
exports.findAllUser = async (ctx, next) => {
    const data = ctx.request.body;
    const result = await operate.find();
    ctx.body = {
        code: '0',
        data: result,
        msg: '登录成功'
    }
}