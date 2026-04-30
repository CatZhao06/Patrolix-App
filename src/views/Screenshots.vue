<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { showToast, showConfirmDialog, showImagePreview } from 'vant';
import type { Screenshot } from '@/stores/useAlertStore';
import { useAlertStore } from '@/stores/useAlertStore';

const router = useRouter();
const alertStore = useAlertStore();
const isSelectionMode = ref(false);
const selectedIds = ref<string[]>([]);

// 按日期分组的截图数据
const groupedScreenshots = computed(() => {
  const groups: Record<string, Screenshot[]> = {};
  
  alertStore.screenshots.forEach(screenshot => {
    if (!groups[screenshot.date]) {
      groups[screenshot.date] = [];
    }
    groups[screenshot.date].push(screenshot);
  });
  
  // 按日期倒序排列
  const sortedDates = Object.keys(groups).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );
  
  return sortedDates.map(date => ({
    date,
    items: groups[date]
  }));
});

// 所有截图列表（按日期分组展开）
const allScreenshots = computed(() => {
  const result: Screenshot[] = [];
  groupedScreenshots.value.forEach(group => {
    group.items.forEach(item => {
      result.push(item);
    });
  });
  return result;
});

// 打开图片预览（使用 Vant 的 showImagePreview）
const openPreview = (index: number) => {
  if (isSelectionMode.value) return;
  
  const images = allScreenshots.value.map(s => s.url);
  
  showImagePreview({
    images,
    startPosition: index,
    closeable: true,
    loop: false
  });
};

// 获取图片索引（用于删除后更新预览）
const getImageIndex = (screenshot: Screenshot) => {
  return allScreenshots.value.findIndex(s => s.id === screenshot.id);
};

// 删除单张截图
const deleteScreenshot = (screenshot: Screenshot) => {
  showConfirmDialog({
    title: '确定删除吗？',
    message: '删除后将无法恢复'
  }).then(() => {
    alertStore.deleteScreenshot(screenshot.id);
    showToast('删除成功');
  }).catch(() => {
    // 取消删除
  });
};

// 下载单张截图（真实下载）
const downloadScreenshot = async (screenshot: Screenshot) => {
  try {
    // 使用图片具体时间命名：Patrolix-App-年月日-时分:秒.jpg
    const filename = `Patrolix-App-${screenshot.date}-${screenshot.time}.jpg`;
    
    // 使用 fetch 获取图片数据
    const response = await fetch(screenshot.url);
    const blob = await response.blob();
    
    // 创建 blob URL
    const blobUrl = URL.createObjectURL(blob);
    
    // 创建下载链接
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 释放 blob URL
    URL.revokeObjectURL(blobUrl);
    
    showToast('下载成功');
  } catch (error) {
    console.error('下载失败:', error);
    showToast('下载失败，请重试');
  }
};

// 切换选择状态
const toggleSelect = (id: string) => {
  const index = selectedIds.value.indexOf(id);
  if (index > -1) {
    selectedIds.value.splice(index, 1);
  } else {
    selectedIds.value.push(id);
  }
};

// 全选/取消全选
const toggleSelectAll = () => {
  if (selectedIds.value.length === alertStore.screenshotCount) {
    selectedIds.value = [];
  } else {
    selectedIds.value = alertStore.screenshots.map(s => s.id);
  }
};

// 进入选择模式
const enterSelectionMode = () => {
  isSelectionMode.value = true;
};

// 退出选择模式
const exitSelectionMode = () => {
  isSelectionMode.value = false;
  selectedIds.value = [];
};

// 删除选中的截图
const deleteSelected = () => {
  showConfirmDialog({
    title: '确定删除吗？',
    message: `将删除 ${selectedIds.value.length} 张截图，删除后无法恢复`
  }).then(() => {
    selectedIds.value.forEach(id => {
      alertStore.deleteScreenshot(id);
    });
    showToast('删除成功');
    exitSelectionMode();
  }).catch(() => {
    // 取消删除
  });
};

// 下载选中的截图（真实下载）
const downloadSelected = async () => {
  const total = selectedIds.value.length;
  let successCount = 0;
  let failCount = 0;
  const filenameCount: Record<string, number> = {};
  
  for (let i = 0; i < selectedIds.value.length; i++) {
    const id = selectedIds.value[i];
    const screenshot = alertStore.screenshots.find(s => s.id === id);
    
    if (screenshot) {
      try {
        // 使用图片具体时间命名：Patrolix-App-年月日-时分:秒.jpg
        const baseFilename = `Patrolix-App-${screenshot.date}-${screenshot.time}`;
        
        // 如果文件名重复，添加序号
        filenameCount[baseFilename] = (filenameCount[baseFilename] || 0) + 1;
        const suffix = filenameCount[baseFilename] > 1 ? `-${filenameCount[baseFilename]}` : '';
        const filename = `${baseFilename}${suffix}.jpg`;
        
        // 使用 fetch 获取图片数据
        const response = await fetch(screenshot.url);
        const blob = await response.blob();
        
        // 创建 blob URL
        const blobUrl = URL.createObjectURL(blob);
        
        // 创建下载链接
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 释放 blob URL
        URL.revokeObjectURL(blobUrl);
        
        successCount++;
      } catch (error) {
        console.error(`下载图片 ${i + 1} 失败:`, error);
        failCount++;
      }
    }
  }
  
  if (failCount === 0) {
    showToast(`全部 ${successCount} 张图片下载成功`);
  } else {
    showToast(`成功 ${successCount} 张，失败 ${failCount} 张`);
  }
  
  exitSelectionMode();
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- 顶部导航栏 -->
    <van-nav-bar fixed placeholder title="历史截图" left-arrow @click-left="router.back()">
      <template #right>
        <button 
          @click="isSelectionMode ? exitSelectionMode() : enterSelectionMode()" 
          class="text-blue-500 text-sm"
        >
          {{ isSelectionMode ? '取消' : '选择' }}
        </button>
      </template>
    </van-nav-bar>

    <!-- 选择状态提示 -->
    <div v-if="isSelectionMode" class="bg-gray-50 px-4 py-2 flex items-center justify-between">
      <span class="text-sm text-gray-600">已选择 {{ selectedIds.length }} 张</span>
      <button @click="toggleSelectAll" class="text-sm text-blue-500">
        {{ selectedIds.length === alertStore.screenshotCount ? '取消全选' : '全选' }}
      </button>
    </div>

    <!-- 截图列表 -->
    <div class="p-4 space-y-6">
      <div v-for="(group, groupIndex) in groupedScreenshots" :key="group.date">
        <!-- 日期标题 -->
        <div class="flex items-center justify-between mb-3 px-1">
          <h3 class="text-sm font-bold text-gray-900">{{ group.date }}</h3>
        </div>
        
        <!-- 图片网格 -->
        <div class="grid grid-cols-3 gap-2">
          <div 
            v-for="(item, itemIndex) in group.items" 
            :key="item.id" 
            class="relative group"
            @click="isSelectionMode ? toggleSelect(item.id) : openPreview(groupIndex * 100 + itemIndex)"
          >
            <!-- 图片 -->
            <div class="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-gray-50">
              <img :src="item.thumbnail" :alt="item.type" class="w-full h-full object-cover" />
            </div>
            
            <!-- 时间标签 -->
            <div class="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/50 backdrop-blur-sm rounded text-[8px] text-white font-medium">
              {{ item.time }}
            </div>
            
            <!-- 选择框 -->
            <div v-if="isSelectionMode" class="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
              <div 
                class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
                :class="selectedIds.includes(item.id) ? 'border-blue-500 bg-blue-500' : 'border-white bg-transparent'"
              >
                <svg v-if="selectedIds.includes(item.id)" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 空状态或底部提示 -->
      <div v-if="groupedScreenshots.length === 0" class="text-center py-16">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p class="text-gray-500">暂无截图记录</p>
      </div>
      
      <div v-else class="text-center py-12">
        <p class="text-xs text-gray-300">没有更多了</p>
      </div>
    </div>

    <!-- 底部操作栏（选择模式） -->
    <div v-if="isSelectionMode" class="fixed bottom-0 inset-x-0 bg-white border-t p-4 flex justify-around items-center">
      <button 
        @click="downloadSelected" 
        class="flex flex-col items-center gap-1 text-gray-600"
        :class="{ 'opacity-50': selectedIds.length === 0 }"
        :disabled="selectedIds.length === 0"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        <span class="text-[10px]">保存</span>
      </button>
      <button 
        @click="deleteSelected" 
        class="flex flex-col items-center gap-1"
        :class="selectedIds.length > 0 ? 'text-red-500' : 'text-gray-300'"
        :disabled="selectedIds.length === 0"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <span class="text-[10px]">删除</span>
      </button>
    </div>
  </div>
</template>
