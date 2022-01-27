<!--
 * @Author: Archie
 * @Date: 2022-01-25 14:08:14
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-27 22:31:38
 * @FilePath: /Projects/toutiao-m/src/views/home/index.vue
-->
<template>
  <div class="home-container">
    <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" fixed>
          <van-button 
            class="search-btn"
            slot="title"
            type="info"
            size="small"
            round
            icon="search"
          >搜索</van-button>
        </van-nav-bar>
        <!-- /导航栏 -->

        <!-- 频道列表 -->
        <!-- 通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签 -->
        <van-tabs class="channel-tabs" v-model="active" animated swipeable>
          <van-tab 
            :title="channel.name"
            v-for="channel in channels"
            :key = "channel.id"
          >
          <!-- 文章列表 -->
          <article-list :channel="channel"/>
          <!-- / 文章列表 -->
          </van-tab>
          <div slot="nav-right" class="placeholder"></div>
          <div 
            slot="nav-right" 
            class="hamburger-btn" 
            @click="isChannelEditShow = true">
            <i class="toutiao toutiao-gengduo"></i>
          </div>
        </van-tabs>
        <!-- /频道列表 -->

        <!-- 频道编辑弹出层 -->
        <van-popup
          v-model="isChannelEditShow"
          closeable
          position="bottom"
          :style="{ height: '100%' }"
          close-icon-position="top-left"
        >
        <channel-edit 
          :my-channels="channels" 
          :active="active"
          @update-active="onUpdateActive"
        />
        </van-popup>
        <!-- /频道编辑弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import channelEditVue from './components/channel-edit.vue'
import { getItem } from '@/utils/storage'

export default {
  // 组件名称
  name: 'HomeIndex',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    ArticleList,
    ChannelEdit
  },
  // 组件状态值
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChannelEditShow: false // 控制编辑频道弹出层的显示状态
    }
  },
  // 计算属性
  computed: {
    ...mapState(['user'])
  },
  // 侦听器
  watch: {},
  created() {
    this.loadChannels()
  },
  // 组件方法
  methods: {
    loadChannels: async function () {
      try {
        // const { data } = await getUserChannels()
        // this.channels = data.data.channels
        let channels = []
        if (this.user) {
          // 已登录，请求获取用户列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录，判断是否有本地的频道列表数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          // 有，拿来使用
          if (localChannels) {
            channels = localChannels
          } else {
            // 没有，请求获取默认频道列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (error) {
        this.$toast('获取频道数据失败')
      }
    },
    onUpdateActive (index, isChannelEditShow = true) {
      // 更新激活的频道项
      this.active = index
      // 关闭编辑频道弹层
      this.isChannelEditShow = isChannelEditShow
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="less">
  .home-container {
    padding-top: 87px;
    padding-bottom: 50px;
    // TODO
    /deep/ .van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 275px;
      height: 32px;
      background-color: #5babfb;
      border: none;
      font-size: 14px;
      .van-icon {
        font-size: 16px;
      }
    }
    /deep/ .channel-tabs {
      .van-tabs__wrap {
        height: 41px;
        position: fixed;
        top: 46px;
        z-index: 1;
        left: 0;
        right: 0;
      }
      .van-tab {
        min-width: 100px;
        border-right: 1px solid #edeff3;
        font-size: 15px;
        color: #777777;
      }
      .van-tab--active {
        color: #333333;
      }
      .van-tabs__nav {
        padding-bottom: 0;
      }
      .van-tabs__line {
        bottom: 4px;
        width: 16px !important;
        height: 3px;
        background-color: #3296fa;
      }
      .placeholder {
        width: 33px;
        height: 41px;
        flex-shrink: 0;
      }
      .hamburger-btn {
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 33px;
        height: 41px;
        background-color: #fff;
        opacity: 0.902;
        i.toutiao {
          font-size: 16px;
        }
        &:before {
          content:"";
          position: absolute;
          left: 0;
          width: 1px;
          height: 100%;
          background: url('~@/assets/gradient-gray-line.png');
          background-size: contain;
        }
      }
    }
  }

</style>
