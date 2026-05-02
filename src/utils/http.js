// axios基础封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const httpInstance = axios.create({
  baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})


// 拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 1.从pinia里边获取token数据
  // 因为token存储在userStore 现在去import
  const userStore = useUserStore()
  // 2.按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  // 因为stores/user.js写了用户退出时删除userInfo逻辑 这里需要import和调用这个组件
  const userStore = useUserStore()
  // 统一错误提示
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  // 401Token失败处理
  // Token 的有效性可以保持一定时间，如果用户一段时间不做任何操作，Token 就会失效，使用失效的 Token 再去请求一些接口，接口就会报 401 状态码错误，需要我们做额外处理
  // 1.清除本地用户数据
  if (e.response.status === 401) {
    // 在stores/user.js中有定义过clearUserInfo函数 直接调用
    userStore.clearUserInfo()
    // 2.跳转到登录页
    router.push('/login')
  }
  return Promise.reject(e)
})
export default httpInstance