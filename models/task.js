const mongoose = require('mongoose')

// 定时任务协议
const taskSchema = new mongoose.Schema({
  content: String, // 任务内容
  runTime: String, // 任务执行时间
  hasNotice: Boolean, // 是否执行过
  user: String, // 创建者
});

module.exports = mongoose.model('Task', taskSchema);