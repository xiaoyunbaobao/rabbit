import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { insertCartAPI, getNewCartListAPI, delCartAPI } from "@/apis/Cart";

// 获取最新购物车列表action

const cartList = ref([])
export const useCartStore = defineStore('cart', () => {
  //   localStorage.getItem('cartList') - 尝试获取名为 'cartList' 的缓存数据
  // || '[]' - 如果没有数据（第一次访问），使用空数组作为默认值
  // JSON.parse() - 将字符串转换为 JavaScript 数组
  // ref() - 创建响应式变量
  const cartList = ref(JSON.parse(localStorage.getItem('cartList') || '[]'))
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)

  // 添加购物车逻辑
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      // TODO: 这里添加已登录时的购物车逻辑
      await insertCartAPI({ skuId, count })
      const res = await getNewCartListAPI()
      cartList.value = res.result
    } else {
      // 未登录，返回 false 让调用方处理
      // 添加购物车逻辑
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
      //JSON.stringify(cartList.value) - 将数组转换为 JSON 字符串
      // localStorage.setItem('cartList', ...) - 保存到浏览器本地存储
      // 每次添加或修改商品数量后都要保存
      localStorage.setItem('cartList', JSON.stringify(cartList.value))
    }
  }


  // 删除购物车
  const delCart = async (skuId) => {
    if (isLogin.value) {
      // 调用接口实现接口购物车删除
      await delCartAPI([skuId])
      const res = await getNewCartListAPI()
      cartList.value = res.result
    } else {
      // 思路:找到删除项的下标值-splice
      // 思路:使用数组过滤-fliter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
      localStorage.setItem('cartList', JSON.stringify(cartList.value))
    }
  }


  /**
* 更新购物车商品数量
* @param {Object} goods - 包含 skuId 和新数量的对象
*/
  const updateCount = (goods) => {
    // 1. 在购物车列表中查找对应的商品
    const item = cartList.value.find((item) => goods.skuId === item.skuId)

    // 2. 如果找到了，更新数量
    if (item) {
      item.count = goods.count

      // 3. 保存到 localStorage，实现持久化
      localStorage.setItem('cartList', JSON.stringify(cartList.value))
    }
  }
  // 全选功能
  const allCheck = (selected) => {
    // 把cartList中的每一项selected都设置成当前全选框状态
    cartList.value.forEach(item => item.selected = selected);
    localStorage.setItem('cartList', JSON.stringify(cartList.value))
  }

  // 计算属性
  // 1.总数量 所有项count之和
  // reduce接收两个参数 a---每次累加完的值 c---每一项
  //a (accumulator): 累加器,存储上一次回调的返回值
  //c (currentValue): 当前正在处理的元素
  // 0: 初始值,第一次调用时的 a 值
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // 2.总价格 所有项目count*price之和
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  // 3.已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))

  // 4.已选择商品总价格
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))

  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice,
    delCartAPI,
    addCart,
    delCart,
    updateCount,
    allCheck
  }
})

