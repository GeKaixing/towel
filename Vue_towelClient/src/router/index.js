import { createRouter, createWebHistory } from 'vue-router'
import user from '../views/body/user/user.vue'
import postcontent from '../views/body/post/postContent.vue'
import post from '../views/body/post/Post.vue'
import message from '../views/body/message/message.vue'
import about from '../views/body/about/about.vue'
import add from '../views/body/add/add.vue'
import login from '../views/body/login/Login.vue'
import signin from '../views/body/login/Signin.vue'
import setting from '../views/body/setting/Setting.vue'
import drak from '../views/body/setting/Drak.vue'
import right from '../views/body/setting/Right.vue'
import system from '../views/body/setting/System.vue'
import userinfo from '../views/body/setting/UserInfo.vue'
import forgetpassword from '../views/body/setting/ForGetPassword.vue'
import changepassword from '../views/body/setting/ChangePassword.vue'
import useLocaStorage from '@/hook/useLocaStorage'
const { getLocaStorageData } = useLocaStorage()
const beforeEnterRule=()=>(to, from, next) => {
  if (getLocaStorageData().jwt === '') {
    next('/login')
  } else {
    next()
  }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: post
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      beforeEnter: beforeEnterRule
    },
    {
      path: '/postcontent/:id',
      name: 'postcontent',
      component: postcontent,
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting,
      children: [
        {
          path: '/setting/drak',
          name: 'drak',
          component: drak
        },
        {
          path: '/setting/right',
          name: 'right',
          component: right
        },
        {
          path: '/setting/system',
          name: 'system',
          component: system
        },
        {
          path: '/setting/forgetpassword',
          name: 'forgetpassword',
          component: forgetpassword
        },
        {
          path: '/setting/changepassword',
          name: 'changepassword',
          component: changepassword
        },
        {
          path: '/setting/userinfo',
          name: 'userinfo',
          component: userinfo
        },
      ]
    },
    {
      path: '/add',
      name: 'add',
      component: add
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    }
  ]
})

export default router
