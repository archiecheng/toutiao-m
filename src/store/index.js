/*
 * @Author: Archie
 * @Date: 2022-01-23 15:32:46
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-24 22:15:57
 * @FilePath: /Projects/toutiao-m/src/store/index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登陆用户信息，里面包含token等数据
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了防止刷新丢失，需要把数据备份到本地存储
      /* window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user)) */
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
