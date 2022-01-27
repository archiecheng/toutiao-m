/*
 * @Author: Archie
 * @Date: 2022-01-26 14:51:36
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-26 15:21:53
 * @FilePath: /Projects/toutiao-m/src/api/article.js
 */
/* 文章请求模块 */
import request from '@/utils/request'

/* 请求获取文章列表数据 */
export const getArticles = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })
}