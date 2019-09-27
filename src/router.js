import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: 'table',
      name: 'TablePage',
      component: () => import('./views/contentPage/TablePage.vue')
    }, {
      path: 'table',
      name: 'tableList',
      component: () => import('./views/TableList.vue')
    },
    {
      path: 'about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      meta: { key: 'about' },
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }]
  }
  ]
})
