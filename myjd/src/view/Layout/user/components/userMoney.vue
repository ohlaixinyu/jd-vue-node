<template>
    <div class="main">
      <div class="dan-item">
        <div class="num">01</div>
        <div>待付款</div>
      </div>
      <div class="dan-item">
         <div class="num">05</div>
        <div>待收货</div>
      </div>
      <div class="dan-item">
         <div class="num">00</div>
        <div>退还/售后</div>
      </div>
      <div class="dan-item">
        <van-icon name="pending-payment" color="#FA4332" size="26" />
        <div>我的资产</div>
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
  margin-top: 14px;
  display: flex;
  padding-bottom: 14px;
  border-radius: 12px 12px;
  background-color: #fff;
  width: 100vw;
  .dan-item{
    flex: 1;
    text-align: center;
    .num{
      height: 26px;
      font-size: 14px;
      font-weight: 300;
    }
    div{
      font-size: 13px;
    }
  }
}
</style>
