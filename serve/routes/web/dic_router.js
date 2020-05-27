var router = require('koa-router')();
var dic_controller = require('../../app/controllers/dictionary_controller');

// 一类目录
router.get('/getTypeOne', dic_controller.getTypeOne);
// 二类目录
router.post('/getTypeTwo', dic_controller.getTypeTwo); // 查询
// 三类目录
router.post('/getTypeThree', dic_controller.getTypeThree); // 查询

module.exports = router;