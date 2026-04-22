// 封装分类数据业务相关代码
import { getCategoryAPI } from '@/apis/Category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router';



export function useCategory() {
  // 获取数据
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }
  onMounted(() =>
    getCategory()
  )
  // 路由参数变化时 可以把分类数据接口重新发送 而不用重新动Banner 避免资源浪费 这属于性能优化
  onBeforeRouteUpdate((to) => {
    // console.log('路由变化了');
    console.log(to);

    getCategory(to.params.id)
  })
  return {
    categoryData
  }
}