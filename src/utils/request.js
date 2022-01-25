/*
 * @Author: Archie
 * @Date: 2022-01-24 16:42:56
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-25 16:48:09
 * @FilePath: /Projects/toutiao-m/src/utils/request.js
 */
/* 请求模块 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
    baseURL: 'http://toutiao.itheima.net/' // 接口的基准路径
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function(config) {
    // 请求发起会经过这里
    // config: 本次请求的配置对象
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    console.log(config)
        // 注意:这里务必要返回 config 对象，否则请求就停在这里出不去了
    return config
}, function(error) {
    // 如果请求出错了 (还没有发出去) 会经过这里
    return Promise.reject(error)
})

// 响应拦截器

export default request