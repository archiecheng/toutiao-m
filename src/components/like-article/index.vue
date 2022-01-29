<!--
 * @Author: Archie
 * @Date: 2022-01-28 21:09:56
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-29 21:26:30
 * @FilePath: /Projects/toutiao-m/src/components/like-article/index.vue
-->
<template>
  <div>
      <van-button
        :icon = "value === 1 ? 'good-job' : 'good-job-o'"
        :class="{
            liked:value === 1
        }"
        @click="onCollect"
        :loading="loading"
      />
  </div>
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  // 组件名称
  name: 'LikeArticle',
  // 组件参数 接收来自父组件的数据
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      reuqired: true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
      loading: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async onCollect () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          //   已点赞，取消点赞
          await deleteLike(this.articleId)
        } else {
          //   没有点赞，添加点赞
          await addLike(this.articleId)
          status = 1
        }
        //   更新视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('操作失败，请重试!')
      }
      this.loading = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="less">
.liked {
    .van-icon{
        color: #e5465f;
    }
}
</style>
