import request from '@/request/request'
import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'applicattion/x-www-form-urlencoded'

// 注册用户
export const createUser = data => {
  return request({
    method: 'POST',
    url: '/api/reguser',
    data: data
  })
}

// 发送验证码
export const sendSMS = data => {
  return request({
    method: 'POST',
    url: '/api/sendEmail',
    data
  })
}

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/login',
    data
  })
}

// 拉取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/my/user'
  })
}
