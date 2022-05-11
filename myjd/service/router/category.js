// 分类操作
const expres = require('express')
const router = expres.Router()
const db = require('../db/index')

// 拉取分类信息
module.exports.cateGory = router.get('/getCategory', (req, res) => {
  const sql = 'select * from category'
  db.query(sql, (err, result) => {
    if (err) {
      return res.send({
        code: 500,
        message: '加载错误'
      })
    }
    if (result.length > 0) {
      return res.send(result)
    } else {
      return res.send({
        code: 204,
        message: '数据为空'
      })
    }
  })
})

// 根据分类id拉取对应商品
module.exports.getProductBycate = router.get('/getProductCate', (req, res) => {
  // 获取分类id
  const cateId = req.query.cate_id
  if (!cateId) {
    return res.send({
      code: 204,
      message: '参数错误'
    })
  }
  const sql = 'select * from product where category_id=?'
  db.query(sql, cateId, (err, result) => {
    if (err) {
      return res.send({
        code: 500,
        message: '加载失败'
      })
    }
    if (result.length > 0) {
      return res.send(result)
    }
    res.send({
      code: 204,
      message: '数据为空'
    })
  })
})
