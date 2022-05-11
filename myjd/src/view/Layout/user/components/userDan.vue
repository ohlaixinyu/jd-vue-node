<template>
    <div class="main">
      <div class="dan-item">
        <van-icon name="cart-o" size="26" color="#7D7D7D" />
        <div>待付款</div>
      </div>
      <div class="dan-item">
        <van-icon name="clock-o" size="26" color="#7D7D7D" />
        <div>待收货</div>
      </div>
      <div class="dan-item">
        <van-icon name="balance-o" size="26" color="#7D7D7D" />
        <div>退还/售后</div>
      </div>
      <div class="dan-item">
        <van-icon name="orders-o" color="#FA4332" size="26" />
        <div>全部订单</div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.main{
  padding-top: 14px;
  display: flex;
  padding-bottom: 14px;
  border-radius: 12px 12px;
  background-color: #fff;
  width: 100vw;
  .dan-item{
    flex: 1;
    text-align: center;
    div{
      font-size: 13px;
    }
  }
}
</style>
