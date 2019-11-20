// created by xumx on 2019/11/20
const Router = require('koa-router')
const router = new Router()
const main_controllers = require('../../app/controllers/main_controllers')

router.post('/main/feedback', main_controllers.feedback)
module.exports = router