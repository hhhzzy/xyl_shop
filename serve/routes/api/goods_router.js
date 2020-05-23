var router = require('koa-router')();
var goods_controller = require('../../app/controllers/goods_controller');

router.post('/upsertGoods', goods_controller.upsertGoods);
router.post('/findGoods', goods_controller.findGoods);
router.get('/delGoods', goods_controller.delGoods);
router.post('/findOne', goods_controller.findOne);

module.exports = router;