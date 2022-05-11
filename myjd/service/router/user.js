const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入处理函数
const userHandler = require('../router_handler/user.js')

// 注册新用户
router.post('/reguser', userHandler.regUser)

// 登录
router.post('/login', userHandler.login)

// 发送邮箱注册邮件
router.post('/sendEmail', userHandler.sendEmail)

// 向外共享
module.exports = router
