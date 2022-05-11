const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'laixinyu',
  password: 'huangche201314',
  database: 'myigou'
})

// 向外导出
module.exports = db
