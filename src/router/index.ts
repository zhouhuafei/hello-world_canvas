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
          name: 'canvas0', // 先展示遮罩图片 - 后展示主图和文案 - 随后遮罩层逐层消失 - 最后显现主图和文案
          component: () => import('@/views/canvas/0/index.vue')
        },
        {
          path: '1',
          name: 'canvas1', // 在中心点绘制小圆和大圆 - 随后使之围绕画布的中心点进行旋转
          component: () => import('@/views/canvas/1/index.vue')
        },
        {
          path: '2',
          name: 'canvas2', // 错开中心点绘制小圆和大圆 - 随后使之围绕画布的中心点进行旋转
          component: () => import('@/views/canvas/2/index.vue')
        },
        {
          path: '3',
          name: 'canvas3', // 在中心点绘制 - 4个正圆 | 4个闭合外半圆 | 4个闭合内半圆 | 4个非闭合内半圆 - 随后使之围绕自身的中心点进行旋转
          component: () => import('@/views/canvas/3/index.vue')
        },
        {
          path: '4',
          name: 'canvas4', // 先绘制大圆小圆各种场景合集 - 随后使之围绕自身的中心点进行旋转
          component: () => import('@/views/canvas/4/index.vue')
        },
        {
          path: '5',
          name: 'canvas5', // 先绘制满屏的小正方形 - 随后使之围绕自身的中心点进行旋转
          component: () => import('@/views/canvas/5/index.vue')
        },
        {
          path: '6',
          name: 'canvas6', // 效果篇 - 小球变大变透明 - 小球变大变透明直到消失
          component: () => import('@/views/canvas/6/index.vue')
        },
        {
          path: '7',
          name: 'canvas7', // 效果篇 - 黑客效果
          component: () => import('@/views/canvas/7/index.vue')
        },
        {
          path: '8',
          name: 'canvas8', // 效果篇 - 画心效果
          component: () => import('@/views/canvas/8/index.vue')
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
