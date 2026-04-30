<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  Menu, Settings, Maximize, Camera, Lightbulb, 
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown, 
  CircleStop, Battery, Wifi, ShieldCheck, History,
  FileBarChart, HelpCircle, Bell
} from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();
const isOnline = ref(true);
const streamUrl = ref('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800');
const batteryLevel = ref(80);
const networkStrength = ref('强');
const guardianMode = ref('自动模式');
const isLightOn = ref(false);

const navigateTo = (path: string) => {
  router.push(path);
};

import { useAppStore } from '@/stores/useAppStore'
const appstore = useAppStore();

</script>

<template>
  <div class="p-4 h-full overflow-y-auto bg-gray-50">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-lg font-bold text-gray-900">客厅巡护设备</h1>
        <div class="flex items-center gap-2 mt-1">
          <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          <span class="text-sm text-gray-500">在线</span>
        </div>
      </div>
      <button @click="navigateTo('/settings')" class="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
        <Settings :size="22" class="text-gray-600" />
      </button>
    </div>

    <!-- Live View Card -->
    <div class="relative rounded-2xl overflow-hidden shadow-lg bg-black mb-4" style="height: 200px;">
      <video src="/videos/video1.mp4" :muted="appstore.isMute" class="w-full h-full object-cover opacity-90" autoplay loop playsinline></video>
      
      <!-- Overlays -->
      <div class="absolute top-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg">
        <div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
        <span class="text-xs text-white font-semibold">实时画面</span>
      </div>

      <div class="absolute top-3 right-3 flex gap-2">
        <button @click="navigateTo('/full-screen')" class="p-2 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-black/60 transition-colors" style="color: #ffffff;">
          <Maximize :size="18" />
        </button>
        <button class="p-2 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-black/60 transition-colors" style="color: #ffffff;">
          <Camera :size="18" />
        </button>
      </div>
    </div>

    <!-- Status Cards -->
    <div class="grid grid-cols-3 gap-3 mb-4">
      <div class="flex flex-col items-center p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
        <Battery :size="24" :class="batteryLevel > 20 ? 'text-green-500' : 'text-red-500'" />
        <div class="text-center mt-2">
          <p class="text-sm font-semibold text-gray-800">电量</p>
          <p class="text-xs text-gray-500">{{ batteryLevel }}%</p>
        </div>
      </div>
      <div class="flex flex-col items-center p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
        <Wifi :size="24" class="text-blue-500" />
        <div class="text-center mt-2">
          <p class="text-sm font-semibold text-gray-800">网络</p>
          <p class="text-xs text-gray-500">{{ networkStrength }}</p>
        </div>
      </div>
      <div class="flex flex-col items-center p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
        <ShieldCheck :size="24" class="text-green-500" />
        <div class="text-center mt-2">
          <p class="text-sm font-semibold text-gray-800">巡护</p>
          <p class="text-xs text-gray-500">{{ guardianMode }}</p>
        </div>
      </div>
    </div>

    <!-- Directional Control -->
    <div class="bg-white rounded-2xl p-5 shadow-sm mb-4">
      <h2 class="text-sm font-semibold text-gray-500 mb-4 px-1">设备控制</h2>
      <div class="flex flex-col items-center gap-3 relative">
        <!-- Up -->
        <button class="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 active:bg-blue-100 transition-all hover:bg-blue-100">
          <ChevronUp :size="28" />
        </button>
        
        <div class="flex items-center gap-8">
          <!-- Left -->
          <button class="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 active:bg-blue-100 transition-all hover:bg-blue-100">
            <ChevronLeft :size="28" />
          </button>
          
          <!-- Stop -->
          <button class="w-18 h-18 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200 active:scale-95 transition-transform hover:shadow-xl">
            <CircleStop :size="36" />
          </button>
          
          <!-- Right -->
          <button class="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 active:bg-blue-100 transition-all hover:bg-blue-100">
            <ChevronRight :size="28" />
          </button>
        </div>
        
        <!-- Down -->
        <button class="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 active:bg-blue-100 transition-all hover:bg-blue-100">
          <ChevronDown :size="28" />
        </button>

        <!-- Toggle Aux -->
        <div class="absolute left-2 flex flex-col gap-4">
          <button @click="isLightOn = !isLightOn" :class="['p-3 rounded-full transition-all shadow-sm', isLightOn ? 'bg-yellow-100 text-yellow-600 shadow-md' : 'bg-gray-100 text-gray-400']">
            <Lightbulb :size="22" />
          </button>
        </div>
      </div>
    </div>

    <!-- More Functions -->
    <div class="bg-white rounded-2xl p-4 shadow-sm">
      <h2 class="text-sm font-semibold text-gray-500 mb-4 px-1">更多功能</h2>
      <div class="grid grid-cols-4 gap-4">
        <button @click="navigateTo('/messages')" class="flex flex-col items-center gap-2">
          <div class="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
            <Bell :size="26" />
          </div>
          <span class="text-sm text-gray-700 font-medium">报警记录</span>
          <span class="text-xs text-orange-500">3条未处理</span>
        </button>
        <button @click="navigateTo('/screenshots')" class="flex flex-col items-center gap-2">
          <div class="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
            <History :size="26" />
          </div>
          <span class="text-sm text-gray-700 font-medium">历史截图</span>
          <span class="text-xs text-blue-500">128张</span>
        </button>
        <button @click="navigateTo('/stats')" class="flex flex-col items-center gap-2">
          <div class="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
            <FileBarChart :size="26" />
          </div>
          <span class="text-sm text-gray-700 font-medium">使用统计</span>
          <span class="text-xs text-green-500">今日运行 2.5h</span>
        </button>
        <button class="flex flex-col items-center gap-2">
          <div class="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
            <HelpCircle :size="26" />
          </div>
          <span class="text-sm text-gray-700 font-medium">帮助说明</span>
          <span class="text-xs text-purple-500">常见问题</span>
        </button>
      </div>
    </div>
  </div>
</template>