import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import commentsPage from '@/pages/commentsPage.vue'
import AiPage from '@/pages/AiPage.vue'
import SettingPage from '@/pages/SettingPage.vue'
import MessagePage from '@/pages/MessagePage.vue'
import UserPage from '@/pages/UserPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import SignupPage from '@/pages/SignupPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/comments',
      name: 'comments',
      component: commentsPage,
    },
    {
      path: '/ai',
      name: 'ai',
      component: AiPage,
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingPage,
    },
    {
      path: '/message',
      name: 'message',
      component: MessagePage,
    },
    {
      path: '/user/:id',
      name: 'user',
      component: UserPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage,
    },

  ],
})

export default router
