<template>
    <div class="main">
  <van-cell title="选择" value="平台精选-自营商品" />
  <van-cell title="送至" value="四川省成都市天府新区..." />
  <van-cell title="活动" value="店铺专属秒杀" />
    </div>
</template>

<script>
export default {
  name: 'address-page',
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
  padding-top: 10px;
  border-radius: 20px 20px ;
  width: 96%;
  height: 140px;
  margin: 10px auto;
background-color: #fff;
 /deep/.van-cell__title{
    text-align: left;
    flex: 1 !important;
  }
 .van-value{
    text-align: left;
    flex: 3 !important;
  }
}
</style>
