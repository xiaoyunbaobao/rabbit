import { useIntersectionObserver } from '@vueuse/core'
// 定义懒加载插件
export const LazyPlugin = {
  install(app) {
    // 懒加载指令逻辑
    app.directive('img-lazy', {
      // 指令绑定的元素el
      // binding:binding.value 指令=后面绑定的表达式的值 图片url绑定在binding.value上
      mounted(el, binding) {
        console.log(el, binding.value);
        // useIntersectionObserver是vueUse提供的一个函数 用于检测元素是否进入视口区域
        const { stop } = useIntersectionObserver(
          el,
          // isIntersecting相当于boolean值 进入视口区域为true 没有进入为false
          ([{ isIntersecting }]) => {
            // console.log(isIntersecting);
            if (isIntersecting) {
              // 进入视口区域
              el.src = binding.value
              stop()// 停止监听 只加载一次图片
            }
          },
        )
      }
    })
  }
}