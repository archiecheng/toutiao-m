<!--
 * @Author: Archie
 * @Date: 2022-01-29 12:08:14
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-29 14:27:12
 * @FilePath: /Projects/toutiao-m/src/views/article/components/comment-list.vue
-->
<template>
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="已显示全部评论"
    @load="onLoad"
    :error="error"
    error-text="加载失败，请点击重试"
    :immediate-check="false"
    >
    <comment-item
        v-for="(item,index) in list"
        :key="index"
        :comment="item"
    />
    </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  // 组件名称
  name: 'CommentList',
  // 组件参数 接收来自父组件的数据
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  // 局部注册的组件
  components: {
    CommentItem
  },
  // 组件状态值
  data () {
    return {
    //   list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created () {
    this.onLoad()
  },
  // 组件方法
  methods: {
    async onLoad () {
      try {
        //   1. 请求获取数据
        const { data } = await getComments({
          type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        // 把文章评论的总数量传递到外部
        this.$emit('onload-success', data.data)
        // 3. 将loading设置为false
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
          // 有就更新获取下一页数据
          this.offset = data.data.last_id
        } else {
          // 没有就将finished设置结束
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
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
