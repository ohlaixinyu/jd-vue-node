import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/view/Layout/Home/index.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/view/Layout/Home/Home.vue')
      },
      // 购物车
      {
        path: '/buycar',
        component: () => import('@/view/Layout/BuyCar/index.vue')
      },
      // 用户界面
      {
        path: '/user',
        component: () => import('@/view/Layout/user/index.vue')
      }
    ]
  },
  // 商品详情
  {
    path: '/goods/:id',
    component: () => import('@/components/shopItem.vue')
  },
  // 登录
  {
    path: '/login',
    component: () => import('@/view/Layout/user/login.vue')
  },
  // 注册
  {
    path: '/createUser',
    component: () => import('@/view/Layout/user/createUser.vue')
  },
  // 搜索
  {
    path: '/search',
    component: () => import('@/view/Layout/search/index.vue')
  }

]

const router = new VueRouter({
  routes
})

router.afterEach((to, from, next) => {
  if (to.path.indexOf('/good') !== -1) {
    window.scrollTo(0, 0)
  }
})

export default router
