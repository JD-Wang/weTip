const axios = require('axios')

// 企业微信
const qywx_corpid = ''
const qywx_corpsecret = ''
const qywx_agentid = 0

// 微信
const wx_appID = '',
const wx_appsecret = '',
const wx_encodingAESKey = ''
const wx_token = ''

// mongodb 密码账号
const db_account = ''
const db_password = ''

/**
 * 获取企业微信token
 */
 let token = ''
 let token_expires_in = 7200 // 一般都是2个小时
 let token_start_time = Date.now() 
 const getToken = async function () {
   const overTime = (Date.now() - token_start_time) > token_expires_in * 1000
   if (token && !overTime) {
     return token
   } else {
     const res = await axios.get(`https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${qywx_corpid}&corpsecret=${qywx_corpsecret}`)
     if (res.data && res.data.errcode === 0) {
       token = res.data.access_token
       token_start_time = Date.now()
     }
     return token
   }
 }

module.exports = {
  appID: wx_appID,
  appsecret: wx_appsecret,
  token: wx_token,
  encodingAESKey: wx_encodingAESKey,
  // 企业微信
  corpid: qywx_corpid,
  corpsecret: qywx_corpsecret,
  getToken,
  touser: '@all',
  msgtype: 'text',
  agentid: qywx_agentid,
  dbUrl: `mongodb://${db_account}:${db_password}@localhost/test`, // mongodb 地址
}