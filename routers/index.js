
// https://github.com/ZijianHe/koa-router#readme
const router = require('koa-router')()

const { getXml, validXml } = require('../controllers/xml')
const { getTask, deleteTask } = require('../controllers/task')

router.get('/api/xml', validXml)
router.post('/api/xml', getXml)
router.get('/api/getTask', getTask)
router.get('/api/deleteTask', deleteTask)

module.exports = router