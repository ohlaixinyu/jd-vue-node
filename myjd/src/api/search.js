import request from '@/request/request'

// ๆ็ดขๅๅ
export const searchProduct = params => {
  return request({
    method: 'GET',
    url: '/api/search',
    params
  })
}
