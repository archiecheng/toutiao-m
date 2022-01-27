<!--
 * @Author: Archie
 * @Date: 2022-01-26 14:12:37
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-27 14:01:40
 * @FilePath: /Projects/toutiao-m/src/views/home/components/article-list.vue
-->
<template>
  <div class="article-list">
    <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" :success-text="refreshSuccessText" :success-duration="1500">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        >
      <!-- <van-cell 
      v-for="(article,index) in list" 
      :key="index" 
      :title="article.title" /> -->
      <article-item 
        v-for="(article,index) in list" 
        :key="index"
        :article="article"
      />
      </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  // 组件名称
  name: 'ArticleList',
  // 组件参数 接收来自父组件的数据
  props: {
      channel: {
          type: Object,
          required:true
      }
  },
  // 局部注册的组件
  components: {
    ArticleItem
  },
  // 组件状态值
  data () {
    return {
      list: [],         // 存储列表数据的数组
      loading: false,   // 控制加载中 loading 状态
      finished: false,  // 控制数据加载结束的状态
      timestamp: null,   // 用于请求获取下一页数据的时间戳
      error:false, // 控制列表加载失败的提示状态
      isRefreshLoading: false, // 控制下拉刷新的 loading 状态
      refreshSuccessText:'刷新成功' // 下拉刷新成功提示文本
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
      async onLoad() {
        try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,   // 频道ID
          timestamp: this.timestamp || Date.now()     // 简单理解就是请求数据的页码，请求第一页数据: 当前最新时间戳 用于请求之后的时间戳，会在当前请求结果中返回给你
        })

        // 模拟随机失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('wdjadn')
        // }
        // 2. 把请求结果数据放到 list 数组中
        const { results } = data.data
        // 数组的展开操作符，它会把数据元素一个一个拿出来
        this.list.push(...results)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4. 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，将 finished 设置为 true，不再 load 加载更多
          this.loading = true
        }
        } catch (error) {
          // 展示错误提示状态
          this.error = true
          // 请求失败了，loading 也需要关闭
          this.loading = false
        }
    },
    // 下拉刷新的时候会触发调用该函数
    async onRefresh () {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,   // 频道ID
          timestamp: Date.now()     // 下拉刷新每次请求获取最新数据，所以传递当前最新时间戳
        })
        // 模拟随机失败的情况
        // if (Math.random() > 0.2) {
        //   JSON.parse('wdjadn')
        // }
        // 2. 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 3. 关闭下拉刷新的loading状态
        this.isRefreshLoading = false
        // 4. 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        this.isRefreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  },
}
</script> 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="less">
.article-list {
  // 百分比单位是相对于父元素的
  height: 79vh;
  overflow-y: auto;
}
</style>
