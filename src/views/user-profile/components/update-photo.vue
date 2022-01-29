<!--
 * @Author: Archie
 * @Date: 2022-01-29 19:39:57
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-29 21:16:30
 * @FilePath: /Projects/toutiao-m/src/views/user-profile/components/update-photo.vue
-->
<template>
<div class="update-photo">
      <img :src="img" class="img" ref="img">
      <div class="toolbar">
          <div class="cancel" @click="$emit('close')">取消</div>
          <div class="confirm" @click="onConfirm">完成</div>
      </div>
</div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {
  // 组件名称
  name: 'UpdatePhoto',
  // 组件参数 接收来自父组件的数据
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
      cropper: null
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created () {},
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, //
      dragMode: 'move', // 默认拖动模式
      aspectRatio: 1, // 截图比例 默认是 16 / 9
      autoCropArea: 1, // 自动截取区域
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  // 组件方法
  methods: {
    onConfirm () {
      // 基于服务端的裁切 使用 getData 方法获取裁切参数
      //   console.log(this.cropper.getData())
      // 纯客户端的裁切 使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updateUserPhoto(blob)
      })
    },
    async updateUserPhoto (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        // 如果接口要求 Content-Type 是 application/json
        // 则传递普通JavaScript对象
        // 错误的用法
        // updateUserPhoto({
        //     photo:blob
        // })

        // 如果接口要求 Content-Type 是 multipart/form-data
        // 则必须传递 FormData 对象
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserPhoto(formData)
        // 关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('update-photo', data.data.photo)
        // 提示成功
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
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
.update-photo {
    background-color: black;
    height: 100%;
    .toolbar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        .cancel, .confirm {
            width: 45px;
            height: 45px;
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
        }
    }
    .img {
        display: block;
    max-width: 100%;
    }
}
</style>
