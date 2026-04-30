export interface Alert {
  id: string;
  type: string;
  device: string;
  time: string;
  date: string;
  status: 'pending' | 'handled';
  thumb: string;
  iconClass: string;
  iconType: 'move' | 'battery' | 'offline';
  description: string;
}

export const alerts: Alert[] = [
  {
    id: '1',
    type: '移动侦测',
    device: '客厅巡护设备',
    time: '08:30:25',
    date: '2024-05-15',
    status: 'pending',
    thumb: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800',
    iconClass: 'bg-orange-100 text-orange-500',
    iconType: 'move',
    description: '检测到画面中有物体移动'
  },
  {
    id: '2',
    type: '移动侦测',
    device: '客厅巡护设备',
    time: '08:15:42',
    date: '2024-05-15',
    status: 'pending',
    thumb: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800',
    iconClass: 'bg-orange-100 text-orange-500',
    iconType: 'move',
    description: '检测到画面中有物体移动'
  },
  {
    id: '3',
    type: '低电量提醒',
    device: '客厅巡护设备',
    time: '22:30:10',
    date: '2024-05-14',
    status: 'handled',
    thumb: '',
    iconClass: 'bg-yellow-100 text-yellow-500',
    iconType: 'battery',
    description: '设备电量低于20%，请及时充电'
  },
  {
    id: '4',
    type: '移动侦测',
    device: '客厅巡护设备',
    time: '18:40:33',
    date: '2024-05-14',
    status: 'handled',
    thumb: '',
    iconClass: 'bg-blue-100 text-blue-500',
    iconType: 'move',
    description: '检测到画面中有物体移动'
  },
  {
    id: '5',
    type: '设备离线',
    device: '客厅巡护设备',
    time: '12:20:15',
    date: '2024-05-14',
    status: 'handled',
    thumb: '',
    iconClass: 'bg-gray-100 text-gray-500',
    iconType: 'offline',
    description: '设备与服务器断开连接'
  }
];
