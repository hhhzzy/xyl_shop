var router = require('koa-router')();
var article_controller = require('../../app/web_controllers/arctile_conttoller');


router.post('/findArticle', article_controller.findArticle);
router.post('/findOne', article_controller.findOne);
router.post('/count', article_controller.count);

module.exports = router;