const Koa = require('koa')
const fs = require('fs')
// 导入koa2-cors模块
// const cors = require('koa2-cors')
const app = new Koa()
const { port } = require('./package.json')

const routers = require('./routers/index.js')

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())
 
app.listen(port, () => {
  console.log(`[demo] route-use-middleware is starting at port ${port}`)
})