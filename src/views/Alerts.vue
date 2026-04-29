<script setup lang="ts">
import { ref } from 'vue';
import { ChevronLeft, Filter, Search, Bell, Battery } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();
const active = ref(0);

interface Alert {
  id: string;
  type: string;
  device: string;
  time: string;
  status: 'pending' | 'handled';
  thumb: string;
  iconClass: string;
}

const alerts = ref<Alert[]>([
  {
    id: '1',
    type: '移动侦测',
    device: '客厅巡护设备',
    time: '今天 08:30:25',
    status: 'pending',
    thumb: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=300',
    iconClass: 'bg-orange-100 text-orange-500'
  },
  {
    id: '2',
    type: '移动侦测',
    device: '客厅巡护设备',
    time: '今天 08:15:42',
    status: 'pending',
    thumb: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=300',
    iconClass: 'bg-orange-100 text-orange-500'
  },
  {
    id: '3',
    type: '低电量提醒',
    device: '客厅巡护设备',
    time: '昨天 22:30:10',
    status: 'handled',
    thumb: '',
    iconClass: 'bg-yellow-100 text-yellow-500'
  }
]);
</script>

