
// 导入数据库操作模块
const db = require('../db/index')
// 导入密码加密解密模块
const bcrypt = require('bcryptjs')
// token生成
const jwt = require('jsonwebtoken')

// 注册
exports.regUser = (req, res) => {
  const userinfo = req.body
  if (!userinfo.email || !userinfo.pas || !userinfo.sms || !userinfo.username) {
    return res.send({
      code: 204,
      message: '数据不能为空'
    })
  }
  // 验证邮箱验证码
  const checkSms = 'select * from smstab where useremail=? and active=?'

  db.query(checkSms, [userinfo.email, 'true'], (err, result) => {
    if (err) {
      return res.send({
        code: 500,
        message: '注册失败'
      })
    }
    if (result.length > 0) {
      const sqlSms = result[0].sms
      if (String(userinfo.sms) === String(sqlSms)) {
        // 验证码正确
        // 加密密码
        userinfo.pas = bcrypt.hashSync(userinfo.pas, 10)
        // 插入用户
        const insertUser = 'insert into myuser(user_email,login_password,user_number)  values(?,?,?)'
        db.query(insertUser, [userinfo.email, userinfo.pas, userinfo.username], (err, result) => {
          if (err) {
            return res.send({
              code: 500,
              message: '注册失败'

            })
          }
          if (result.affectedRows === 1) {
            return res.send({
              code: 200,
              message: '注册成功'
            })
          } else {
            return res.send({
              code: 500,
              message: '注册失败'
            })
          }
        })
      } else {
        return res.send({
          code: 204,
          message: '验证码错误'
        })
      }
    } else {
      return res.send({
        code: 204,
        message: '尚未发送验证码'
      })
    }
  })
}

// 登录
exports.login = (req, res) => {
  const userinfo = req.body
  if (!userinfo.email || !userinfo.pas) {
    return res.send({
      code: 204,
      message: '不能为空'
    })
  }

  const sql = 'select * from myuser where user_email=?'
  db.query(sql, userinfo.email, (err, result) => {
    if (err) {
      return res.send({
        code: 204,
        message: '登录失败'
      })
    }
    if (result.length !== 1) {
      return res.send({
        code: 204,
        message: '登录失败'
      })
    }
    const compareRes = bcrypt.compareSync(userinfo.pas, result[0].login_password)
    if (!compareRes) {
      return res.send({
        code: 204,
        message: '登录失败'
      })
    }

    // 登录成功 生成token  jsonwebtoken
    // 剔除用户头像和密码的值
    const user = { ...result[0], login_password: '', photo: '' }
    const config = require('./tokenConfig.js')
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: '24h' // token有效期
    })

    // 将生成的Token字符串响应给客户端
    res.send({
      code: 200,
      message: '登录成功',
      token: `Bearer ${tokenStr}`
    })
  })
}

// 邮箱验证码
exports.sendEmail = (req, res) => {
  const back = res
  const email = req.body.email
  const check = 'select * from myuser where user_email=?'
  db.query(check, email, (err, res) => {
    if (err) {
      back.send({
        code: 500,
        message: '发送失败'
      }).end()
    }
    if (res.length > 0) {
      back.send({
        code: 204,
        message: '邮箱已注册'
      }).end()
    } else {
      const nodemailer = require('nodemailer')
      // ********************************************
      // ********************************************
      // 在这里设置你的SMTP信息
      const smtp = 'smtp.qq.com' // smtp服务器 QQ的是smtp.qq.com
      const mailFrom = '' // 你的发送者的email
      const mailPwd = '' // key

      // 设置目标对象
      const target = email
      // 设置随机验证码
      const sms = Math.round(Math.random() * (999999 - 100000) + 100000)

      // 创建发送实例
      const transporter = nodemailer.createTransport({
        host: smtp,
        auth: {
          user: mailFrom,
          pass: mailPwd
        }
      })

      const mailOptions = {
        from: mailFrom,
        to: target, // 接收者 可以同时多发 逗号隔开
        subject: '【京东邮箱注册验证码】', // 邮件标题
        html: `<div><h3>您的注册验证码是：</h3></div><h2>${sms}</h2><div>【京东团队】</div><div>以上内容仅用于学习研究</div>`
      }

      // 进行发送
      try {
        transporter.sendMail(mailOptions, (err, result) => {
          if (err) {
            console.log(err)
          }
          // 如果上一次已经发过了 将上次的验证码设置为失效状态
          const firsql = 'select id from smstab where useremail=? and active="true"'
          const noact = 'update smstab set active=? where id=?'
          db.query(firsql, target, (err, res) => {
            if (err) {
              back.send({
                code: 500,
                message: '发送失败'
              }).end()
            }
            if (res.length > 0) {
              // 说明已经发过 则把上次的作废
              const id = res[0].id
              db.query(noact, ['false', id], (err, res) => {
                if (err) {
                  back.send({
                    code: 500,
                    message: '发送失败'
                  }).end()
                }
                // 发送成功 保留最新的验证码
                const sql = 'insert into smstab(useremail,sms,active) values(?,?,?)'
                db.query(sql, [target, sms, 'true'], (err, res) => {
                  if (err) {
                    back.send({
                      code: 500,
                      message: '发送失败'
                    }).end()
                  }
                  if (res.length < 1) {
                    back.send({
                      code: 500,
                      message: '发送失败'
                    }).end()
                  }
                })
              })
            } else {
              // 一次也没有说明是第一次
              // 发送成功 保留最新的验证码
              const sql = 'insert into smstab(useremail,sms,active) values(?,?,?)'
              db.query(sql, [target, sms, 'true'], (err, res) => {
                if (err) {
                  back.send({
                    code: 500,
                    message: '发送失败'
                  }).end()
                }
                if (res.length < 1) {
                  back.send({
                    code: 500,
                    message: '发送失败'
                  }).end()
                }
              })
            }
          })
        })
      } catch (error) {
        console.log(error)
        back.send({
          code: 500,
          message: '发送失败'
        }).end()
      }
      back.send({
        code: 200,
        message: '发送成功'
      }).end()
    }
  })
}
