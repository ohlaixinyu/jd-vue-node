<template>
    <div class="main">
      <div class="footer-item little"><van-icon name="shop-o" size="22" color="#FA4332"/></div>
      <div class="footer-item little"><van-icon name="chat-o"  size="22"/></div>
      <div class="footer-item little"><van-icon name="shopping-cart-o"  size="22"/></div>
      <div class="footer-item"><van-button type="primary" class="addbuy-car" color="#F8CD40" @click="addMyCart">加入购物车</van-button></div>
      <div class="footer-item"><van-button type="primary" class="buy" color="#FB464B" >领券购买</van-button></div>
    </div>
</template>

<script>
import { addBuyCar } from '@/api/buyCar'

export default {
  props: {
    shopInfo: {
      default () {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    async addMyCart () {
      if (this.shopInfo.product_id) {
        try {
          const { data: res } = await addBuyCar({
            product_id: this.shopInfo.product_id
          })
          if (res.code === 200) {
            return this.$toast.success('加购成功')
          }
          this.$toast.fail(res.message)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
*{
  vertical-align: middle;
}
  .main{
    position: fixed;
    justify-content: space-around;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    display: flex;
    .footer-item{
      text-align: center;
      flex: 1;
    }
    .little{
      flex: 0.5!important;
    }
    .addbuy-car,.buy{
      height: 34px;
      border-radius: 20px 20px;
    }
  }
</style>
