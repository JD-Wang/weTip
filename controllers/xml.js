const sha1 = require('sha1')
const { token } = require('../config/wx')
const WeChat = require('koa-easywechat')
const TimeNormalizer = require('chi-time-nlp')
const schedule = require('node-schedule')
const config = require('../config/wx')
const dayjs = require('dayjs')
const Task = require('../models/task')
const { qyNotice } = require('./qywx')

/**
 * 验证
 */
const validXml = async ( ctx )=>{
    const { signature, echostr, timestamp, nonce } = ctx.query
    const original = [token, timestamp, nonce].sort().join('')
    const combineStr = sha1(original)
    console.log(echostr, 'echostr')
    // var data = ''
    // ctx.req.on('data', (chunk) => {
    //     data += chunk
    // })
    // ctx.req.on('end', () => {
    //     console.log('================== 传输数据结束 ==================')
    //     const result = parser.toJson(data, { object: true })
    //     const jsonResult = result.xml || {}
    //     console.log(jsonResult, 'res')
            
    //     console.log(body, 'xxxxxxxx')
    //     ctx.type = 'application/xml'
    //     ctx.status = 200
    //     ctx.body = body
    // })

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
}, async function(next) {
    // const wechat = this.wechat
    // 获取消息后判断时间，存入任务队列
    console.log(this.message, 'this.message')
    const { MsgType, Content, FromUserName } = this.message
    if (MsgType === 'text') {
        const normalizer = new TimeNormalizer()
        const time = normalizer.parse(Content)

        console.log('识别的时间：', time)
        if (time) {
            const date = new Date(time)
            
            // 存入数据库
            const t = new Task({
                content: Content, //任务内容
                runTime: time, //浏览次数
                hasNotice: false,
                user: FromUserName
            })
            await t.save(function(err, data) {
                console.log('save: ', err, data)
                if (err) return
                // 加入任务队列
                const job = schedule.scheduleJob(date, function(){
                    console.log(dayjs().format('【开始通知】： YYYY-MM-DD HH:mm:ss'), data.content)
                    qyNotice(data.content)
                    Task.updateOne({ _id: data._id }, { hasNotice: true }, function(err, res) {   
                        if(err){
                            console.log('updateOne', err)
                            return
                        }  
                        console.log('成功') 
                    })
                })
            })
            
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