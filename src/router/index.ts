import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue')
        },
        {
          path: 'messages',
          name: 'messages',
          component: () => import('../views/Alerts.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/Profile.vue')
        }
      ]
    },
    {
      path: '/full-screen',
      name: 'full-screen',
      component: () => import('../views/FullScreenView.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/History.vue')
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/Stats.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/Settings.vue')
    },
    {
      path: '/alert/:id',
      name: 'alert-detail',
      component: () => import('../views/AlertDetail.vue')
    },
    {
      path: '/screenshots',
      name: 'screenshots',
      component: () => import('../views/Screenshots.vue')
    }
  ]
});

export default router;
