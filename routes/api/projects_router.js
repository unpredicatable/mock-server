/**   created by star on 2019/10/18
 *    个人仓库模块
 *
 */
const Router = require('koa-router')
const router = new Router()
const projects_controller = require('../../app/controllers/projects_controllers')


router.post('/create', projects_controller.create)
router.post('/update', projects_controller.update)
router.post('/remove', projects_controller.remove)

module.exports = router