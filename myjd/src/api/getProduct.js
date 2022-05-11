import request from '@/request/request'

// 获取全部的商品
export const getAllProduct = params => {
  return request({
    method: 'GET',
    url: '/api/getproduct',
    params
  })
}

// 根据id获取商品详情
export const getProductById = params => {
  return request({
    method: 'GET',
    url: '/api/getProductById',
    params
  })
}
