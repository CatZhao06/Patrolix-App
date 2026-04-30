<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/useAppStore';
import { 
  Volume2, Mic, Camera, Video, 
  Maximize, Minimize, ChevronLeft, 
  ShieldAlert, Settings, Share2,
  VolumeX
} from 'lucide-vue-next';

const videoRef = ref<HTMLVideoElement|null>(null);
const router = useRouter();
const isLive = ref(true);
const bitrate = ref('123KB/S');

// 使用共享的静音状态
const appStore = useAppStore();

// 监听 store 中的静音状态变化，同步到视频元素
watch(() => appStore.isMute, (newVal) => {
  if (videoRef.value) {
    videoRef.value.muted = newVal;
  }
});

// 组件挂载后，主动同步一次静音状态（确保视频元素已存在）
onMounted(() => {
  if (videoRef.value) {
    videoRef.value.muted = appStore.isMute;
  }
});

// 点击静音按钮时更新共享状态
const changeMute = () => {
  appStore.changeMute();
}
</script>

<template>
  <div class="h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden">
    <!-- Header Overlay -->
    <div class="absolute top-0 inset-x-0 p-6 flex items-center justify-between z-10 bg-gradient-to-b from-black/60 to-transparent">
      <button @click="router.back()" class="p-2 rounded-full text-white active:scale-95">
        <ChevronLeft :size="24" />
      </button>
      <div class="text-center">
        <h2 class="text-white font-bold text-sm">客厅巡护设备</h2>
        <div class="flex items-center justify-center gap-1.5 mt-1">
          <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          <span class="text-[10px] text-white/80">{{ bitrate }}</span>
        </div>
      </div>
      <button class="p-2 rounded-full text-white active:scale-95">
        <Settings :size="24" />
      </button>
    </div>

    <!-- Main View -->
    <div class="w-full h-full relative">
      <video ref="videoRef" src="/videos/video1.mp4" class="w-full h-full object-contain" autoplay loop playsinline></video>
      
      <!-- Center Indicator -->
      <div class="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div class="w-64 h-64 border border-white/20 rounded-lg"></div>
      </div>
    </div>

    <!-- 底部控制栏覆盖层 -->
    <!-- 绝对定位在底部，带有从黑到透明的渐变背景 -->
    <div class="absolute bottom-12 inset-x-0 px-8 py-4 z-10 bg-gradient-to-t from-black/60 to-transparent">
      <!-- 控制按钮容器 - 水平排列，两端对齐 -->
      <div class="flex items-center justify-between max-w-sm mx-auto">
        <!-- 静音/取消静音按钮 -->
        <!-- 点击切换视频声音状态 -->
        <button @click="changeMute" class="p-4 rounded-full bg-white/10 backdrop-blur-md text-white active:bg-white/20" style="color: #ffffff;">
          <Volume2 v-if="!appStore.isMute" :size="20" />
          <VolumeX v-else :size="20" />
        </button>
        <!-- 麦克风按钮 -->
        <!-- 控制麦克风开关 -->
        <button class="p-6 rounded-full bg-white/10 backdrop-blur-md text-white active:bg-white/20" style="color: #ffffff;">
          <Mic :size="28" />
        </button>
        <!-- 截图按钮 -->
        <!-- 截取当前画面 -->
        <button class="p-4 rounded-full bg-white/10 backdrop-blur-md text-white active:bg-white/20" style="color: #ffffff;">
          <Camera :size="20" />
        </button>
        <!-- 录像按钮 -->
        <!-- 开始/停止录像 -->
        <button class="p-4 rounded-full bg-white/10 backdrop-blur-md text-white active:bg-white/20" style="color: #ffffff;">
          <Video :size="20" />
        </button>
        <!-- 退出全屏按钮 -->
        <!-- 返回上一页（退出全屏模式） -->
        <button @click="router.back()" class="p-4 rounded-full bg-white/10 backdrop-blur-md text-white active:bg-white/20" style="color: #ffffff;">
          <Minimize :size="20" />
        </button>
      </div>
    </div>
  </div>
</template>
