<!--
 * @Author: Archie
 * @Date: 2022-01-29 14:35:52
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-29 21:09:31
 * @FilePath: /Projects/toutiao-m/src/views/user-profile/index.vue
-->
<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <input
      type="file"
      hidden
      ref="file"
      @change="onFileChange"
    >
    <!-- 个人信息 -->
    <van-cell
      title="头像"
      is-link
      center
      @click="$refs.file.click()"
      >
      <van-image
        class="avatar"
        round
        fit="cover"
        :src="user.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click=" isUpdateNameShow = true"
    />
    <van-cell
      title="性别"
      :value=" user.gender === 0 ? '男' : '女' "
      is-link
      @click=" isUpdateGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click=" isUpdateBirthdayShow = true"
    />
    <!-- /个人信息 -->
    <!-- 编辑昵称 -->
    <van-popup
      style="height:100%"
      v-model="isUpdateNameShow"
      position="bottom"
    >
      <update-name
        v-if="isUpdateNameShow"
        v-model="user.name"
        @close='isUpdateNameShow = false'
      />
    </van-popup>
    <!-- /编辑昵称 -->
    <!-- 编辑性别 -->
    <van-popup
      v-model="isUpdateGenderShow"
      position="bottom"
    >
    <update-gender
      v-if="isUpdateGenderShow"
      @close="isUpdateGenderShow = false"
      v-model="user.gender"
    />
    </van-popup>
    <!-- /编辑性别 -->
    <!-- 编辑生日 -->
    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
    >
    <update-birthday
      v-if="isUpdateBirthdayShow"
      v-model="user.birthday"
      @close="isUpdateBirthdayShow = false"
    />
    </van-popup>
    <!-- /编辑生日 -->
    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height:100%"
    >
    <update-photo
      :img="img"
      @close="isUpdatePhotoShow = false"
      @update-photo="user.photo = $event"
    />
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  // 组件名称
  name: 'UserProfile',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  // 组件状态值

  data () {
    return {
      user: {}, // 个人信息
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null // 预览的图片
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created () {
    this.loadUserProfile()
  },
  // 组件方法
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        // console.log(data)
        this.user = data.data
      } catch (error) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取 blob 数据
      this.img = window.URL.createObjectURL(file)
      // 展示预览图片弹出层
      this.isUpdatePhotoShow = true
      // file-input 如果选了同一个文件不会触发change事件
      // 解决办法就是每次使用完毕，把它的value清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="less">
  .user-profile {
    .avatar {
        width: 35px;
        height: 35px;
    }
    .van-popup{
      background-color: #f5f7f9;
    }
  }
</style>
