<!--
 * @Author: Archie
 * @Date: 2022-01-27 15:55:44
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-27 22:24:26
 * @FilePath: /Projects/toutiao-m/src/views/home/components/channel-edit.vue
-->
<template>
  <div class="channel-edit">
      <van-cell :border="false">
          <div slot="title" class="title-text">我的频道</div>
          <van-button
            type="danger"
            plain
            round
            size="mini"
            class="edit-btn"
            @click="isEdit=!isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button>
      </van-cell>
      <van-grid :gutter="10" class="my-grid">
          <van-grid-item
             v-for="(channel,index) in myChannels"
             :key="index"
             class="grid-item"
             @click="onMyChannelClick(channel,index)"
           >
           <!--
               v-bind: class语法
               一个对象，对象中的 key 表示要作用的 CSS 类名
                        对象中的 value 要计算出 布尔值
                        布尔值为true，则作用该类名
                        布尔值为false，则不作用该类名
            -->
            <van-icon
                v-show="isEdit && !fixedChannels.includes(channel.id)"
                slot="icon"
                name="clear"
            ></van-icon>
           <span
                slot="text"
                class="text"
                :class="{active:index === active}"
                >{{channel.name}}</span>
           </van-grid-item>
         </van-grid>

         <!-- 频道推荐 -->
         <van-cell :border="false">
          <div slot="title" class="title-text">频道推荐</div>
            </van-cell>
            <van-grid :gutter="10" class="recommend-grid">
                <van-grid-item
                    icon="plus"
                    class="grid-item"
                    v-for="(channel,index) in recommendChannels"
                    :key="index"
                    :text="channel.name"
                    @click="onAddChannel(channel)"
                />
                </van-grid>
         <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  // 组件名称
  name: 'ChannelEdit',
  // 组件参数 接收来自父组件的数据
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      fixedChannels: [0] // 固定的频道，不允许删除
    }
  },
  // 计算属性
  computed: {
    ...mapState(['user']),
    //   recommendChannels () {
    //       const channels = []
    //       this.allChannels.forEach(channel => {
    //            // find 也是遍历数组，找到满足条件的元素项
    //           const ret = this.myChannels.find(myChannel => {
    //               return myChannel.id === channel.id
    //           })
    //         //   如果我的频道中不包括该频道项，则收集到推荐频道中
    //           if (!ret) {
    //               channels.push(channel)
    //           }
    //       })
    //       //  把计算结果返回
    //       return channels
    //   }
    // 计算属性会观测内部依赖数据的变化
    // 如果依赖的数据发生变化，则计算重新执行
    recommendChannels () {
      // 数组的 filter 方法，遍历数组，把符合条件的元素存储到新数组中并返回
      return this.allChannels.filter(channel => {
        // const channels = []
        // 数组的 find 方法: 遍历数组，把符合条件的第一个元素返回
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
  },
  // 侦听器
  watch: {},
  created () {
    this.loadAllChannels()
  },
  // 组件方法
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
        //   console.log(data)
      } catch (error) {
        this.$toast('数据获取失败')
      }
    },
    async onAddChannel (channel) {
      this.myChannels.push(channel)
      // 数据持久化处理
      if (this.user) {
        try {
          // 已登陆，把数据请求接口放到线上
          await addUserChannel({
            id: channel.id, // 频道id
            seq: this.myChannels.length// 序号
          })
        } catch (error) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        // 未登录，把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        //   1. 如果是固定频道，则不删除
        if (this.fixedChannels.includes(channel.id)) {
          return
        }
        //   2. 删除频道项
        this.myChannels.splice(index, 1)
        // 3. 如果删除的激活频道之前的频道，则更新激活的频道项
        // 参数1: 要删除的元素的索引 (包括)
        // 参数2: 删除的个数，如果不指定，则从参数1开始，一直删到最后
        if (index <= this.active) {
          // 让激活频道的索引 - 1
          this.$emit('update-active', this.active - 1, true)
        }
        // 4. 处理持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态，切换频道
        this.$emit('update-active', index)
      }
    },
    async deleteChannel (channel) {
      try {
        if (this.user) {
          //   已登录，将数据更新到线上
          await deleteUserChannel(channel.id)
        } else {
          //   未登录，则将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        this.$toast('操作失败，请稍后重试')
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
.channel-edit {
    padding: 40px 0;
    .title-text {
        font-size: 16px;
        color: #333;
    }
    .edit-btn {
        width: 52px;
        height: 24px;
        font-size: 13px;
        color: #f85959;
        border: 1px solid #f85959;
    }
    /deep/.grid-item {
        width: 80px;
        height: 43px;
        .van-grid-item__content {
            white-space: nowrap;
            background-color: #f4f5f6;
            .van-grid-item__text, .text {
                font-size: 14px;
                color: #222;
                margin-top: 0;
            }
            .active {
                color: #f85959;
            }
            .van-grid-item__icon-wrapper {
                position: unset;
            }
        }
    }
    /deep/ .my-grid {
        .grid-item {
            .van-icon-clear {
                position: absolute;
                right: -5px;
                top: -5px;
                font-size: 15px;
                color: #cacaca;
                z-index: 2;
            }
        }
    }
    /deep/.recommend-grid {
        .grid-item {
            .van-grid-item__content {
                flex-direction: row;
                .van-icon-plus {
                    font-size: 14px;
                    margin-right: 3px;
                }
            }
        }
    }

}

</style>
