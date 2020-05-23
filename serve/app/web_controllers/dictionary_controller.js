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