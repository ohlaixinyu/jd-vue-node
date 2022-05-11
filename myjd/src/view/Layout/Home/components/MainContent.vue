<template>
    <div class="index-main">
      <!-- 轮播图 -->
     <van-swipe :autoplay="3000">
  <van-swipe-item v-for="(image, index) in images" :key="index">
    <img v-lazy="image" />
  </van-swipe-item>
</van-swipe>
<!-- 菜单 -->
    <div class="mainMenu">
        <div class="menu-item" v-for="(item,index) in navList" :key="index">
          <div class="img"><img :src="item.url" alt=""></div>
          <div class="title">{{item.title}}</div>
        </div>
    </div>
      <div class="mainMenu">
        <div class="menu-item" v-for="(item,index) in navList2" :key="index">
          <div class="img"><img :src="item.url" alt=""></div>
          <div class="title">{{item.title}}</div>
        </div>
    </div>
  <!-- /菜单 -->
  <!-- 京东秒杀--直播 -->
  <div class="features">
    <div class="features-item">
      <div class="features-title">
        <img src="@/assets/images/jd_skill.png" alt="">
      </div>
      <div class="features-img">
        <span>
          <img src="@/assets/images/addimg/2b54a04aeb70f282.jpg" alt="">
          </span>
          <span>
        <img src="@/assets/images/addimg/730ba017c47baecc.jpg" alt="">
          </span>
      </div>
    </div>
    <div class="features-item">
      <div class="features-title">
        <img src="@/assets/images/jd_skill.png" alt="">
      </div>
      <div class="features-img">
         <span>
          <img src="@/assets/images/addimg/d318419aec72066a.jpg" alt="">
          </span>
          <span>
        <img src="@/assets/images/addimg/e4545516f127d6c9.jpg" alt="">
          </span>
      </div>
    </div>
  </div>
   <!-- /京东秒杀--直播 -->
  <!-- 主页商品推荐 -->
  <keep-alive>
<!-- 下拉加载 -->
  <van-list
   v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  loading-text="加载中"
  @load="loadProduct"
  >
  <shop-list :shoplist="shoplist"/>
  </van-list>
<!-- /下拉加载 -->
  </keep-alive>
  <!--/ 主页商品推荐 -->
    </div>
</template>

<script>
// component
import shopList from '@/components/shopList.vue'

// api
import { getAllProduct } from '@/api/getProduct'

export default {
  name: 'main-page',
  data () {
    return {
      loading: false,
      finished: false,
      images: [
        'https://m15.360buyimg.com/mobilecms/jfs/t1/75567/8/17475/133826/6273f05eE940a4b1b/f2345362cf43bde9.jpg!cr_1053x420_4_0!q70.jpg',
        'https://m15.360buyimg.com/mobilecms/s1062x420_jfs/t1/167296/33/27587/117917/618d1270E28f1b202/c7967f2b3694d04a.jpg!cr_1053x420_4_0!q70.jpg',
        'https://m15.360buyimg.com/mobilecms/jfs/t1/75567/8/17475/133826/6273f05eE940a4b1b/f2345362cf43bde9.jpg!cr_1053x420_4_0!q70.jpg',
        'https://m15.360buyimg.com/mobilecms/s1062x420_jfs/t1/167296/33/27587/117917/618d1270E28f1b202/c7967f2b3694d04a.jpg!cr_1053x420_4_0!q70.jpg'
      ],
      // 菜单信息
      navList: [
        {
          url: require('@/assets/images/addimg/nav-sup.png'),
          title: '京东超市'
        },
        {
          url: require('@/assets/images/addimg/nav-3c.png'),
          title: '数码电器'
        },
        {
          url: require('@/assets/images/addimg/nav-y.png'),
          title: '京东服饰'
        },
        {
          url: require('@/assets/images/addimg/nav-food.png'),
          title: '京东生鲜'
        },
        {
          url: require('@/assets/images/addimg/nav-home.png'),
          title: '京东到家'
        }

      ],
      navList2: [
        {
          url: require('@/assets/images/addimg/nav-add.png'),
          title: '充值缴费'
        },
        {
          url: require('@/assets/images/addimg/nav-car.png'),
          title: '物流查询'
        },
        {
          url: require('@/assets/images/addimg/nav-price.png'),
          title: '领券'
        },
        {
          url: require('@/assets/images/addimg/nav-bu.png'),
          title: '领金贴'
        },
        {
          url: require('@/assets/images/addimg/nav-plus.png'),
          title: 'PLUS会员'
        }
      ],
      shoplist: [],
      page: 1, // 页码
      limit: 6 // 每页数据条数
    }
  },
  created () {
    this.loadProduct()
  },
  mounted () {

  },
  components: {
    shopList
  },
  methods: {
    // 拉取所有商品
    async loadProduct () {
      const { data: res } = await getAllProduct({
        page: this.page,
        limit: this.limit
      })
      if (res.code) return this.$toast.fail('加载失败')
      this.shoplist.push(...res)
      this.page++
      this.loading = false
      if (res.length === 0) {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.index-main{
  position: relative;
  z-index: 999;
  background-color: #fff;
  margin-top: -18px;
  border-radius: 10px 10px 0 0;
  width: 100%;
  color: #000;
  padding-bottom: 50px !important;
  /deep/.van-swipe{
    margin: 0 auto;
    padding-top: 10px;
    width: 96%;

  }
  /deep/.van-swipe-item{
    border-radius: 10px 10px 10px 10px;
    overflow: hidden;
    height: 140px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  //覆写轮播图焦点
  /deep/.van-swipe__indicator--active{
    background-color: #FA4332;
  }
  //菜单
  .mainMenu{
    display: flex;
    flex-wrap: wrap;
    height:80px;
    justify-content: space-around;
    background-color: #F6F6F6;
    .menu-item{
      margin-top: 5px;
      text-align: center;
      max-width: 64px;
      min-width: 64px;
      height: 56px;

      .img{
        height: 100%;
        img{
        height: 80%;
        }
      }
      .title{
        margin-top: -5px;
        font-size: 10px;
        color: rgb(68, 68, 68);
      }
    }
  }
  .features{
    width: 96%;
    margin: 10px auto;
    display: flex;
    .features-item{
      flex: 1;
      height: 120px;
      background-color: #fff;
      .features-title{
        text-align: left;
        padding-left: 3px;
        padding-top: 2px;
        font-size: 14px;
        letter-spacing: 2px;
        color: rgb(52, 52, 52);
        img{
          width: 100px;
        }
      }
      .features-img{
        height: 100%;
        span{
          img{
            width: 50%;
            height: 70%;
            transform: scale(0.8);
          }
        }
      }
    }
  }
}
</style>
