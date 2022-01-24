/*
 * @Author: Archie
 * @Date: 2022-01-24 22:31:40
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-24 22:31:40
 * @FilePath: /Projects/toutiao-m/src/utils/storage.js
 */
/* 封装本地存储操作模块 */

/* 存储数据 */
export const setItem = (key, value) => {
  // 将数组或对象类型的数据转化成JSON格式字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
/* 获取数据 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
/* 删除数据 */

export const removeItem = key => {
  window.localStorage.removeItem(key)
}
