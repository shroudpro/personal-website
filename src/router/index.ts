import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ProjectDetailPage from '../pages/ProjectDetailPage.vue'
import BlogDetailPage from '../pages/BlogDetailPage.vue'
import BlogListPage from '../pages/BlogListPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/project/:id',
      name: 'project-detail',
      component: ProjectDetailPage,
    },
    {
      path: '/blog',
      name: 'blog-list',
      component: BlogListPage,
    },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: BlogDetailPage,
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 16,
      }
    }

    return { top: 0 }
  },
})

export default router
