var router = require('koa-router')();
var dic_controller = require('../../app/controllers/dictionary_controller');


// 一类目录
router.post('/upsertTypeOne', dic_controller.upsertTypeOne); // 新增
router.get('/delTypeOne', dic_controller.delTypeOne); // 删除
router.get('/getTypeOne', dic_controller.getTypeOne);
// 二类目录
router.post('/upsertTypeTwo', dic_controller.upsertTypeTwo); // 新增
router.post('/getTypeTwo', dic_controller.getTypeTwo); // 查询
router.get('/delTypeTwo', dic_controller.delTypeTwo); // 删除
// 三类目录
router.post('/upsertTypeThree', dic_controller.upsertTypeThree); // 新增
router.post('/getTypeThree', dic_controller.getTypeThree); // 查询
router.get('/delTypeThree', dic_controller.delTypeThree); // 删除



module.exports = router;