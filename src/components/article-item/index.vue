<!--
 * @Author: Archie
 * @Date: 2022-01-27 13:46:41
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-28 15:20:51
 * @FilePath: /Projects/toutiao-m/src/components/article-item/index.vue
-->
<template>
  <van-cell
    class="article-item"
    :to="`/article/${article.art_id}`"
  >
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
            class="cover-item"
            v-for="(img,index) in article.cover.images"
            :key = "index"
          >
          <van-image
          class="cover-item-image"
            :src="img"
            fit="cover"
          />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
        <van-image
          v-if="article.cover.type==1"
          slot="default"
          class="right-cover"
          :src="article.cover.images[0]"
          fit="cover"
        />
  </van-cell>
</template>

<script>
export default {
  // 组件名称
  name: 'ArticleItem',
  // 组件参数 接收来自父组件的数据
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="less">
.article-item {
  .title {
    font-size: 14px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    padding-left: 10px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .label-info-wrap span{
    font-size: 11px;
    color: #b4b4b4;
    margin-right: 12px;
  }
  .cover-wrap {
    display: flex;
    padding: 13px 0;
    .cover-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-image {
        width: 100%;
        height: 73px;
      }
    }
  }
}

</style>
