// 把components中所有组件进行全局化注册
import ImageView from './imageView/index.vue'
import Sku from './XtxSku/index.vue'
import LoginModal from './LoginModal/index.vue'
export const componentPlugin = {
  install(app) {
    // app.component('组件名',组件配置对象)
    app.component('XtxImgview', ImageView)
    app.component('XtxSku', Sku)
    app.component('LoginModal', LoginModal)
  }
}