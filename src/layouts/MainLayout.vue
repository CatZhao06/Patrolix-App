<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const activeTab = ref(route.name?.toString() || 'dashboard');

// 监听路由变化，更新底部导航栏状态
watch(() => route.name, (newName) => {
  if (newName) {
    activeTab.value = newName.toString();
  }
});

const handleTabChange = (name: string) => {
  router.push({ name });
};
</script>

<template>
  <div class="fixed inset-0 bg-gray-50 flex flex-col">
    <div class="flex-1 overflow-hidden">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </RouterView>
    </div>
    
    <van-tabbar v-model="activeTab" @change="handleTabChange" fixed placeholder border>
      <van-tabbar-item name="dashboard" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="messages" icon="comment-o" badge="3">消息</van-tabbar-item>
      <van-tabbar-item name="profile" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
