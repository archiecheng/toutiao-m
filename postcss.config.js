/*
 * @Author: Archie
 * @Date: 2022-01-24 16:23:42
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-24 16:23:42
 * @FilePath: /Projects/toutiao-m/.postcss.config.js
 */
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
