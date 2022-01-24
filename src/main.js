/*
 * @Author: Archie
 * @Date: 2022-01-23 15:32:46
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-24 15:00:45
 * @FilePath: /Projects/toutiao-m/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式
import './styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
