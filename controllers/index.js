const sha1 = require('sha1')
const { token } = require('../config/wx')
const WeChat = require('koa-easywechat')
const TimeNormalizer = require('chi-time-nlp')
const schedule = require('node-schedule')
const config = require('../config/wx')
const dayjs = require('dayjs')
 
/**
 * 验证
 */
const validXml = async ( ctx )=>{
    const { signature, echostr, timestamp, nonce } = ctx.query
    const original = [token, timestamp, nonce].sort().join('')
    const combineStr = sha1(original)
    // var data = '';
    // ctx.req.on('data', (chunk) => {
    //     data += chunk;
    // });
    // ctx.req.on('end', () => {
    //     console.log('================== 传输数据结束 ==================');
    //     const result = parser.toJson(data, { object: true })
    //     const jsonResult = result.xml || {}
    //     console.log(jsonResult, 'res')
            
    //     console.log(body, 'xxxxxxxx')
    //     ctx.type = 'application/xml'
    //     ctx.status = 200
    //     ctx.body = body
    // });

    // if(signature === combineStr){//比较
    ctx.body = echostr //返回echostr
    // }else {
    // 	console.log('================== checkSignature err ==================')
    // }
}

/**
 * 公众号消息回复
 */
const getXml = WeChat({
    appID: config.appID,
    appsecret: config.appsecret,
    token: config.token,
    isSafeModel: false,
    encodingAESKey: config.encodingAESKey,
}, async function (next) {
    // const wechat = this.wechat;
    // 获取消息后判断时间，存入任务队列
    const { MsgType, Content } = this.message
    if (MsgType === 'text') {
        const normalizer = new TimeNormalizer()
        const time = normalizer.parse(Content)

        if (time) {
            console.log(time)
            const date = new Date(time);
            const job = schedule.scheduleJob(date, function(){
                console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'), 'The world is going to end today.');
            });
            return this.reply = {
                type: 'text',
                content: `时间：${time}`
            }
        } else {
            return this.reply = {
                type: 'text',
                content: '我不能识别'
            }
        }
    }

    // 回复消息
    this.reply = 'success'
})
 
module.exports = {
    validXml,
    getXml
}