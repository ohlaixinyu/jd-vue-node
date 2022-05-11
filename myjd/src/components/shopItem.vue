<template>
    <div class="goods-main">
      <!-- 轮播图 -->
  <div class="headimg">
  <van-swipe>
  <van-swipe-item>
    <img v-lazy="shop.product_img_url" />
  </van-swipe-item>
  </van-swipe>
  <div class="forback" @click="$router.go(-1)">
    <van-icon name="arrow-left" color="#1C1C1C"/>
  </div>
      </div>
      <!-- /轮播图 -->

      <!-- 标题 价格等 -->
      <div class="shopHead">
        <!-- 价格 优惠券-->
        <div class="shop-p1">
          <div class="p1-left">
            <span>￥</span>{{shop.product_price}}.<span>00</span>
          </div>
          <div class="p1-right">
            领券 <van-icon name="gold-coin-o" color="#FA4332" />
          </div>
        </div>
        <!-- 标题 -->
        <div class="shop-p2"><img src="@/assets/images/addimg/ziyin.png" alt="">{{shop.product_name}}</div>
      </div>

      <!-- 收获地址等信息 -->
      <shop-address/>
      <!-- /收获地址等信息 -->

      <!-- 商品详情 -->
      <shop-info :content='shop.product_detail' />
      <!-- /商品详情 -->

      <!-- 底部菜单 -->
      <shop-item-footer :shopInfo='shop'/>
      <!-- /底部菜单 -->
    </div>
</template>

<script>
// component
import shopItemFooter from '@/components/shopItemFooter.vue'
import ShopAddress from '@/components/address.vue'
import shopInfo from '@/components/shopInfo.vue'
// api
import { getProductById } from '@/api/getProduct'

export default {
  data () {
    return {
      shop: {} // 商品数据
    }
  },
  created () {
    this.loadGood()
  },
  mounted () {

  },
  components: {
    shopItemFooter,
    ShopAddress,
    shopInfo
  },
  methods: {
    async loadGood () {
      const loading = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      // 商品id
      const goodId = this.$route.params.id
      const { data: res } = await getProductById({
        product_id: goodId
      })
      if (res.code) return this.$toast.fail('加载失败')
      this.shop = res
      console.log(res)
      loading.clear()
    }
  }
}
</script>

<style scoped lang="less">
*{
    vertical-align: middle;
}
body{
   background-color: rgb(245, 245, 245);
}
.goods-main{
  background-color: rgb(245, 245, 245);
  height: auto;
  padding-bottom: 50px;
  box-sizing: border-box;
  .shopHead{
  background-color: #fff;
  width: 96%;
  margin: 5px auto;
  border-radius: 20px 20px;
  box-sizing: border-box;
  padding: 8px 8px;
  .shop-p1{
      height: 40px;
  line-height: 40px;
  padding: 2px 0;
  overflow: hidden;
    .p1-left{
      float: left;
      color: #FA4332;
      font-weight: bold;
      font-family: 'Microsoft YaHei';
      font-size: 25px;
      span{
        font-size: 16px !important;
      }
    }
    .p1-right{
      float: right;
      color: #FA4332;
    }
  }
  .shop-p2{
    letter-spacing: 1px;
    word-break: break-all;
    font-size: 16px;
    text-align: left;
    width: 100%;
    font-weight: bold;

    img{
      height: 16px;
    }
  }
}
}
.headimg{

  position: relative;
  /deep/.van-swipe{
  height: 330px;
  .van-swipe-item{
    height: 100%;
    overflow: hidden;
    img{
      height: 100%;
      width: 100%;
    }
  }
  .van-swipe__indicator--active{
    background-color: #FA4332 !important;
  }
}
.forback{
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  background-color: rgba(239, 239, 239, 0.9);
  text-align: center;
  line-height: 30px;
  border-radius: 30px 30px;

}
}

</style>
