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
const streamUrl = ref('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'); // Placeholder for robot POV
const batteryLevel = ref(80);
const networkStrength = ref('强');
const guardianMode = ref('自动模式');
const isLightOn = ref(false);

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="p-4 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-lg font-bold text-gray-900">客厅巡护设备</h1>
        <div class="flex items-center gap-1.5 mt-1">
          <div class="w-2 h-2 rounded-full bg-green-500"></div>
          <span class="text-xs text-gray-500">在线</span>
        </div>
      </div>
      <button @click="navigateTo('/settings')" class="p-2 bg-white rounded-full shadow-sm">
        <Settings :size="20" class="text-gray-600" />
      </button>
    </div>

    <!-- Live View Card -->
    <div class="relative rounded-2xl overflow-hidden shadow-lg bg-black aspect-video mb-6 group">
      <img :src="streamUrl" class="w-full h-full object-cover opacity-90" />
      
      <!-- Overlays -->
      <div class="absolute top-3 left-3 flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
        <div class="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
        <span class="text-[10px] text-white font-medium">实时画面</span>
      </div>

      <div class="absolute top-3 right-3 flex gap-2">
        <button @click="navigateTo('/full-screen')" class="p-1.5 bg-black/40 backdrop-blur-md rounded-lg text-white">
          <Maximize :size="16" />
        </button>
        <button class="p-1.5 bg-black/40 backdrop-blur-md rounded-lg text-white">
          <Camera :size="16" />
        </button>
      </div>
    </div>

    <!-- Directional Control -->
    <div class="bg-white rounded-3xl p-6 shadow-sm mb-6">
      <h2 class="text-sm font-semibold text-gray-400 mb-6 px-2">设备控制</h2>
      
      <div class="flex flex-col items-center gap-4 relative">
        <!-- Up -->
        <button class="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 active:bg-blue-100 transition-colors">
          <ChevronUp :size="24" />
        </button>
        
        <div class="flex items-center gap-8">
          <!-- Left -->
          <button class="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 active:bg-blue-100 transition-colors">
            <ChevronLeft :size="24" />
          </button>
          
          <!-- Stop -->
          <button class="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200 active:scale-95 transition-transform">
            <CircleStop :size="32" />
          </button>
          
          <!-- Right -->
          <button class="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 active:bg-blue-100 transition-colors">
            <ChevronRight :size="24" />
          </button>
        </div>
        
        <!-- Down -->
        <button class="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 active:bg-blue-100 transition-colors">
          <ChevronDown :size="24" />
        </button>

        <!-- Toggle Aux -->
        <div class="absolute left-0 bottom-0 flex flex-col gap-4">
          <button @click="isLightOn = !isLightOn" :class="['p-3 rounded-full transition-all shadow-sm', isLightOn ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400']">
            <Lightbulb :size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- Status Section -->
    <div class="bg-white rounded-3xl p-5 shadow-sm mb-6">
      <h2 class="text-sm font-semibold text-gray-400 mb-4 px-2">设备状态</h2>
      <div class="grid grid-cols-3 gap-3 text-[11px]">
        <div class="flex flex-col items-center p-3 rounded-2xl bg-gray-50 gap-2">
          <Battery :size="20" :class="batteryLevel > 20 ? 'text-green-500' : 'text-red-500'" />
          <div class="text-center">
            <p class="font-bold text-gray-800">电量良好</p>
            <p class="text-gray-400">{{ batteryLevel }}%</p>
          </div>
        </div>
        <div class="flex flex-col items-center p-3 rounded-2xl bg-gray-50 gap-2">
          <Wifi :size="20" class="text-blue-500" />
          <div class="text-center">
            <p class="font-bold text-gray-800">网络稳定</p>
            <p class="text-gray-400">{{ networkStrength }}</p>
          </div>
        </div>
        <div class="flex flex-col items-center p-3 rounded-2xl bg-gray-50 gap-2">
          <ShieldCheck :size="20" class="text-green-500" />
          <div class="text-center">
            <p class="font-bold text-gray-800">正常巡护</p>
            <p class="text-gray-400">{{ guardianMode }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- More Functions -->
    <div class="bg-white rounded-3xl p-5 shadow-sm">
      <h2 class="text-sm font-semibold text-gray-400 mb-4 px-2">更多功能</h2>
      <div class="grid grid-cols-4 gap-4">
        <button @click="navigateTo('/messages')" class="flex flex-col items-center gap-1">
          <div class="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
            <Bell :size="24" />
          </div>
          <span class="text-[10px] text-gray-600 font-medium">报警记录</span>
          <span class="text-[8px] text-orange-400">3条未处理</span>
        </button>
        <button @click="navigateTo('/history')" class="flex flex-col items-center gap-1">
          <div class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
            <History :size="24" />
          </div>
          <span class="text-[10px] text-gray-600 font-medium">历史截图</span>
          <span class="text-[8px] text-blue-400">128张</span>
        </button>
        <button @click="navigateTo('/stats')" class="flex flex-col items-center gap-1">
          <div class="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
            <FileBarChart :size="24" />
          </div>
          <span class="text-[10px] text-gray-600 font-medium">使用统计</span>
          <span class="text-[8px] text-green-400">今日运行 2.5h</span>
        </button>
        <button class="flex flex-col items-center gap-1">
          <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500">
            <HelpCircle :size="24" />
          </div>
          <span class="text-[10px] text-gray-600 font-medium">帮助说明</span>
          <span class="text-[8px] text-purple-400">常见问题解答</span>
        </button>
      </div>
    </div>
  </div>
</template>
