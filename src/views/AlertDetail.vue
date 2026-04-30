<script setup lang="ts">
import { computed } from 'vue';
import { Footprints, Battery, WifiOff, AlertCircle } from 'lucide-vue-next';
import { useRouter, useRoute } from 'vue-router';
import { showToast, showImagePreview } from 'vant';
import { useAlertStore } from '@/stores/useAlertStore';

const router = useRouter();
const route = useRoute();
const alertStore = useAlertStore();

// 获取当前报警详情（使用 Pinia Store）
const alert = computed(() => {
  const id = route.params.id as string;
  return alertStore.getAlertById(id) || alertStore.alerts[0];
});

// 获取深色图标背景类（用于详情页的大图标）
const iconBgClass = computed(() => {
  const lightClass = alert.value.iconClass;
  const colorMap: Record<string, string> = {
    'bg-orange-100': 'bg-orange-400',
    'bg-yellow-100': 'bg-yellow-400',
    'bg-blue-100': 'bg-blue-400',
    'bg-gray-100': 'bg-gray-400'
  };
  const bgClass = lightClass.split(' ')[0];
  return colorMap[bgClass] || bgClass;
});

// 获取图标组件
const getIcon = (type: string) => {
  switch (type) {
    case 'move': return Footprints;
    case 'battery': return Battery;
    case 'offline': return WifiOff;
    default: return AlertCircle;
  }
};

// 忽略消息（使用 Pinia Store）
const handleIgnore = () => {
  if (alert.value) {
    alertStore.ignoreAlert(alert.value.id);
    showToast('已忽略');
  }
  router.back();
};

// 标记已处理（使用 Pinia Store）
const handleMarkHandled = () => {
  if (alert.value) {
    alertStore.markAsHandled(alert.value.id);
    showToast('已标记为已处理');
  }
  router.back();
};

// 打开图片预览
const openImagePreview = () => {
  if (alert.value.thumb) {
    showImagePreview({
      images: [alert.value.thumb],
      closeable: true,
      loop: false
    });
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <van-nav-bar 
      title="报警详情" 
      left-text="返回" 
      left-arrow 
      @click-left="router.back()"
      class="bg-white"
    />

    <!-- 内容区域 -->
    <div class="px-4 py-4">
      <!-- 顶部卡片 -->
      <div class="bg-white rounded-2xl p-6 text-center shadow-sm">
        <!-- 图标 -->
        <div :class="['w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4', iconBgClass]">
          <component :is="getIcon(alert.iconType)" :size="32" class="text-white" />
        </div>
        
        <!-- 标题 -->
        <h2 class="text-lg font-bold text-gray-900 mb-2">{{ alert.type }}</h2>
        
        <!-- 状态标签 -->
        <span 
          :class="[
            'inline-block px-3 py-1 rounded-full text-sm',
            alert.status === 'pending' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'
          ]"
        >
          {{ alert.status === 'pending' ? '未处理' : '已处理' }}
        </span>
      </div>

      <!-- 信息列表 -->
      <div class="bg-white rounded-2xl p-4 mt-4 shadow-sm">
        <div class="space-y-4">
          <!-- 设备名称 -->
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">设备名称</span>
            <span class="text-sm font-medium text-gray-900">{{ alert.device }}</span>
          </div>
          
          <!-- 发生时间 -->
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">发生时间</span>
            <span class="text-sm font-medium text-gray-900">{{ alert.date }} {{ alert.time }}</span>
          </div>
          
          <!-- 报警类型 -->
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">报警类型</span>
            <span class="text-sm font-medium text-gray-900">{{ alert.type }}</span>
          </div>
          
          <!-- 报警描述 -->
          <div class="pt-2 border-t border-gray-100">
            <p class="text-sm text-gray-500 mb-2">报警描述</p>
            <p class="text-sm text-gray-900">{{ alert.description }}</p>
          </div>
        </div>
      </div>

      <!-- 现场截图 -->
      <div v-if="alert.thumb" class="bg-white rounded-2xl p-4 mt-4 shadow-sm">
        <p class="text-sm text-gray-500 mb-3">现场截图</p>
        <img 
          :src="alert.thumb" 
          class="w-full rounded-xl cursor-pointer" 
          @click="openImagePreview"
        />
      </div>

      <!-- 操作按钮 -->
      <div v-if="alert.status === 'pending'" class="flex gap-3 mt-6">
        <button 
          @click="handleIgnore"
          class="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-600 font-medium"
        >
          忽略
        </button>
        <button 
          @click="handleMarkHandled"
          class="flex-1 py-3 px-4 rounded-xl bg-blue-500 text-white font-medium"
        >
          标记已处理
        </button>
      </div>
    </div>
  </div>
</template>
