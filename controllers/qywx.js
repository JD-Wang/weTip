const axios = require('axios')
const { touser, agentid, getToken } = require('../config/wx')
const qyNotice = async function(content) {
  const token = await getToken()
  console.log('token', token)
  if (token) {
    return axios.post(`https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${token}`, {
      touser,
      msgtype: 'text',
      agentid,
      text: {
        content
      }
    })
  }
}

module.exports = {
  qyNotice
}