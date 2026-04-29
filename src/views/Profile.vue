<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Camera, ShieldCheck, User } from 'lucide-vue-next';

const router = useRouter();
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <div class="relative h-64 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex flex-col justify-end">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-20 h-20 rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center overflow-hidden">
          <User :size="40" class="text-white opacity-80" />
        </div>
        <div class="text-white">
          <h2 class="text-xl font-bold">智能守护者</h2>
          <p class="text-sm text-blue-100 opacity-80 mt-1">ID: HG-882901</p>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-3 gap-2 p-4 -mt-6">
      <div class="bg-white rounded-2xl p-3 shadow-md text-center">
        <p class="text-lg font-bold text-gray-900">12</p>
        <p class="text-[10px] text-gray-400">守护设备</p>
      </div>
      <div class="bg-white rounded-2xl p-3 shadow-md text-center">
        <p class="text-lg font-bold text-gray-900">48</p>
        <p class="text-[10px] text-gray-400">预警拦截</p>
      </div>
      <div class="bg-white rounded-2xl p-3 shadow-md text-center">
        <p class="text-lg font-bold text-gray-900">1.2w</p>
        <p class="text-[10px] text-gray-400">巡护里程</p>
      </div>
    </div>

    <!-- Menu -->
    <div class="p-4 space-y-2">
      <van-cell-group inset>
        <van-cell title="云存储空间" is-link icon="cloud-o" value="2.5GB / 10GB" />
        <van-cell title="智能升级" is-link icon="upgrade" />
        <van-cell title="隐私中心" is-link icon="shield-o" />
        <van-cell title="我的分享" is-link icon="friends-o" />
      </van-cell-group>
    </div>
  </div>
</template>
