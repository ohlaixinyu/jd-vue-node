const express = require('express')
const router = express.Router()
const Mpromise = require('node-mysql-promise')
const mysql = Mpromise.createConnection({
  host: '127.0.0.1',
  user: 'laixinyu',
  password: 'huangche201314',
  database: 'myigou'
})
let shopArr = []
let selectShopId = []
let index = 0
// 存入商品数据
function inserData (shop, res, len, resdata) {
  index++
  shopArr.push(shop)
  if (index === len) {
    let resArr = []
    resArr = [...shopArr]
    shopArr = []
    index = 0
    return res.send(resArr)
  }
  check(resdata, res)
}

// 根据购物车数据查询
function check (resdata, res) {
  const len = resdata.length
  mysql.table('product').where(`product_id=${selectShopId[index].product_id}`).select().then((data) => {
    inserData(data, res, len, resdata)
  }).catch((e) => {
    console.log(e)
  })
}

// 购物车查询
router.get('/carbuy', (req, res) => {
  // 查询购物车中的商品id和数量
  const userid = req.user.id
  // 购物车记录的商品id和数量

  mysql.table('goods_cart').where(`user_id=${userid} `).order('cart_id DESC').select().then((data) => {
    if (data.length !== 0) {
      selectShopId = data
      return check(data, res)
    }
    res.send({
      code: 204,
      message: '该用户没有购物车数据'
    })
  }).catch((e) => {
    console.log(e)
  })
})

module.exports = router
