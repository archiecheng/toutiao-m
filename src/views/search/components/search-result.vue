<!--
 * @Author: Archie
 * @Date: 2022-01-28 11:02:29
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-28 14:39:07
 * @FilePath: /Projects/toutiao-m/src/views/search/components/search-result.vue
-->
<template>
  <div class="search-result">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        error-text="加载失败，请点击重试"
        :error.sync="error"
      >
      <van-cell
        v-for="(article,index) in list"
        :key="index"
        :title="article.title"
      />
</van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  // 组件名称
  name: 'SearchResult',
  // 组件参数 接收来自父组件的数据
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText // 查询关键词
        })
        // 2. 将数据添加到数组列表中
        const { results } = data.data
        this.list.push(...results)
        // 3. 将本次加载中的 loading 关闭
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
          // 如果有，则更新获取下一个数据的页码
          this.page++
        } else {
          // 如果没有，则将加载状态 finished 设置为结束
          this.finished = true
        }
      } catch (error) {
        // 展示加载失败的提示状态
        this.error = true
        // 加载失败了, loading 也要关闭
        this.loading = false
        this.$toast('数据获取失败，请稍后重试')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>

</style>
