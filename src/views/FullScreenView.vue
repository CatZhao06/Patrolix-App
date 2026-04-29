<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  Volume2, Mic, Camera, Video, 
  Maximize, Minimize, ChevronLeft, 
  ShieldAlert, Settings, Share2
} from 'lucide-vue-next';

const router = useRouter();
const isLive = ref(true);
const bitrate = ref('123KB/S');
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
      <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format" class="w-full h-full object-contain" />
      
      <!-- Center Indicator -->
      <div class="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div class="w-64 h-64 border border-white/20 rounded-lg"></div>
      </div>
    </div>

    <!-- Controls Overlay -->
    <div class="absolute bottom-12 inset-x-0 px-8 py-4 z-10 bg-gradient-to-t from-black/60 to-transparent">
      <div class="flex items-center justify-between max-w-sm mx-auto">
        <button class="p-4 rounded-full bg-white/10 backdrop-blur-md text-white active:bg-white/20">
          <Volume2 :size="20" />
        </button>
        <button class="p-6 rounded-full bg-white/10 backdrop-blur-md text-white active:bg-white/20">
          <Mic :size="28" />
        </button>
        <button class="p-4 rounded-full bg-white/10 backdrop-blur-md text-white active:bg-white/20">
          <Camera :size="20" />
        </button>
        <button class="p-4 rounded-full bg-white/10 backdrop-blur-md text-white active:bg-white/20">
          <Video :size="20" />
        </button>
        <button @click="router.back()" class="p-4 rounded-full bg-white/10 backdrop-blur-md text-white active:bg-white/20">
          <Minimize :size="20" />
        </button>
      </div>
    </div>
  </div>
</template>
