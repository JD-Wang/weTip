const Task = require('../models/task')

// 存入数据库
module.exports = async (data) => {
  const t = new Task(data)
  try {
    const res = await t.save()
    return true
  } catch (error) {
    return false
  }
}
