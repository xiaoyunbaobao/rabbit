<script setup>
// ✨【改动1】导入用户 store，用于获取和管理用户状态
import { useUserStore } from '@/stores/user'
// ✨【改动2】导入 useRouter，用于实现页面跳转
import { useRouter } from 'vue-router'

// ✨【改动3】初始化 store 和 router 实例
const userStore = useUserStore()
const router = useRouter()

// ✨【改动4】退出登录处理函数
const handleLogout = () => {
  // 清除用户信息和缓存
  userStore.clearUserInfo()
  // 跳转到登录页
  router.push('/login')
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 多模块渲染 区分登录状态还是未登录状态 -->
        <!-- ✨【改动5】将硬编码的 false 改为根据用户是否登录来判断 -->
         <!-- 这里通过判断token来判断登陆状态 这里if写的是有token 找<template></template>就可以 -->



         <!-- 💡通用思路:有几个需要适配的模块就准备几个<template></template> 通过条件判断即可 -->
        <template v-if="userStore.userInfo?.token">
          <!-- ✨【改动6】显示实际登录的用户名，而不是硬编码的"郭奕玮" -->
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{ userStore.userInfo.account }}</a></li>
          <li>
            <!-- ✨【改动7】添加 @confirm 事件，点击确认时调用退出登录函数 -->
            <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleLogout">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;">会员中心</a></li>
        </template>
        <!-- 这里else则是未登录状态 同样通过看<template></template> -->
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>