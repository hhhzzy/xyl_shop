var router = require('koa-router')();
var user_controller = require('../../app/controllers/user_controller');

router.get('/getUser', user_controller.getUser);
router.post('/registerUser', user_controller.registerUser);
router.post('/login', user_controller.login);
router.get('/findAllUser', user_controller.findAllUser);

module.exports = router;