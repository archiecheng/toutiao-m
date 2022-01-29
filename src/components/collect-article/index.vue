<!--
 * @Author: Archie
 * @Date: 2022-01-28 20:35:33
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-28 21:09:05
 * @FilePath: /Projects/toutiao-m/src/components/collect-article/index.vue
-->
<template>
        <van-button
        :icon = "value ? 'star' : 'star-o'"
        :class="{
            collected:value
        }"
        @click="onCollect"
        :loading="loading"
      />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  // 组件名称
  name: 'CollectArticle',
  // 组件参数 接收来自父组件的数据
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
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
        if (this.value) {
          //   已收藏，取消收藏
          await deleteCollect(this.articleId)
        } else {
          //   取消收藏，添加收藏
          await addCollect(this.articleId)
        }
        //   更新视图
        // 自定义事件修改数据并不是立即的
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast('操作失败，请重试')
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
.collected {
    .van-icon {
        color: #ffa500
    }
}

</style>
