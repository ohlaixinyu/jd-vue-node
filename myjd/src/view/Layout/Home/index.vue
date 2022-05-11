<template>
    <div class="main">
      <!-- 二级 -->
      <router-view></router-view>
      <van-tabbar v-model="active" active-color="#FC3937" style="z-index:999"   >
  <van-tabbar-item :icon="active===0?'wap-home':'wap-home-o'" to='/home'>首页</van-tabbar-item>
  <van-tabbar-item  :icon="active===1?'gift':'gift-o'" to="/buycar">新品</van-tabbar-item>
  <van-tabbar-item :icon="active===2?'bag':'bag-o'" to="/buycar">逛</van-tabbar-item>
  <van-tabbar-item  :icon="active===3?'shopping-cart':'shopping-cart-o'" to="/buycar">购物车</van-tabbar-item>
  <van-tabbar-item  :icon="active===4?'manager':'manager-o'" to="/user">我的</van-tabbar-item>
</van-tabbar>
    </div>
</template>

<script>
export default {
  name: 'home-page',
  data () {
    return {
      active: 0
    }
  },
  created () {

  },
  mounted () {

  },

  watch: {
    active (val) {
      console.log(val)
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.main{

}
</style>
