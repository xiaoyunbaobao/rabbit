<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
const router = useRouter()
const userStore = useUserStore()
const props = defineProps({
  visible: {
    type: Boolean,
    // 默认值
    default: false
  },
  title: {
    type: String,
    default: '温馨提示'
  },
  message: {
    type: String,
    default: '购物车功能需要登录才能使用 请先登录'
  },
  confirmText: {
    type: String,
    default: '去登录'
  },
  cancelText: {
    type: String,
    default: '稍后再说'
  },
  redirectPath: {
    type: String,
    default: '/'
  }
})
const emit = defineEmits(['update:visible', 'confirm'])
const handleConfirm = () => {
  emit('confirm')
  router.push({
    path: '/login',
    query: {redirectPath: props.redirectPath}
  })
  emit('update:visable', false)
}
const handleCancel = () => {
  emit('cancel')
  emit('update:visable', false)
}
</script>
<template>
  <el-dialog
    :model-value="visible"
    :title="title"
    width="400px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="login-tip-content">
      <!-- 用文字或简单符号代替图标 -->
      <div class="tip-icon"><el-icon><InfoFilled /></el-icon></div>
      <p class="tip-message">{{ message }}</p>
    </div>
    
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">{{ cancelText }}</el-button>
        <el-button type="primary" @click="handleConfirm">
          {{ confirmText }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.login-tip-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  
  .tip-icon {
    font-size: 50px;
    margin-bottom: 20px;
  }
  
  .tip-message {
    text-align: center;
    font-size: 16px;
    color: #606266;
    line-height: 1.6;
    margin: 0;
  }
}

.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 12px;
}
</style>