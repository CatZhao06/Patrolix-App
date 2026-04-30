<script setup lang="ts">
import { ref, computed } from 'vue';
import { Footprints, Battery, WifiOff, Calendar } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { showToast, showConfirmDialog } from 'vant';
import type { Alert } from '@/data/alerts';
import { useAlertStore } from '@/stores/useAlertStore';

const router = useRouter();
const active = ref(0);
const alertStore = useAlertStore();
const selectedDate = ref('');

// 格式化显示时间
const formatTime = (alert: Alert) => {
  const today = new Date();
  const alertDate = new Date(alert.date);
  const diffDays = Math.floor((today.getTime() - alertDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return `今天 ${alert.time}`;
  if (diffDays === 1) return `昨天 ${alert.time}`;
  return `${alert.date} ${alert.time}`;
};

// 获取所有日期选项
const dateOptions = computed(() => {
  const dates = alertStore.getAlertDates();
  return dates.map(date => ({
    text: formatDate(date),
    value: date
  }));
});

// 格式化日期显示
const formatDate = (date: string) => {
  const today = new Date();
  const targetDate = new Date(date);
  const diffDays = Math.floor((today.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays < 7) return `${diffDays}天前`;
  return date;
};

// 根据标签页和日期过滤数据
const filteredAlerts = computed(() => {
  const statusMap: Record<number, 'all' | 'pending' | 'handled'> = {
    0: 'all',
    1: 'pending',
    2: 'handled'
  };
  
  let result = alertStore.getAlertsByStatus(statusMap[active.value] || 'all');
  
  // 如果选择了日期，则按日期过滤
  if (selectedDate.value) {
    result = result.filter(alert => alert.date === selectedDate.value);
  }
  
  return result;
});

// 获取图标组件
const getIcon = (type: string) => {
  switch (type) {
    case 'move': return Footprints;
    case 'battery': return Battery;
    case 'offline': return WifiOff;
    default: return Footprints;
  }
};

// 日期选择器显示状态
const showDatePickerModal = ref(false);

// 日期选择器选项
const pickerColumns = computed(() => {
  return [{ text: '全部日期', value: '' }, ...dateOptions.value];
});

// 显示日期选择器
const showDatePicker = () => {
  if (dateOptions.value.length === 0) {
    showToast('暂无消息记录');
    return;
  }
  showDatePickerModal.value = true;
};

// 确认选择日期
const onDateConfirm = (pickerResult: { selectedOptions: Array<{ value: string }> }) => {
  if (pickerResult.selectedOptions && pickerResult.selectedOptions[0]) {
    selectedDate.value = pickerResult.selectedOptions[0].value;
  }
  showDatePickerModal.value = false;
};

// 取消选择
const onDateCancel = () => {
  showDatePickerModal.value = false;
};

// 滑动删除回调
const beforeClose = (alert: Alert) => {
  return ({ position }: { position: string }) => {
    switch (position) {
      case 'left':
      case 'cell':
      case 'outside':
        return true;
      case 'right':
        return new Promise((resolve) => {
          showConfirmDialog({
            title: '确定删除吗？',
            message: '删除后无法恢复'
          })
            .then(() => {
              alertStore.deleteAlert(alert.id);
              showToast('删除成功');
              resolve(true);
            })
            .catch(() => {
              resolve(false);
            });
        });
    }
  };
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <van-nav-bar 
      title="报警记录" 
      left-text="返回" 
      right-text="筛选" 
      left-arrow 
      @click-left="router.back()"
      @click-right="showDatePicker"
      class="bg-white"
    />

    <!-- 标签页 -->
    <div class="bg-white px-4 py-3">
      <div class="flex gap-3">
        <button 
          @click="active = 0"
          :class="[
            'flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all',
            active === 0 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
          ]"
        >
          全部
        </button>
        <button 
          @click="active = 1"
          :class="[
            'flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all relative',
            active === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
          ]"
        >
          未处理
          <van-badge 
            v-if="alertStore.pendingCount > 0" 
            :content="alertStore.pendingCount" 
            class="absolute -top-1 -right-1" 
          />
        </button>
        <button 
          @click="active = 2"
          :class="[
            'flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all',
            active === 2 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
          ]"
        >
          已处理
        </button>
      </div>
    </div>

    <!-- 日期筛选栏 -->
    <div v-if="selectedDate" class="bg-white px-4 py-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-gray-600">
          <Calendar :size="14" />
          <span class="text-sm">筛选日期：{{ formatDate(selectedDate) }}</span>
        </div>
        <button 
          @click="selectedDate = ''"
          class="text-sm text-blue-500"
        >
          清除筛选
        </button>
      </div>
    </div>

    <!-- 列表内容 -->
    <div class="px-4 py-3 space-y-3">
      <van-swipe-cell 
        v-for="alert in filteredAlerts" 
        :key="alert.id"
        :before-close="beforeClose(alert)"
      >
        <template #right>
          <van-button square type="danger" text="删除" class="delete-button" />
        </template>
        
        <div 
          class="bg-white rounded-xl p-4 shadow-sm cursor-pointer active:bg-gray-50"
          @click="router.push(`/alert/${alert.id}`)"
        >
          <div class="flex items-start gap-3">
            <!-- 图标 -->
            <div :class="['w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', alert.iconClass]">
              <component :is="getIcon(alert.iconType)" :size="20" />
            </div>
            
            <!-- 内容 -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <span class="font-medium text-gray-900">{{ alert.type }}</span>
                <span 
                  :class="[
                    'text-xs px-2 py-0.5 rounded-full',
                    alert.status === 'pending' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'
                  ]"
                >
                  {{ alert.status === 'pending' ? '未处理' : '已处理' }}
                </span>
              </div>
              <p class="text-sm text-gray-500 mb-1">{{ alert.device }}</p>
              <p class="text-xs text-gray-400">{{ formatTime(alert) }}</p>
            </div>
            
            <!-- 截图 -->
            <img 
              v-if="alert.thumb" 
              :src="alert.thumb" 
              class="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
          </div>
        </div>
      </van-swipe-cell>

      <!-- 空状态 -->
      <div v-if="filteredAlerts.length === 0" class="text-center py-12">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar :size="32" class="text-gray-400" />
        </div>
        <p class="text-gray-500">{{ selectedDate ? '该日期暂无消息记录' : '暂无消息记录' }}</p>
      </div>

      <!-- 底部提示 -->
      <div v-if="filteredAlerts.length > 0" class="text-center py-4">
        <span class="text-sm text-gray-400">已经到底了</span>
      </div>
    </div>

    <!-- 日期选择器弹窗 -->
    <van-popup v-model:show="showDatePickerModal" position="bottom">
      <van-picker 
        :columns="pickerColumns"
        :default-index="selectedDate ? pickerColumns.findIndex(o => o.value === selectedDate) : 0"
        @confirm="onDateConfirm"
        @cancel="onDateCancel"
      />
    </van-popup>
  </div>
</template>

<style scoped>
.delete-button {
  height: 100%;
}
</style>
