import { createRouter, createWebHistory } from 'vue-router'
import NotImplementedView from '../views/NotImplementedView.vue'
import PayslipView from '@/views/PayslipView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NotImplementedView
    },
    {
      path: '/quick-access',
      name: 'quick_access',
      component: NotImplementedView
    },
    {
      path: '/timesheet',
      name: 'timesheet',
      component: NotImplementedView
    },
    {
      path: '/my-information',
      name: 'my_information',
      component: NotImplementedView
    },
    {
      path: '/payslips',
      name: 'payslips',
      component: PayslipView
    },
    {
      path: '/leaves',
      name: 'leaves',
      component: NotImplementedView
    },
    {
      path: '/orgchart',
      name: 'orgchart',
      component: NotImplementedView
    },
    {
      path: '/expense',
      name: 'expense',
      component: NotImplementedView
    },
    {
      path: '/my-team',
      name: 'my_team',
      component: NotImplementedView
    },
    {
      path: '/docs',
      name: 'docs',
      component: NotImplementedView
    }
  ]
})

export default router
