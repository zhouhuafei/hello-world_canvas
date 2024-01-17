import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/canvas/0'
    },
    {
      path: '/canvas',
      name: 'canvas',
      children: [
        {
          path: '0',
          name: 'canvas0',
          component: () => import('@/views/canvas/0/index.vue')
        },
        {
          path: '1',
          name: 'canvas1',
          component: () => import('@/views/canvas/1/index.vue')
        },
        {
          path: '2',
          name: 'canvas2',
          component: () => import('@/views/canvas/2/index.vue')
        },
        {
          path: '3',
          name: 'canvas3',
          component: () => import('@/views/canvas/3/index.vue')
        },
        {
          path: '4',
          name: 'canvas4',
          component: () => import('@/views/canvas/4/index.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

export default router
