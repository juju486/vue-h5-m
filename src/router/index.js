import { createRouter, createWebHashHistory } from 'vue-router';
import NotFound from '@/views/notFound.vue';
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '/:path*',
      redirect: '/404',
    },
  ]
});

export default router;
