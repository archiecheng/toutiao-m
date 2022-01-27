/*
 * @Author: Archie
 * @Date: 2022-01-27 14:58:57
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-27 14:58:57
 * @FilePath: /Projects/toutiao-m/src/utils/dayjs.js
 */
import dayjs from 'dayjs'
import Vue from 'vue'
// dayjs 默认语言是英文，我们这里配置为中文

// 加载中文语言包
import 'dayjs/locale/zh-cn' // ES 2015

// 配置使用处理相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用

// 定义一个全局过滤器，然后就可以在任何组件的模板中使用
// 其实过滤器相当于一个全局可用的方法 (仅供模板使用)
// 参数1: 过滤器名称
// 参数2: 过滤器函数
// 使用方式: {{ 表达式 | 过滤器名称}}
// 管道符前面的表达式结果会作为参数传递到过滤器函数中
// 过滤器的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})

//dayjs() 获取当前最新事件
// console.log(dayjs().format('YYYY-MM-DD'))

// console.log(dayjs().from(dayjs('1990')))
// console.log(dayjs().from(dayjs(), true))
// console.log(dayjs().fromNow())
// console.log(dayjs().to(dayjs()))
// console.log(dayjs().toNow())
// 2 years ago
// 2 years