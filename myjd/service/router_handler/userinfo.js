const express = require('express')
const router = express.Router()

router.get('/user', (req, res) => {
  // 返回用户信息
  res.send(req.user)
})

module.exports = router
