const Task = require('../models/task')
/**
 * 新增任务
 */
const createTask = async params => {
}

/**
 * 修改任务
 */
function updateTask() {

}
/**
 * 删除任务
 */
function deleteTask() {

}
/**
 * 查询任务
 */
const getTask = async ctx => {
  const { user } = ctx.query
  console.log('query user:', user)
  if (!user) return ctx.body = '参数错误'
  ctx.body = await Task.find({user})
}

module.exports = {
  createTask,
  deleteTask,
  updateTask,
  getTask,
}