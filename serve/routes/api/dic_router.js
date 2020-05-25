var router = require('koa-router')();
var dic_controller = require('../../app/controllers/dictionary_controller');

router.get('/getDic', dic_controller.getDictionary);
router.post('/upsertDic', dic_controller.upsertDic);
router.get('/delDic', dic_controller.delDic);

// 一类目录
router.post('/upsertTypeOne', dic_controller.upsertTypeOne); // 新增
router.get('/delTypeOne', dic_controller.delTypeOne); // 删除
router.get('/getTypeOne', dic_controller.getTypeOne);
// 二类目录
router.post('/upsertTypeTwo', dic_controller.upsertTypeTwo); // 新增
router.get('/getTypeTwo', dic_controller.getTypeTwo);
router.get('/delTypeTwo', dic_controller.delTypeTwo); // 删除


module.exports = router;