
// https://github.com/ZijianHe/koa-router#readme
const router = require('koa-router')()

const controllers = require('../controllers/index')

router.use('/api', controllers.routes(), controllers.allowedMethods())

module.exports = router