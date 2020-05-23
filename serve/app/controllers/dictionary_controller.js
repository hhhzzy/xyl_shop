let operate = require('../../models/dictionary/operate');
//获取字典
exports.getDictionary = async (ctx, next) => {
    console.log(ctx.query)
    const result = await operate.find();
    if(result){
        ctx.body = {
            code: '0',
			data: result,
			msg: 'success'
        }
    } else {
        return ctx.body = {
			code: '1',
			data: null,
			msg: 'error'
		}
    }
}
// 查询单个页面
exports.getInfo = async (ctx, next) => {
    console.log(ctx.query)
    const param = ctx.query;
    const result = await operate.findOne({typeOne:param.typeOne});
    if(result){
        ctx.body = {
            code: '0',
			data: result,
			msg: 'success'
        }
    } else {
        return ctx.body = {
			code: '1',
			data: null,
			msg: 'error'
		}
    }
}
/**
 * 新增或修改
 */
exports.upsertDic = async (ctx, next) => {
    let param = ctx.request.body;
    console.log(param,'44')
    if(param.typeOne){
        if (param._id) {
            if(param.typeTwo){  //修改二级目录
                await operate.findOneAndUpdateTypeTwo({'_id':param._id},param)
            } else { // 修改一级目录
                console.log(param,'9999')
                await operate.upsert({'_id':param._id},param);
            }
        } else {
            await operate.upsert({'typeOne':param.typeOne},param);
        }
    } else {
        return ctx.body = {
			code: 1,
			data: null,
			message: '没找到该字典！'
		}
    }
}
/**
 * 删除
 */
exports.delDic = async (ctx, next) => {
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
/**
 * 删除二级分类
 * 
 */
exports.delTypeTwo = async (ctx, next) => {
    let param = ctx.request.body;
    console.log(param,'9999');
    if (!param) {
        return ctx.body = {
			code: 1,
			data: null,
			message: '没找到该条信息！'
		}
    } else {
        const result = await operate.delTypeTwo({_id:param.id},{typeTwo:param.name});
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