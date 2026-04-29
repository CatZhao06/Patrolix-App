<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans">
    <RouterView />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --van-primary-color: #3b82f6; /* Blue 500 */
}

body {
  font-family: 'Inter', sans-serif;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

#root {
  max-width: 500px;
  margin: 0 auto;
  background: white;
  min-height: 100vh;
  box-shadow: 0 0 20px rgba(0,0,0,0.05);
}
</style>
