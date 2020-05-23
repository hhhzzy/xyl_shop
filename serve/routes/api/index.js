var router = require('koa-router')();
var user_router = require('./user_router');
var dic_router = require('./dic_router');
var article_router = require('./article_router');
var upload_router = require('./upload_router');
var goods_router = require('./goods_router');

router.use('/users', user_router.routes(), user_router.allowedMethods());
router.use('/dic', dic_router.routes(), dic_router.allowedMethods());
router.use('/article', article_router.routes(), article_router.allowedMethods());
router.use('/files', upload_router.routes(), upload_router.allowedMethods());
router.use('/goods', goods_router.routes(), goods_router.allowedMethods());

module.exports = router;