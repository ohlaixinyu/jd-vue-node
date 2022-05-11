// 操作购物车
const express = require('express')
const db = require('../db/index')
const router = express.Router()

// 添加购物车
module.exports.addCart = router.post('/addCart', (req, res) => {
  // 接收商品id
  const id = req.body.product_id
  // 接收用户id
  const userId = req.user.id
  if (!id || !userId) {
    return res.send({
      code: 500,
      message: '参数错误'
    })
  }
  const sql = 'select product_id from goods_cart where product_id=? and user_id=?'
  db.query(sql, [id, userId], (err, result) => {
    if (err) {
      return res.send({
        code: 500,
        message: '操作失败'
      })
    }
    if (result.length > 0) {
      return res.send({
        code: 204,
        message: '已存入购物车'
      })
    }
    // 执行存入操作
    const insertSql = 'insert into goods_cart(user_id,product_id,goods_num) values(?,?,?)'
    db.query(insertSql, [userId, id, 1], (err, result) => {
      if (err) {
        return res.send({
          code: 500,
          message: '操作失败'
        })
      }
      if (result.affectedRows === 1) {
        return res.send({
          code: 200,
          message: '添加成功'
        })
      }
      res.send({
        code: 500,
        message: '添加失败'
      })
    })
  })
})

// 删除购物车
module.exports.deleteCart = router.delete('/deleteCart', (req, res) => {
  // 准备用户id
  const userId = req.user.id
  // 接收商品id
  const productId = req.body.product_id
  if (!userId || !productId) {
    return res.send({
      code: 500,
      message: '参数错误'
    })
  }
  const sql = 'delete from goods_cart where user_id=? and product_id=?'
  db.query(sql, [userId, productId], (err, result) => {
    if (err) {
      return res.send({
        code: 500,
        message: '操作失败'
      })
    }
    if (result.affectedRows === 1) {
      return res.send({
        code: 200,
        message: '删除成功'
      })
    }
    res.send({
      code: 204,
      message: '商品不存在'
    })
  })
})
