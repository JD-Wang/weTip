

const Router = require('koa-router')
const router = Router()
const sha1 = require('sha1')
const { token } = require('../config/wx')
 
/**
 * 获取用户当前环境下的公网ip
 */
router.get('/checkSignature', async ( ctx )=>{
    console.log('ctx', ctx.query)
    const hashCode = crypto.createHash('sha1');
    const { signature, echostr, timestamp, nonce } = ctx.query
    const original = [token, timestamp, nonce].sort().join('')
    const combineStr = sha1(original)
    if(signature === combineStr){//比较
        ctx.body = echostr //返回echostr
	}else {
		console.log('checkSignature err')
	}
})
 
module.exports = router