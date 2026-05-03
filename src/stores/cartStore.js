import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { insertCartAPI, getNewCartListAPI } from "@/apis/Cart";

const isLogin = computed(() => userStore.userInfo?.token)
const cartList = ref([])
export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const userStore = useUserStore()
  const addCart = (goods) => {
    // 已添加过:count + 1
    // 没添加过: 直接push
    // 在cartList中看能否找到skuId 找到就是添加过
    const item = cartList.value.find((item) =>
      goods.skuId === item.skuId
    )
    if (item) {
      item.count++
    } else {
      cartList.value.push(goods)
    }
  }
  // 删除购物车
  const delCart = (skuId) => {
    // 思路:找到删除项的下标值-splice
    // 思路:使用数组过滤-fliter
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(idx, 1)
  }
  // 计算属性
  // 1.总数量 所有项count之和
  // reduce接收两个参数 a---每次累加完的值 c---每一项
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // 2.总价格 所有项目count*price之和
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
  return {
    cartList,
    allCount,
    allPrice,
    addCart,
    delCart
  }
})

const addCart = async (goods) => {
  const { skuId, count } = goods
  if (isLogin.value) {
    // TODO: 这里添加已登录时的购物车逻辑
    await insertCartAPI({ skuId, count })
    const res = await getNewCartListAPI()
    cartList.value = res.result
  } else {
    // 未登录，返回 false 让调用方处理

  }
}

export { addCart }
