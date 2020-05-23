var router = require('koa-router')();
var dic_controller = require('../../app/controllers/dictionary_controller');

router.get('/getDic', dic_controller.getDictionary);

module.exports = router;