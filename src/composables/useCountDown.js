// 封装倒计时逻辑函数
import { ref, computed, onUnmounted } from 'vue'
export const useCountDown = () => {
  // 响应式数据
  let timer = null
  const formatTime = ref(0)
  // 开启倒计时函数
  const start = (currentTime) => {
    // 开启倒计时逻辑
    // 核心逻辑: 每隔一秒-1
    formatTime.value = currentTime
    timer = setInterval(() => {
      formatTime.value--
    }, 1000)
  }
  const minute = computed(() => {
    const result = Math.floor(formatTime.value / 60)
    if (result < 10) {
      return '0' + result
    }
    else {
      return result
    }
  })
  const second = computed(() => {
    const result = formatTime.value % 60
    if (result < 10) {
      return '0' + result
    }
    else {
      return result
    }
  })
  // 组件销毁时清除定时器
  onUnmounted(() => {
    timer && clearInterval(timer)//timer为真才执行clearInterval(timer)
  })
  return {
    minute,//存储倒计时的剩余时间值
    second,
    start//倒计时函数
  }
}