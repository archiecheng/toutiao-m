<!--
 * @Author: Archie
 * @Date: 2022-01-28 10:44:29
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-28 14:20:59
 * @FilePath: /Projects/toutiao-m/src/views/search/index.vue
-->
<template>
  <div class="search-container">
      <!-- 搜索栏 -->
      <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
      <form action="/" class="search-form">
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            background="#3296fa"
            @focus = "isResultShow = false"
        />
      </form>
      <!-- /搜索栏 -->

      <!-- 搜索结果 -->
      <search-result
        v-if="isResultShow"
        :search-text="searchText"
        />
      <!-- /搜索结果 -->

      <!-- 联想建议 -->
      <search-suggestion
        v-else-if="searchText"
        :search-text="searchText"
        @search="onSearch"
        />
      <!-- /联想建议 -->

      <!-- 搜索历史记录 -->
      <search-history v-else />
      <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
export default {
  // 组件名称
  name: 'SearchIndex',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  // 组件状态值
  data () {
    return {
      searchText: '',
      isResultShow: false // 控制搜索结果的展示
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    onSearch (val) {
      this.searchText = val
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="less">
    .search-container {
      padding-top: 54px;
        .van-search__action {
            color:#fff
        }
        .search-form{
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1;
        }
    }

</style>
