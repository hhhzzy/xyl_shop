var router = require('koa-router')();
var article_controller = require('../../app/controllers/article_controller');

router.post('/upsertArticle', article_controller.upsertArticle);
router.post('/findArticle', article_controller.findArticle);
router.get('/delArticle', article_controller.delArticle);
router.post('/findOne', article_controller.findOne);

module.exports = router;