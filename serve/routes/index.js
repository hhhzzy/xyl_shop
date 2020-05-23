const router = require('koa-router')()
const api = require('./api')
const web = require('./web')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '欢迎访问后台接口！'
  })
})

// 后台
router.use('/api', api.routes(), api.allowedMethods());
// 前端
router.use('/web',web.routes(), web.allowedMethods());

module.exports = router
