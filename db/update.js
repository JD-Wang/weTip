const Task = require('../models/task')

// 更新数据库
module.exports = async (query, updateData) => {
  try {
    const res = await Task.updateOne(query, updateData)
    return true
  } catch (error) {
    return false
  }
}