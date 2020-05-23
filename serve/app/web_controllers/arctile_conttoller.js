const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
let operate = require('../../models/article/operate');
const mongoose = require('mongoose');
/**
 * 查询列表
 * @param {} conditions 查询条件
 * @param {} fields 过滤条件
 * @param {} options 
 * @param {} page 当前页
 * @param {} num 每页显示多少个
 */
exports.findArticle = async (ctx, next) => {
    let param = ctx.request.body;
    let conditions = {}
    if (param.dic) {
        conditions = {
            dic: param.dic
        };
    }
    let fields = null; 
    let options = {};
    let page = param.page || 0;
    let num = param.num || 10;
    console.log(param)
    console.log(conditions)
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
 * 查询详情
 * @param {} _id 查询id
 */
exports.findOne = async (ctx,next) => {
    let param = ctx.request.body;
    if(param) {
        const result = await operate.findOne({_id:param._id});
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
exports.count = async (ctx, next) => {
    let param = ctx.request.body;
    let conditions = {
        dic: param.dic || ''
    };
    const total = await operate.count(conditions);
    if(total) {
        return ctx.body = {
            code: 0,
            total:total,
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