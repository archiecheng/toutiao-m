/*
 * @Author: Archie
 * @Date: 2022-01-23 15:32:46
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-28 16:32:21
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
            import ('@/views/login')
    },
    {
        path: '/',
        // name: 'layout', // 如果父路由有默认子路由，那么它的name没有意义
        component: () =>
            import ('@/views/layout'),
        children: [{
                path: '', // 默认子路由，只能有一个
                name: 'home',
                component: () =>
                    import ('@/views/home')
            },
            {
                path: '/qa',
                name: 'qa',
                component: () =>
                    import ('@/views/qa')
            },
            {
                path: '/video',
                name: 'video',
                component: () =>
                    import ('@/views/video')
            },
            {
                path: '/my',
                name: 'my',
                component: () =>
                    import ('@/views/my')
            }
        ]
    },
    {
        path: '/search',
        name: 'search',
        component: () =>
            import ('@/views/search')
    },
    {
        path: '/article/:articleId',
        name: 'article',
        component: () =>
            import ('@/views/article'),
        // 开启 props 传参，把路由参数映射到props数据中
        props: true
    }
]

const router = new VueRouter({
    routes
})

export default router