
// https://github.com/ZijianHe/koa-router#readme
const router = require('koa-router')()

const { xml, task } = require('../controllers/index')

router.get('/api/xml', xml.validXml)
router.post('/api/xml', xml.getXml)
router.get('/api/getTask', task.getTask)
router.get('/api/deleteTask', task.deleteTask)

module.exports = router