import Login from '@/components/Login.vue'
import EchartsAdmin from '@/views/body/EchartsAdmin.vue'
import PostAdmin from '@/views/body/PostAdmin.vue'
import UserAdmin from '@/views/body/UserAdmin.vue'
import { createRouter, createWebHistory } from 'vue-router'
// const ISLOGIN=false
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserAdmin
    },
    {
      path: '/postadmin',
      name: 'postadmin',
      component:()=> PostAdmin
    },
    {
      path: '/echartsadmin',
      name: 'echartsadmin',
      component:()=> EchartsAdmin
    },
    {
      path: '/login',
      name: 'login',
      component:()=> Login
    }
  ]
})
/*   router.beforeEach((to, from, next) => {   //全局全局前置守卫
  //to : 将要进入的目标路由对象
  //from : 即将离开的目标路由对象
  //执行跳转的下一步钩子
  console.log(to)
  console.log(from)
  if(to.name != 'login'){ //如果不是登录页面
    if(ISLOGIN)next()   //已登录就执行跳转
    else next({name:'login'})   //否则跳转到登录页面
  }else{ //如果是登录页面
    if(ISLOGIN)next({name:'/'}) //已登录就跳转到首页
    else  next()  //否则正常进入登录页面
  }
}) */

export default router
