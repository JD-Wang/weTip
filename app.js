const Koa = require('koa')
// 导入koa2-cors模块
// const cors = require('koa2-cors')
const app = new Koa()
const dayjs = require('dayjs')
const { port } = require('./package.json')
const routers = require('./routers/index.js')
const mongoUtil = require('./utils/mongoUtil')
const schedule = require('node-schedule')
const Task = require('./models/task')

mongoUtil.connect(() => {
  // 重启后，把所有的任务都加入到队列里
  Task.find({hasNotice: false, runTime: {$ne: null}}).then(res => {
    res.forEach(item => {
      console.log('加入任务队列：', item.runTime);
      item.runTime && schedule.scheduleJob(item.runTime, function(){
        console.log(dayjs().format('【开始通知】： YYYY-MM-DD HH:mm:ss'), 'The world is going to end today.')
      })
    })
  })
})

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// error
app.use(async (ctx, next) => {
  try {
      await next()
  } catch(err) {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = err.message
      ctx.app.emit('error', err, ctx);
  }
})

app.listen(port, () => {
  console.log(`[demo] route-use-middleware is starting at port ${port}`)
})