<!--
 * @Author: Archie
 * @Date: 2022-01-28 14:59:57
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-28 21:26:17
 * @FilePath: /Projects/toutiao-m/src/views/article/index.vue
-->
  <template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="头条"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <!-- /导航栏 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
          <!-- 母版中的$event是事件参数 -->
          <!-- 当我们传递给子组件的数据既要使用，还要修改
          传递: props
          修改: 定义事件
          简写方式: 在组件上使用v-model
            value="article.is_followed"
            @input="article.is_followed = $event"
            如果需要修改 v-model 的规则名称，可以通过子组件的 model 属性来配置修改
          -->
          <follow-user 
            :is-followed="article.is_followed"
            class="follow-btn"
            :user-id="article.aut_id"
            @update-is_followed="article.is_followed = $event"
          />
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
            v-if="article.is_followed"
            @click="onFollow"
            :loading="followLoading"
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="followLoading"
            @click="onFollow"
          >关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->
        <!-- 文章内容 -->
        <div 
          class="article-content markdown-body" 
          v-html="article.content"
          ref="article-content"
          ></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
          >写评论</van-button>
          <van-icon
            name="comment-o"
            badge="123"
            color="#777"
          />
          <collect-article 
            class="btn-item"
            v-model="article.is_collected"
            :article-id="article.art_id"
          />
          <like-article 
            class="btn-item"
            v-model="article.attitude"
            :article-id="article.art_id"
            />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errorStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button 
          class="retry-btn"
          @click="loadArticle"
          >点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant';
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'


export default {
  // 组件名称
  name: 'ArticleIndex',
  // 组件参数 接收来自父组件的数据
  props: {
    articleId: {
      type: [Number,String,Object],
      required: true
    }
  },
  // 局部注册的组件
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle
  },
  // 组件状态值
  data () {
    return {
      article: {}, // 文章详情
      loading:true, // 加载中的loading状态
      errorStatus: 0, // 失败的状态码
      followLoading:false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created () {
    this.loadArticle()
  },
  // 组件方法
  methods: {
    async loadArticle () {
      // 展示 loading 加载中
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
        // 初始化图片点击预览
        // 数据驱动视图这件事不是立即的
        // console.log(this.$refs['article-content'])
        setTimeout(() => {
          this.previewImage()
        }, 0);
        // 请求成功，关闭loading
        this.loading = false 
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errorStatus = 404
        }
        console.log('获取数据失败',error)
      }
      // 无论请求成功还是失败，都要关闭loading
      this.loading = false
    },
    previewImage () {
      // 得到所有的 img 节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      // 获取所有 img 地址
      const images = []
      imgs.forEach((img,index) => {
          images.push(img.src)
          // 给每个image添加点击事件，在处理函数中调用预览
          img.onclick = () => {
            ImagePreview({
              // 预览的图片地址数组
              images,
              // 起始位置，从0开始
              startPosition: index
            });
          }
      })
    },

  },
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 25px 16px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 12px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 12px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
    }

    .article-content {
      padding: 27px 16px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 100px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    /deep/.van-icon {
      font-size: 66px;
      color: #b4b4b4;
    }
    .text {
      font-size: 15px;
      color: #666666;
      margin: 15px 0 23px;
    }
    .retry-btn {
      width: 140px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #c3c3c3;
      font-size: 15px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 2px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 8px;
        background-color: #e22829;
      }
    }
  }
}
</style>
