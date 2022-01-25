<!--
 * @Author: Archie
 * @Date: 2022-01-24 16:53:54
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-25 15:52:12
 * @FilePath: /Projects/toutiao-m/src/views/login/index.vue
-->
<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar title="登陆" class="page-nav-bar">
          <van-icon name="cross" slot="left" @click="$router.back()"/>
        </van-nav-bar>
        <!-- /导航栏 -->

        <!-- 登陆表单 -->
        <!-- 表单验证:
          1、给 van-field 组件配置 rules 验证规则
              参考文档:https://youzan.github.io/vant/#/zh-CN/form#rule-shu-ju-jie-gou
          2、当表单提交的时候会自动触发表单验证
              如果验证通过，会触发 submit 事件
              如果验证失败，不会触发 submit
         -->
        <van-form @submit="onSubmit" ref="loginForm">
        <van-field
            v-model="user.mobile"
            name="mobile"
            placeholder="请输入手机号"
            :rules="userFormRules.mobile"
            type="number"
            maxlength="11"
        >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>

        <van-field
        v-model="user.code"
            name="code"
            placeholder="请输入验证码"
            :rules="userFormRules.code"
            type="number"
            maxlength="6"
        >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- time: 倒计时事件 -->
            <van-count-down
              v-if="isCountDownShow"
              :time="1000 * 60"
              format="ss s"
              @finish="isCountDownShow = false"
              />
            <van-button
              v-else
              size="small"
              type="default"
              class="send-msm-btn"
              round
              @click="onSendSms"
              native-type="button">发送验证码</van-button>
        </template>
        </van-field>
        <div class="login-btn-wrap">
            <van-button block type="info" native-type="submit" class="login-btn">登陆</van-button>
        </div>
        </van-form>
        <!-- /登陆表单 -->
    </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'loginIndex',
  data: function () {
    return {
      user: {
        mobile: '13811111111', // 手机号
        code: '246810' // 验证码
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false // 是否展示倒计时
    }
  },

  methods: {
    onSubmit: async function () {
      // 1. 获取表单数据
      const user = this.user
      // 2. 表单验证
      // 在组件中必须通过 this.$toast 来调用 Toast 组件
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认是 2000，如果为 0 ， 则持续展示
      })
      // 3. 提交表单请求登陆
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登陆成功')
        // 登陆成功，跳转回原来页面
        // back 的方式不严谨，后面讲功能优化的时候再说
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登陆失败,请稍后重试')
        }
      }
    },
    // 4. 根据请求响应结果处理后续操作
    onSendSms: async function () {
      console.log('onSendSms')
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (error) {
        return console.log('验证失败', error)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true

      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }

}
</script>
<style lang="less" scoped>
.login-container {
    .toutiao {
        font-size: 24px;
    }
    .send-sms-btn {
        width: 152px;
        height: 40px;
        line-height: 40px;
        background-color: #ededed;
        font-size: 16px;
        color: #666;
    }
    .login-btn-wrap{
        padding: 33px 13px;
    }
    .login-btn{
        background-color: #6db4fb;
        border: none;
    }
}
</style>
