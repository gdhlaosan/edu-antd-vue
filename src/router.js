import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'login',
    component: () => import('./views/loginPage/LoginPage.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    redirect: '/layout/home',
    component: () => import('./views/Layout.vue'),
    children: [{
      path: 'home',
      name: 'HomePage',
      component: () => import('./views/contentPage/HomePage.vue')
    }, {
      path: 'TeacherManage',
      name: 'TeacherManage',
      component: () => import('./views/contentPage/TeacherManage.vue'),
      meta: {
        preKey: 3047,
        key: 14,
        name: '教师管理'
      }
    }, {
      path: 'TeacherMark',
      name: 'TeacherMark',
      component: () => import('./views/contentPage/TeacherMark.vue'),
      meta: {
        preKey: 3047,
        key: 16,
        name: '教师评阅分配'
      }
    }, {
      path: 'TeacherMarkImport',
      name: 'TeacherMarkImport',
      component: () => import('./views/contentPage/TeacherMarkImport.vue'),
      meta: {
        preKey: 3047,
        key: 3046,
        name: '评阅分配结果导入'
      }
    }
    // {
    //   path: 'about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   meta: { key: 'about' },
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
    ]
  }
  ]
})

export default router
