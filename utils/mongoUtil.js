const { dbUrl } = require('../config/db')
const mongoose = require('mongoose')

module.exports = {
  connect: function(callback) {
    mongoose.connect(dbUrl)
    var db = mongoose.connection
    db.on('error', console.error.bind(console, '连接错误:'));
    db.once('open', () => {
      console.log('连接成功')
      callback()
    })
  },
  mongoObj: function(){
    return mongoose;	
  }
}

