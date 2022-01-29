<!--
 * @Author: Archie
 * @Date: 2022-01-25 14:09:41
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-29 14:38:17
 * @FilePath: /Projects/toutiao-m/src/views/my/index.vue
-->
<template>
  <div class="my-container">
    <!-- /已登录头部 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            :src="userInfo.photo"
            round
            fit="cover"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录头部 -->

    <!-- 未登录头部 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('./login')">
        <img src="~@/assets/mobile.png" alt="" class="mobile-image">
        <span class="text">登陆 / 注册</span>
      </div>
    </div>
    <!-- /未登录头部 -->

    <!-- 宫格导航 -->
    <van-grid :column-num="2" class="grid-nav mb-9" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /宫格导航 -->

    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      class="logout-cell"
      title="退出登陆"
      v-if="user"
      @click="onLogout"
      clickable
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  // 组件名称
  name: 'MyIndex',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  // 计算属性
  computed: {
    ...mapState(['user'])
  },
  // 侦听器
  watch: {},
  created () {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  // 组件方法
  methods: {
    onLogout: function () {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog.confirm({
        title: '确认退出吗'
      }).then(() => {
        // on confirm
        console.log('确认执行这里')
        // 确认退出: 清除登陆状态 (容器中的 user + 本地存储中的 user)
        this.$store.commit('setUser', null)
      }).catch(() => {
        // on cancel
        console.log('取消执行这里')
      })
    },
    loadUserInfo: async function () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="less">
.my-container {
  .header {
    height: 200px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-image {
        width: 61px;
        height: 61px;
        margin-bottom: 8px;
      }
      .text {
        font-size: 14px;
        color: white;
      }
    }
  }

  .user-info {
    .base-info {
      height: 130px;
      padding: 38px 16px 13px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 65px;
          height: 65px;
          margin-right: 13px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 15px;
          color: #fff;
        }
      }
      }
    .data-stats {
      display: flex;
      .data-item {
        flex: 1;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 18px;
        }
        .text {
          font-size: 11px;
        }
      }
      }
  }
  .grid-nav {
    .grid-item {
      height: 60px;
    }
    i.toutiao {
      font-size: 20px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 13px;
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
