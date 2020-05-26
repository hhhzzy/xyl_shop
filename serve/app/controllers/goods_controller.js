const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
let operate = require('../../models/goods/operate');
const mongoose = require('mongoose');

/**
 * 新增或修改
 */
exports.upsertGoods = async (ctx, next) => {
    let param = ctx.request.body;
    if(param.title && param.summary){
        if (param._id) {
            await operate.upsert({'_id':param._id},param);
        } else {
            await operate.upsert({'title':param.title},param);
        }
    } else {
        return ctx.body = {
			code: 1,
			data: null,
			message: '请输入商品名称！'
		}
    }
}
/**
 * 查询列表
 * @param {} conditions 查询条件
 * @param {} fields 过滤条件
 * @param {} options 
 * @param {} page 当前页
 * @param {} num 每页显示多少个
 */
exports.findGoods = async (ctx, next) => {
    let param = ctx.request.body;
    const regTitle = param.title ? {$regex: new RegExp(param.title, 'i')} :''; //不区分大小写
    const regTypeOne = param.typeOne ? {$regex: new RegExp(param.typeOne, 'i')} :''; //不区分大小写
    let conditions = {};
    if(!param.title && !param.typeOne){
        conditions = {};
    }else{
        conditions = {
            $or:[
                {title: regTitle},
                {typeOne: regTypeOne}
            ]
        }
    }
    let fields = null; 
    let options = {};
    let page = param.page || 0;
    let num = param.num || 10;
    const result = await operate.find(conditions,fields,options,page,num);
    const total = await operate.count(conditions);
    if(result) {
        return ctx.body = {
            code: 0,
			data: {
                data:result,
                total:total
            },
			msg: '查询成功'
        }
    } else {
        return ctx.body = {
			code: 1,
			data: null,
			message: '查询失败'
		}
    }
}
/**
 * 查询单个详情
 */
exports.findOne = async (ctx,next) => {
    let param = ctx.request.body;
    console.log(param,'aaaaaaaaaa')
    if(param) {
        const result = await operate.findOne({_id:param.id});
        if (result) {
            return ctx.body = {
                code: 0,
                data: result,
                msg: '查询成功'
            }
        } else {
            return ctx.body = {
                code: 1,
                data: null,
                message: '查询失败'
            }
        }
    } else {
        return ctx.body = {
			code: 1,
			data: null,
			message: '没找到该条信息！'
		}
    }
}
/**
 * 删除
 */
exports.delGoods = async (ctx, next) => {
    let param = ctx.query;
    if (!param) {
        return ctx.body = {
			code: 1,
			data: null,
			message: '没找到该条信息！'
		}
    } else {
        const result = await operate.remove({_id:param.id});
        if (result.n > 0) {
            return ctx.body = {
                code: 0,
                data: result,
                msg: '删除成功！'
            }
        } else {
            return ctx.body = {
                code: 1,
                data: null,
                message: '删除失败！'
            }
        }
    }
}