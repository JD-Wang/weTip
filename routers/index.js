
// https://github.com/ZijianHe/koa-router#readme
const router = require('koa-router')()

const { getXml, validXml } = require('../controllers/index')

router.get('/api/xml', validXml)
router.post('/api/xml', getXml)

module.exports = router