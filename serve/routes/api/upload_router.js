var router = require('koa-router')();
var upload_controller = require('../../app/controllers/upload_controller.js');

router.post('/upload', upload_controller.upload);

module.exports = router;