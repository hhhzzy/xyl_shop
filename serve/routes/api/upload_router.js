var router = require('koa-router')();
var upload_controller = require('../../app/controllers/upload_controller.js');

router.post('/upload', upload_controller.upload);
router.get('/deleteImg', upload_controller.deleteImg);

module.exports = router;