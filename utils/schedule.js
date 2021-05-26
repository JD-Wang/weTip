const schedule = require('node-schedule')

module.exports = time => {
  schedule.scheduleJob(time, function (runTime) {
    console.log('执行时间：', runTime)
  })
}