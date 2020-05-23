var router = require('koa-router')();
var goods_controller = require('../../app/controllers/goods_controller');

router.post('/findGoods', goods_controller.findGoods);
router.post('/findOne', goods_controller.findOne);


module.exports = router;