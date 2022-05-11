import request from '@/request/request'

// 搜索商品
export const searchProduct = params => {
  return request({
    method: 'GET',
    url: '/api/search',
    params
  })
}
