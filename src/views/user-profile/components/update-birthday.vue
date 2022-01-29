<!--
 * @Author: Archie
 * @Date: 2022-01-29 16:09:06
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-29 16:29:38
 * @FilePath: /Projects/toutiao-m/src/views/user-profile/components/update-birthday.vue
-->
<template>
  <div class="update-birthday">
      <!-- 
            currentDate : 双向绑定了日期选择器
                            设置日期选择器的默认值
                            同步日期选择器选择的日期
            min-date : 可选的最小日期
            max-date : 可选的最大日期
       -->
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  // 组件名称
  name: 'UpdateBirthday',
  // 组件参数 接收来自父组件的数据
  props: {
      value: {
          type:String,
          required:true
      }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
        minDate: new Date(1970, 0, 1),
        maxDate: new Date(),
        currentDate: new Date(this.value)
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
              const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
              await updateUserProfile({
                  birthday:currentDate
              })
            // 更新视图
            this.$emit('input',currentDate)
            // 关闭弹层
            this.$emit('close')
            // 提示成功
            this.$toast.success('更新成功')
          } catch (error) {
              this.$toast.fail('更新失败')
          }
      },

  }
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>

</style>
