import { defineStore } from 'pinia';
import { ref } from "vue";
export const useAppStore = defineStore('app', () => {
    // 是否静音状态
  const isMute = ref(false);
  // 切换静音状态
  const changeMute = () => {
    isMute.value = !isMute.value;
  }
  return { isMute, changeMute };
});
