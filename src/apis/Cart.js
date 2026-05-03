// 封装购物车相关接口
import request from '@/utils/http'
export const insertCartAPI = () => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuid,
      count
    }
  })
}

// 获取购物车列表
export const getNewCartListAPI = () => {
  return request({
    url: '/member/cart',
    method: 'GET'
  })
}