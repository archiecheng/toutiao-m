<!--
 * @Author: Archie
 * @Date: 2022-01-29 12:48:17
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-29 14:16:20
 * @FilePath: /Projects/toutiao-m/src/views/article/components/comment-item.vue
-->
<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        :icon="comment.isliking ? 'good-job' : 'good-job-o'"
        :class="{
            liked: comment.isliking
        }"
        @click="onCommentLike"
        :loading="commentLoading"
      >{{comment.like_count > 0 ? comment.like_count : '赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ comment.pubdate | relativeTime}}</span>
        <van-button
          class="reply-btn"
          round
        >{{comment.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  components: {},
  props: {
      comment: {
          type:Object,
          required:true
      }
  },
  data () {
    return {
        commentLoading:false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
      async onCommentLike () {
          this.commentLoading = true
          try {
              if (this.comment.is_liking) {
                //   已赞，取消点赞
                  await deleteCommentLike(this.comment.com_id)
                  this.comment.like_count--
              } else {
                //   没有点赞，添加点赞
                await addCommentLike(this.comment.com_id)
                this.comment.like_count++
              }
              this.comment.is_liking = !this.comment.is_liking
          } catch (error) {
              this.$toast("操作失败，请重试")
          }
          this.commentLoading = false
      }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 13px;
    }
  }
  .comment-content {
    font-size: 16px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 10px;
    color: #222;
    margin-right: 13px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 67px;
    height: 24px;
    line-height: 24px;
    font-size: 10px;
    color: #222;
  }
  .like-btn {
    height: 15px;
    padding: 0;
    border: none;
    font-size: 10px;
    line-height: 15px;
    margin-right: 4px;
    .van-icon {
      font-size: 15px;
    }
    &.liked {
        color: #e5645f;
    }
  }
}
</style>