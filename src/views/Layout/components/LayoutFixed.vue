<script setup>
//VueUse插件 提供了useScroll函数 监听滚动事件import {getCategoryAPI} from '@/apis/Layout'
// import {getCategoryAPI} from '@/apis/Layout'
// import { onMounted,ref } from 'vue';
import { useScroll } from '@vueuse/core'
import { useCategoryStore } from '@/stores/category'

// ref 让普通的 JavaScript 变量变成响应式，当值改变时，使用这个值的界面也会自动更新。
// const categoryList = ref([])
// const getCategory = async() => {
//   const res = await getCategoryAPI()
//   console.log(res);
//   categoryList.value = res.result
// }
// 当组件完全加载到页面上后，就立即执行 getCategory() 函数
// 在 LayoutHeader.vue 文件中，onMounted 确保了在页面加载完成后：

// 自动调用 getCategory() 函数
// 获取分类数据并存入 categoryList
// 使导航栏能够显示分类菜单项
// 这样用户打开页面时就能看到完整的头部导航，而不是空白的导航栏。
// onMounted(() => {
//   getCategory()
// })
const {y} = useScroll(window)
// 使用pinia中的数据
const categoryStore = useCategoryStore()
</script>

<template>
  <div class="app-header-sticky" :class="{show: y > 78}">
    <!-- {{y}}//用于测试向下滚动y的值 -->
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 导航区域 -->
      <ul class="app-header-nav ">
        <li class="home">
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
          <RouterLink :to="`/category/${item.id}`">{{item.name}}</RouterLink>
        </li>
      </ul>

      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 状态二：移除平移 + 完全不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url("@/assets/images/logo.png") no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid $xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: $xtxColor;
      }
    }
  }
}

.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;

      &:hover {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }

    .active {
      color: $xtxColor;
      border-bottom: 1px solid $xtxColor;
    }
  }
}
</style>