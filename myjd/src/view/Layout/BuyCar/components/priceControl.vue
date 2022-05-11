<template>
    <div class="main">
      <div class="checkAll flexbox"><input type="checkbox"><span>全选</span></div>
      <div class="show-price flexbox">
        <div class="total">总数:{{total}}元</div>
        <div class="sub">合计:{{total}}元 优惠：00.00元</div>
      </div>
      <div class="pay flexbox"><van-button type="primary" color="#FA4332">去结算</van-button></div>
    </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      require: true,
      default () {
        return []
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
  computed: {
    total () {
      const total = this.list.reduce((total, current) => {
        total += 1 * Number(current[0].product_price)
        return total
      }, 0)
      return total
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="less">

.main{
  border-top: 1px solid rgb(237, 237, 237);
  position: fixed;
  bottom: 50px;
  left: 0;
  height: 50px;
  background-color: #fff;
  width: 100vw;
  display: flex;
  div{
    text-align: center;
  }
  .checkAll{

    line-height: 50px;
    flex: 1.5;
    font-size: 14px;
    input,span{
      vertical-align: middle;
    }

  }
  .show-price{
    padding-left: 10px;
    box-sizing: border-box;
    padding-top: 6px;
    flex: 3;
    div{
      text-align: left;
    }
    .total{
      font-size: 14px;
      font-weight: bold;
    }
    .sub{
      font-size: 10px;
      color: gray;
    }
  }
  .pay{
    text-align: right;
    flex: 2;
    .van-button{
      height: 100%;

    }
  }
}
</style>
