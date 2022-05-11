import request from '@/request/request'

// 获取所有分类信息
export const getCateAll = () => {
  return request({
    method: 'GET',
    url: '/api/getCategory'
  })
}

// 根据id获取分类商品
export const getProductById = params => {
  return request({
    method: 'GET',
    url: '/api/getProductCate',
    params
  })
}
