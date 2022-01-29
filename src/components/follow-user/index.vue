<!--
 * @Author: Archie
 * @Date: 2022-01-28 20:03:59
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-29 21:26:21
 * @FilePath: /Projects/toutiao-m/src/components/follow-user/index.vue
-->
<template>
      <van-button
            class="follow-btn"
            round
            size="small"
            v-if="isFollowed"
            @click="onFollow"
            :loading="loading"
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="loading"
            @click="onFollow"
          >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  // 组件名称
  name: 'FollowUser',
  // 组件参数 接收来自父组件的数据
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
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
    async onFollow () {
      try {
        // 展示关注按钮的loading状态
        this.loading = true
        if (this.isFollowed) {
          // 已关注，取消关注
          await deleteFollow(this.userId)
        } else {
          // 未关注，添加关注
          await addFollow(this.userId)
        }
        // 更新视图状态
        // this.article.is_followed = !this.article.is_followed
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (error) {
        let message = '操作失败，请重试!'
        if (error.response && error.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      // 关闭关注按钮的 loading 状态
      this.loading = false
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
