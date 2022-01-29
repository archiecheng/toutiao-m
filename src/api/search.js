/*
 * @Author: Archie
 * @Date: 2022-01-28 11:39:18
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-28 14:23:18
 * @FilePath: /Projects/toutiao-m/src/api/search.js
 */
import request from '@/utils/request'
export const getSearchSuggestions = (q) => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getSearchResult = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
