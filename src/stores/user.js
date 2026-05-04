// 管理用户数据相关
import { loginAPI } from '@/apis/users'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/Cart'
export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  // 1.定义管理用户数据的state
  // 从 localStorage 中读取缓存的用户信息，如果没有则为空对象
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'))

  // 2.定义获取接口数据的action函数
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    // 登录成功后，将用户信息保存到 localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    // 合并购物车操作
    // 根据一个现有数组得到一个新的数组 用map方法
    mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateNewList()
  }

  // 3.退出登录时清除用户信息和缓存
  const clearUserInfo = () => {
    userInfo.value = {}
    localStorage.removeItem('userInfo')
    // 执行退出清除购物车
    cartStore.clearCart()
  }

  // 4.以对象的格式把state和action return
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
})
