<script setup lang="ts">
import { computed } from 'vue';
import { Footprints, Battery, WifiOff, AlertCircle, MapPin, Clock, Info } from 'lucide-vue-next';
import { useRouter, useRoute } from 'vue-router';
import { showToast, showImagePreview } from 'vant';
import { useAlertStore } from '@/stores/useAlertStore';

const router = useRouter();
const route = useRoute();
const alertStore = useAlertStore();

// 获取当前报警详情
const alert = computed(() => {
  const id = route.params.id as string;
  return alertStore.getAlertById(id) || alertStore.alerts[0];
});

// 获取深色图标背景类
const iconBgClass = computed(() => {
  const lightClass = alert.value.iconClass;
  const colorMap: Record<string, string> = {
    'bg-orange-100': 'bg-orange-500',
    'bg-yellow-100': 'bg-yellow-500',
    'bg-blue-100': 'bg-blue-500',
    'bg-gray-100': 'bg-gray-500'
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

// 忽略消息
const handleIgnore = () => {
  if (alert.value) {
    alertStore.ignoreAlert(alert.value.id);
    showToast('已忽略');
  }
  router.back();
};

// 标记已处理
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
  <div class="h-full overflow-y-auto bg-gray-50 flex flex-col">
    <!-- 顶部导航栏 -->
    <van-nav-bar 
      title="报警详情" 
      left-text="返回" 
      left-arrow 
      @click-left="router.back()"
      class="bg-white"
    />

    <!-- 内容区域 -->
    <div class="flex-1 px-4 py-4 pb-24">
      <!-- 顶部卡片 -->
      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <div class="flex items-start gap-4">
          <!-- 图标 -->
          <div :class="['w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0', iconBgClass]">
            <component :is="getIcon(alert.iconType)" :size="28" class="text-white" />
          </div>
          
          <!-- 标题和状态 -->
          <div class="flex-1">
            <h2 class="text-lg font-bold text-gray-900">{{ alert.type }}</h2>
            <span 
              :class="[
                'inline-block mt-1.5 px-3 py-0.5 rounded-full text-xs font-medium',
                alert.status === 'pending' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'
              ]"
            >
              {{ alert.status === 'pending' ? '未处理' : '已处理' }}
            </span>
          </div>
        </div>
      </div>

      <!-- 信息列表 -->
      <div class="bg-white rounded-2xl p-4 mt-3 shadow-sm">
        <!-- 设备名称 -->
        <div class="flex items-center gap-3 py-2.5">
          <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <MapPin :size="16" class="text-blue-500" />
          </div>
          <div class="flex-1">
            <p class="text-xs text-gray-500">设备名称</p>
            <p class="text-sm font-medium text-gray-900">{{ alert.device }}</p>
          </div>
        </div>
        
        <!-- 发生时间 -->
        <div class="flex items-center gap-3 py-2.5">
          <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
            <Clock :size="16" class="text-green-500" />
          </div>
          <div class="flex-1">
            <p class="text-xs text-gray-500">发生时间</p>
            <p class="text-sm font-medium text-gray-900">{{ alert.date }} {{ alert.time }}</p>
          </div>
        </div>
        
        <!-- 报警描述 -->
        <div class="flex items-start gap-3 pt-2.5 mt-2.5 border-t border-gray-100">
          <div class="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info :size="16" class="text-purple-500" />
          </div>
          <div class="flex-1">
            <p class="text-xs text-gray-500 mb-1">报警描述</p>
            <p class="text-sm text-gray-900">{{ alert.description }}</p>
          </div>
        </div>
      </div>

      <!-- 现场截图 -->
      <div v-if="alert.thumb" class="bg-white rounded-2xl p-4 mt-3 shadow-sm">
        <p class="text-sm text-gray-500 mb-3">现场截图</p>
        <img 
          :src="alert.thumb" 
          class="w-full rounded-xl cursor-pointer" 
          style="max-height: 200px; object-fit: cover;"
          @click="openImagePreview"
        />
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 shadow-lg">
      <div v-if="alert.status === 'pending'" class="flex gap-3">
        <button 
          @click="handleIgnore"
          class="flex-1 py-3.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-medium active:bg-gray-50 transition-colors"
        >
          忽略
        </button>
        <button 
          @click="handleMarkHandled"
          class="flex-1 py-3.5 px-4 rounded-xl bg-blue-500 text-white font-medium active:bg-blue-600 transition-colors shadow-md shadow-blue-200"
        >
          标记已处理
        </button>
      </div>
      <div v-else class="flex gap-3">
        <button 
          @click="router.back()"
          class="flex-1 py-3.5 px-4 rounded-xl bg-gray-100 text-gray-600 font-medium active:bg-gray-200 transition-colors"
        >
          返回
        </button>
      </div>
    </div>
  </div>
</template>