<!--
 * @Author: Archie
 * @Date: 2022-01-29 15:45:13
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-29 16:03:58
 * @FilePath: /Projects/toutiao-m/src/views/user-profile/components/update-gender.vue
-->
<template>
  <div class="update-gender">
      <van-picker
        title="性别"
        show-toolbar
        :columns="columns"
        @cancel="$emit('close')"
        @confirm="onConfirm"
        :default-index="value"
        @change="onPickerChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  // 组件名称
  name: 'UpdateGender',
  // 组件参数 接收来自父组件的数据
  props: {
      value: {
          type:Number,
          required:true
      }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
        columns: ['男', '女'],
        localGender:this.value
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
      async onConfirm () {
          try {
              this.$toast.loading({
                  message:'保存中...',
                  forbidClick:true,  // 禁止背景点击
                  duration:0 // 持续展示
              })
              const localGender = this.localGender
              await updateUserProfile({
                  gender:localGender
              })
            // 更新视图
            this.$emit('input',localGender)
            // 关闭弹层
            this.$emit('close')
            // 提示成功
            this.$toast.success('更新成功')
          } catch (error) {
              this.$toast.fail('更新失败')
          }
      },
      onPickerChange (picker,value,index) {
          this.localGender = index
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
