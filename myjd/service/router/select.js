const express = require('express')
const router = express.Router()
const db = require('../db/index')

router.get('/search', (req, res) => {
// 获取搜索内容
  let val = req.query.searchVal
  if (val.length === 0) {
    return res.send({
      code: 204,
      messsage: '参数不能为空'
    })
  }
  // 执行模糊查询
  const sql = 'select * from product where product_name like ? '
  val = `%${val}%`
  db.query(sql, val, (err, result) => {
    if (err) {
      return res.send({
        code: 500,
        message: '操作失败'
      })
    }
    if (result.length === 0) {
      return res.send({
        code: 204,
        message: '搜索为空'
      })
    }
    res.send(result)
  })
})

module.exports = router
