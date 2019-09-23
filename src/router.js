import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('./views/Layout.vue'),
      children: [{
        path: 'table',
        name: 'tableList',
        meta: { key: 'table' },
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
