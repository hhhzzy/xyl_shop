var router = require('koa-router')();
var goods_router = require('./goods_router');
var dic_router = require('./dic_router');
router.get('/', async (ctx, next) => {
    await ctx.render('index', {
      title: '欢迎访问前端接口！'
    })
})
router.use('/goods', goods_router.routes(), goods_router.allowedMethods());
router.use('/dic', dic_router.routes(), dic_router.allowedMethods());
module.exports = router;