<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  ChevronLeft, Calendar, LayoutGrid, 
  Download, Trash2, CheckCircle2 
} from 'lucide-vue-next';

const router = useRouter();
const isSelectionMode = ref(false);

const historyData = [
  {
    date: '2024-05-15',
    items: [
      { id: '1', time: '08:30', url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=300' },
      { id: '2', time: '08:15', url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=300' },
      { id: '3', time: '07:45', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300' },
      { id: '4', time: '07:30', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300' },
      { id: '5', time: '06:45', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300' },
      { id: '6', time: '06:30', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300' },
    ]
  },
  {
    date: '2024-05-14',
    items: [
      { id: '7', time: '22:30', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300' },
      { id: '8', time: '21:15', url: 'https://images.unsplash.com/photo-1560448204-61dc36dc98ce?w=300' },
      { id: '9', time: '20:30', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300' },
    ]
  }
];
</script>

<template>
  <div class="min-h-screen bg-white">
    <van-nav-bar fixed placeholder title="历史截图" left-arrow @click-left="router.back()">
      <template #right>
        <button @click="isSelectionMode = !isSelectionMode" class="text-blue-500 text-sm">
          {{ isSelectionMode ? '取消' : '选择' }}
        </button>
      </template>
    </van-nav-bar>

    <div class="p-4 space-y-8">
      <div v-for="group in historyData" :key="group.date">
        <div class="flex items-center justify-between mb-3 px-1">
          <h3 class="text-sm font-bold text-gray-900">{{ group.date }}</h3>
        </div>
        
        <div class="grid grid-cols-3 gap-2">
          <div v-for="item in group.items" :key="item.id" class="relative group">
            <div class="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-gray-50">
              <img :src="item.url" class="w-full h-full object-cover" />
            </div>
            <div class="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/50 backdrop-blur-sm rounded text-[8px] text-white font-medium">
              {{ item.time }}
            </div>
            
            <div v-if="isSelectionMode" class="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
              <div class="w-5 h-5 rounded-full border-2 border-white bg-transparent flex items-center justify-center">
                <div class="w-2.5 h-2.5 rounded-full bg-blue-500 hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center py-12">
        <p class="text-xs text-gray-300">没有更多了</p>
      </div>
    </div>

    <!-- Bottom Actions for selection mode -->
    <div v-if="isSelectionMode" class="fixed bottom-0 inset-x-0 bg-white border-t p-4 flex justify-around items-center animate-in slide-in-from-bottom">
      <button class="flex flex-col items-center gap-1 text-gray-600">
        <Download :size="20" />
        <span class="text-[10px]">保存</span>
      </button>
      <button class="flex flex-col items-center gap-1 text-red-500">
        <Trash2 :size="20" />
        <span class="text-[10px]">删除</span>
      </button>
    </div>
  </div>
</template>
