// 导入express
const express = require('express')
// 导入cors配置跨域
const cors = require('cors')
// body解析
const bodyParser = require('body-parser')
// 创建实例
const app = express()
// 使用跨域
app.use(cors())
// 配置解析表单数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// token认证
const tokenConfig = require('./router_handler/tokenConfig')
const expressJWT = require('express-jwt')

// 使用unless({ path: [/^\/api\//]}) 指定哪些接口不需要认证
app.use(expressJWT({ secret: tokenConfig.jwtSecretKey }).unless({ path: [/^\/api\//] }))
// 路由模块
const userRouter = require('./router/user.js')
const userinfoRouter = require('./router_handler/userinfo.js')
const userCar = require('./router/usercarbuy')
const getProduct = require('./router/getProduct')
const addCartAll = require('./router/controlCart.js')
const getCategoryAll = require('./router/category')
const search = require('./router/select')

// 启用路由模块
app.use('/api', userRouter)
app.use('/api', getCategoryAll.cateGory)
app.use('/api', getCategoryAll.getProductBycate)
app.use('/api', getProduct.getProductAll)
app.use('/api', getProduct.getProductById)
app.use('/api', search)
app.use('/my', userinfoRouter)
app.use('/my', userCar)
app.use('/my', addCartAll.addCart)
app.use('/my', addCartAll.deleteCart)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({
      code: 401,
      message: '身份认证失败'
    })
  } else {
    return res.send({
      code: 500,
      message: '服务器端出错'
    })
  }
})

// 启动服务并监听窗口80
app.listen(80, () => {
  console.log('serve is running at http://127.0.0.1:80')
})
