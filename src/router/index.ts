import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/canvas/1'
    },
    {
      path: '/canvas',
      name: 'canvas',
      children: [
        {
          path: '1',
          name: 'canvas1',
          component: () => import('@/views/canvas/1/index.vue')
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
