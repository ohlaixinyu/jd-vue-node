<template>
    <div class="main">
      <van-nav-bar
  title="购物车"
/>

      <!-- 商品列表 -->
      <shop-list :list="list" @addNum='addNum' @computing='computing' @reloadCart='loadBuyCar'/>
      <!-- /商品列表 -->

      <!-- 底部控件 -->
      <price-control :list='checkList'/>
      <!-- /底部控件 -->

    </div>
</template>

<script>
import ShopList from '@/view/Layout/BuyCar/components/ShopList.vue'
import priceControl from '@/view/Layout/BuyCar/components/priceControl.vue'

// api
import { getBuyCar } from '@/api/buyCar'

export default {
  name: 'buy-car',
  data () {
    return {
      list: [],
      checkList: []
    }
  },
  created () {
    this.loadBuyCar()
  },
  mounted () {

  },
  components: {
    ShopList,
    priceControl
  },

  methods: {
    addNum (obj) {
      const currentcount = this.list[obj.index].count
      if (currentcount === 1 && obj.num === -1) {
        return this.$toast.fail('数量最低为 1')
      }
      this.list[obj.index].count += obj.num
    },
    // 选择商品计算
    computing (obj) {
      this.checkList = obj
    },
    // 加载购物车商品
    async loadBuyCar () {
      try {
        const { data: res } = await getBuyCar()
        if (res.length === 0) return this.$toast.fail('没有数据')
        this.list = res
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.main{
  .head{
    text-align: center !important;
  }
  /deep/.van-icon-arrow-left{
    color: #FA4332;
  }
  .van-nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
