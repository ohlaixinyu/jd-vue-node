import request from '@/request/request'

// 加载购物车
export const getBuyCar = () => {
  return request({
    method: 'GET',
    url: '/my/carbuy'
  })
}

// 加入购物车
export const addBuyCar = data => {
  return request({
    method: 'POST',
    url: '/my/addCart',
    data
  })
}

// 删除购物车
export const deletCart = data => {
  return request({
    method: 'DELETE',
    url: '/my/deleteCart',
    data
  })
}
