const express = require('express')
const router = express.Router()
const db = require('../db/index')

// 获取所有的商品--分页
module.exports.getProductAll = router.get('/getproduct', (req, res) => {
  // 页码
  const page = req.query.page
  // 每页限制
  const pageLimit = req.query.limit
  // sql
  const sql = 'select * from product limit ?,?'
  // 计算
  const regpage = page * pageLimit - pageLimit
  const reglimit = page * pageLimit
  // 执行sql
  db.query(sql, [regpage, reglimit], (err, result) => {
    if (err) {
      return res.send({
        code: 500,
        message: '加载失败'
      })
    }
    return res.send(result)
  })
})

// 根据id查找商品
module.exports.getProductById = router.get('/getProductById', (req, res) => {
  // 获取商品id
  const id = req.query.product_id
  if (!id) {
    return res.send({
      code: 500,
      message: '商品id为空'
    })
  }
  const sql = 'select * from product where product_id=?'
  db.query(sql, id, (err, result) => {
    if (err) {
      return res.send({
        code: 500,
        message: '加载失败'
      })
    }
    if (result.length === 1) {
      return res.send(result[0])
    }
    res.send({
      code: 204,
      message: '商品不存在'
    })
  })
})
