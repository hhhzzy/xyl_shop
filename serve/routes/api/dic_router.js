var router = require('koa-router')();
var dic_controller = require('../../app/controllers/dictionary_controller');

router.get('/getDic', dic_controller.getDictionary);
router.post('/upsertDic', dic_controller.upsertDic);
router.get('/delDic', dic_controller.delDic);
router.post('/delTypeTwo', dic_controller.delTypeTwo);

module.exports = router;