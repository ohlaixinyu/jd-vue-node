// 导入axios
import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 封装axios模块
const request = axios.create({
  baseURL: 'http://127.0.0.1'
})
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    const user = store.state.user
    if (user) {
      config.headers.Authorization = user
    }
    return config
  },
  function (error) {
    return error
  }
)

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    if (response.data && response.data.code === 401) {
      // 身份登录
      return router.push('/login')
    }
    return response
  }
)

export default request
