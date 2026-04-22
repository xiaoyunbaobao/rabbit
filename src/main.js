import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 测试引入初始化样式文件
import '@/styles/common.scss'
// 导入vueUse里的检测图片是否进入视图的函数
// import { useIntersectionObserver } from '@vueuse/core'
// 引入懒加载指令插件并注册
import { LazyPlugin } from "@/directives";
// // 测试接口函数
// import { getCategory } from '@/apis/testAPI'
// getCategory().then(res => {
//   console.log(res)
// })
const app = createApp(App)


app.use(createPinia())
app.use(router)
// 使用src/directives里手写的懒加载插件指令
app.use(LazyPlugin)
app.mount('#app')
// directive是一个对象 用于注册对当前组件实例可用的指令
// app.directive('img-lazy', {
//   // 指令绑定的元素el
//   // binding:binding.value 指令=后面绑定的表达式的值 图片url绑定在binding.value上
//   mounted(el, binding) {
//     console.log(el, binding.value);
//     // useIntersectionObserver是vueUse提供的一个函数 用于检测元素是否进入视口区域
//     useIntersectionObserver(
//       el,
//       // isIntersecting相当于boolean值 进入视口区域为true 没有进入为false
//       ([{ isIntersecting }]) => {
//         // console.log(isIntersecting);
//         if (isIntersecting) {
//           // 进入视口区域
//           el.src = binding.value
//         }
//       },
//     )
//   }
// })