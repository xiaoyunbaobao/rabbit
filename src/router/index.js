import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 路由设计依据就是内容切换方式 一级路由(整体切换) 二级路由(在一级内部切换)
      // 这意味着当你访问根路径 / 时 会首先加载 Layout 组件（可能包含导航栏、侧边栏等布局元素）
      // 然后在布局内部显示 Home 组件；而当你访问 /login 时，整个页面都会被 Login 组件替换
      // 通常用于登录页面，不需要额外的布局结构。

      path: '/',
      // '/' 路径使用了嵌套路由(children)
      // 它会渲染 Layout 组件并在其内部根据子路由显示相应的组件（如Home或Category）
      component: Layout,
      children: [
        {
          // 这里解释为什么二级路由的路径是空字符串 ''
          // 是一个小tips(默认二级路由) 当访问一级路由时 二级路由也会得到渲染
          path: '',
          component: Home
        },
        {
          path: 'category',
          component: Category
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
