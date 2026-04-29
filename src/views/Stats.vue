<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { 
  ChevronLeft, Timer, Eye, AlertTriangle, 
  Camera, CalendarDays
} from 'lucide-vue-next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const router = useRouter();
const timeRange = ref('day');

const chartData = {
  labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
  datasets: [
    {
      label: '运行时长 (小时)',
      data: [0.2, 0.1, 1.2, 1.8, 2.1, 1.5, 0.5],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 0
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 10 } } },
    y: { grid: { borderDash: [5, 5] }, min: 0, ticks: { font: { size: 10 } } }
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <van-nav-bar fixed placeholder title="使用统计" left-arrow @click-left="router.back()" />

    <div class="p-4 space-y-4">
      <div class="bg-white rounded-2xl p-4 shadow-sm">
        <div class="bg-gray-100 p-1 rounded-xl mb-6">
          <div class="flex">
            <button 
              v-for="r in [{v:'day', l:'日'}, {v:'week', l:'周'}, {v:'month', l:'月'}]" 
              :key="r.v"
              @click="timeRange = r.v"
              :class="['flex-1 py-1.5 text-xs font-bold rounded-lg transition-all', timeRange === r.v ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-500']"
            >
              {{ r.l }}
            </button>
          </div>
        </div>

        <div class="mb-2">
          <p class="text-[10px] text-gray-400">今日运行时长</p>
          <div class="flex items-baseline gap-1 mt-0.5">
            <span class="text-3xl font-bold text-gray-900">2.5</span>
            <span class="text-xs text-gray-500 font-medium tracking-wide">小时</span>
          </div>
        </div>

        <div class="h-48 mt-4">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div class="bg-white rounded-2xl p-3 shadow-sm border-b-2 border-orange-200">
          <p class="text-[10px] text-gray-400">移动侦测</p>
          <div class="flex items-baseline gap-1 mt-1">
            <span class="text-xl font-bold text-orange-500">12</span>
            <span class="text-[8px] text-gray-400">次</span>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-3 shadow-sm border-b-2 border-red-200">
          <p class="text-[10px] text-gray-400">报警次数</p>
          <div class="flex items-baseline gap-1 mt-1">
            <span class="text-xl font-bold text-red-500">3</span>
            <span class="text-[8px] text-gray-400">次</span>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-3 shadow-sm border-b-2 border-blue-200">
          <p class="text-[10px] text-gray-400">截图数量</p>
          <div class="flex items-baseline gap-1 mt-1">
            <span class="text-xl font-bold text-blue-500">18</span>
            <span class="text-[8px] text-gray-400">张</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
            <Timer :size="20" />
          </div>
          <div>
            <p class="text-sm font-bold text-gray-700">设备开机时长</p>
            <p class="text-[10px] text-gray-400">自上次充电后</p>
          </div>
        </div>
        <div class="flex items-baseline gap-1">
          <span class="text-xl font-bold text-gray-900">8.6</span>
          <span class="text-[10px] text-gray-400">小时</span>
        </div>
      </div>
    </div>
  </div>
</template>
