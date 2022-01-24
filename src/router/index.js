/*
 * @Author: Archie
 * @Date: 2022-01-23 15:32:46
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-24 14:54:15
 * @FilePath: /Projects/toutiao-m/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [{
  path: '/login',
  name: 'login',
  component: () =>
    import('@/views/login')
}]

const router = new VueRouter({
  routes
})

export default router
