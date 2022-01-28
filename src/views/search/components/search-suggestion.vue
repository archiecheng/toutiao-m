<!--
 * @Author: Archie
 * @Date: 2022-01-28 11:01:57
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-28 14:44:09
 * @FilePath: /Projects/toutiao-m/src/views/search/components/search-suggestion.vue
-->
<template>
  <div class="search-suggestion">
      <van-cell 
        icon="search"
        v-for="(text,index) in suggestions"
        :key = "index"
        @click="$emit('search',text)"
      >
        <div slot="title" v-html="highlight(text)"></div>
      </van-cell>
      <!-- 使用 v-html 指令可以绑定渲染带有 HTML 标签的字符串 -->
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
// 按需加载有好处: 只会把使用到的成员打包到结果中
import { debounce } from 'lodash'
export default {
  // 组件名称
  name: 'SearchSuggestion',
  // 组件参数 接收来自父组件的数据
  props: {
    searchText:{
      type:String,
      required:true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
      suggestions:[]  // 联想建议数据列表
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    searchText: {
      // 当searchText发生改变的时候，会调用handler函数
      // 注意: handler 函数名称是固定的
      // handler (value) {
      //   console.log(value)
      // },
      // debounce 函数
      // 参数1: 一个函数
      // 参数2: 延迟时间，单位是毫秒
      // 返回值: 防抖之后的函数
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      },300),
    //   handler (value) {
    //     this.loadSearchSuggestions(value)
    //   },
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  // 组件方法
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 正则表达式 // 中间的内容都会当做匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      // 参数1: 匹配模式字符串，它会根据这个字符串创建正则对象
      // 参数2: 匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script> 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="less">
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
