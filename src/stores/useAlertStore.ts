import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Alert } from '@/data/alerts';
import { alerts as initialAlerts } from '@/data/alerts';

export interface Screenshot {
  id: string;
  alertId: string;
  url: string;
  thumbnail: string;
  date: string;
  time: string;
  device: string;
  type: string;
}

export const useAlertStore = defineStore('alerts', () => {
  // 消息列表
  const alerts = ref<Alert[]>([...initialAlerts]);

  // 截图列表
  const screenshots = ref<Screenshot[]>([
    {
      id: 's1',
      alertId: '1',
      url: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200',
      thumbnail: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=200',
      date: '2024-05-15',
      time: '08:30:25',
      device: '客厅巡护设备',
      type: '移动侦测'
    },
    {
      id: 's2',
      alertId: '2',
      url: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1200',
      thumbnail: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=200',
      date: '2024-05-15',
      time: '10:15:42',
      device: '卧室摄像头',
      type: '移动侦测'
    },
    {
      id: 's3',
      alertId: '3',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=200',
      date: '2024-05-14',
      time: '14:22:18',
      device: '门口监控',
      type: '移动侦测'
    },
    {
      id: 's4',
      alertId: '4',
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=200',
      date: '2024-05-14',
      time: '16:45:33',
      device: '阳台摄像头',
      type: '低电量报警'
    },
    {
      id: 's5',
      alertId: '5',
      url: 'https://images.unsplash.com/photo-1569000489615-81156b9e1741?auto=format&fit=crop&q=80&w=1200',
      thumbnail: 'https://images.unsplash.com/photo-1569000489615-81156b9e1741?auto=format&fit=crop&q=80&w=200',
      date: '2024-05-13',
      time: '09:10:55',
      device: '车库摄像头',
      type: '设备离线'
    },
    {
      id: 's6',
      alertId: '6',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200',
      date: '2024-05-13',
      time: '22:30:08',
      device: '客厅巡护设备',
      type: '移动侦测'
    }
  ]);

  // 未处理数量
  const pendingCount = computed(() => {
    return alerts.value.filter(a => a.status === 'pending').length;
  });

  // 已处理数量
  const handledCount = computed(() => {
    return alerts.value.filter(a => a.status === 'handled').length;
  });

  // 截图数量
  const screenshotCount = computed(() => {
    return screenshots.value.length;
  });

  // 获取消息详情
  const getAlertById = (id: string): Alert | undefined => {
    return alerts.value.find(a => a.id === id);
  };

  // 获取过滤后的消息列表
  const getAlertsByStatus = (status: 'all' | 'pending' | 'handled'): Alert[] => {
    if (status === 'all') return alerts.value;
    return alerts.value.filter(a => a.status === status);
  };

  // 根据日期范围筛选消息
  const getAlertsByDateRange = (startDate: string, endDate: string): Alert[] => {
    return alerts.value.filter(alert => {
      const alertDate = alert.date;
      return alertDate >= startDate && alertDate <= endDate;
    });
  };

  // 获取所有消息日期列表
  const getAlertDates = (): string[] => {
    const dates: string[] = [...new Set(alerts.value.map(a => a.date))];
    return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  };

  // 获取所有截图日期列表
  const getScreenshotDates = (): string[] => {
    const dates: string[] = [...new Set(screenshots.value.map(s => s.date))];
    return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  };

  // 根据日期筛选截图
  const getScreenshotsByDate = (date: string): Screenshot[] => {
    if (!date) return screenshots.value;
    return screenshots.value.filter(s => s.date === date);
  };

  // 删除截图
  const deleteScreenshot = (id: string) => {
    const index = screenshots.value.findIndex(s => s.id === id);
    if (index > -1) {
      screenshots.value.splice(index, 1);
    }
  };

  // 标记为已处理
  const markAsHandled = (id: string) => {
    const alert = alerts.value.find(a => a.id === id);
    if (alert) {
      alert.status = 'handled';
    }
  };

  // 忽略消息
  const ignoreAlert = (id: string) => {
    const alert = alerts.value.find(a => a.id === id);
    if (alert) {
      alert.status = 'handled';
    }
  };

  // 新增消息
  const addAlert = (alert: Omit<Alert, 'id'>) => {
    const newId = Date.now().toString();
    alerts.value.unshift({
      ...alert,
      id: newId
    });
  };

  // 删除消息
  const deleteAlert = (id: string) => {
    const index = alerts.value.findIndex(a => a.id === id);
    if (index > -1) {
      alerts.value.splice(index, 1);
    }
  };

  return {
    alerts,
    screenshots,
    pendingCount,
    handledCount,
    screenshotCount,
    getAlertById,
    getAlertsByStatus,
    getAlertsByDateRange,
    getAlertDates,
    getScreenshotDates,
    getScreenshotsByDate,
    deleteScreenshot,
    markAsHandled,
    ignoreAlert,
    addAlert,
    deleteAlert
  };
});
