<script setup lang="ts">
import { ref } from 'vue';
import { 
  Info, MonitorPlay, Joystick, BellRing, 
  Database, Share2, MessageSquare, Shield,
  ChevronRight
} from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();

const settingsGroups = [
  {
    items: [
      { id: 'info', name: '设备信息', icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
      { id: 'screen', name: '画面设置', icon: MonitorPlay, color: 'text-indigo-500', bg: 'bg-indigo-50' },
      { id: 'control', name: '控制设置', icon: Joystick, color: 'text-blue-600', bg: 'bg-blue-50' },
    ]
  },
  {
    items: [
      { id: 'notif', name: '消息通知', icon: BellRing, color: 'text-green-500', bg: 'bg-green-50', extra: '已开启' },
      { id: 'storage', name: '存储管理', icon: Database, color: 'text-orange-500', bg: 'bg-orange-50' },
      { id: 'share', name: '设备分享', icon: Share2, color: 'text-blue-400', bg: 'bg-blue-50' },
    ]
  },
  {
    items: [
      { id: 'help', name: '帮助与反馈', icon: MessageSquare, color: 'text-gray-500', bg: 'bg-gray-100' },
      { id: 'about', name: '关于我们', icon: Shield, color: 'text-gray-500', bg: 'bg-gray-100' },
    ]
  }
];
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <van-nav-bar title="设置" left-arrow @click-left="router.back()" fixed placeholder />

    <div class="p-4 space-y-4 pb-20">
      <div v-for="(group, idx) in settingsGroups" :key="idx" class="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div 
          v-for="item in group.items" 
          :key="item.id"
          class="flex items-center justify-between p-4 active:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-50"
        >
          <div class="flex items-center gap-3">
            <div :class="['w-8 h-8 rounded-lg flex items-center justify-center', item.bg, item.color]">
              <component :is="item.icon" :size="18" />
            </div>
            <span class="text-sm font-medium text-gray-700">{{ item.name }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span v-if="item.extra" class="text-xs text-gray-400 mr-1">{{ item.extra }}</span>
            <ChevronRight :size="16" class="text-gray-300" />
          </div>
        </div>
      </div>

      <button class="w-full py-4 text-red-500 font-bold bg-white rounded-2xl shadow-sm active:scale-[0.99] transition-transform">
        删除设备
      </button>
    </div>
  </div>
</template>
