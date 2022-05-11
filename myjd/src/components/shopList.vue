<template>
    <div class="main" :class="(shoplist.length)%2==0?'':'addflex'">
      <div class="shop-item" v-for="(item,index) in shoplist" :key="index" @click="checkGoods(item.product_id)">
        <div class="shop-img"><img :src="item.product_img_url" alt=""></div>
        <div class="shop-title">{{item.product_name|subName}}</div>
        <div class="shop-price">￥{{item.product_price}}</div>
        <div class="shop-footer">
          <div class="shop-left">1万+条评论</div>
          <div class="shop-right">看相似</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'shop-list',
  props: {
    shoplist: {
      type: Array,
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
  filters: {
    subName (val) {
      return val.substring(0, 23) + '...'
    }
  },
  methods: {
    checkGoods (id) {
      this.$router.push(`/goods/${id}`)
    }
  }
}
</script>

<style scoped lang="less">
.main{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #F6F6F6;
  .shop-item{
    margin-top: 6px;
    margin-bottom: 6px;
    flex: 1;
    border-radius: 6px 6px;
    overflow: hidden;
    max-width: 180px;
    min-width: 180px;
    height: 266px;
    background-color: #fff;
    .shop-img{
      height: 170px;
      width: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .shop-title{
      text-align: left;
      padding: 2px 2px;
      font-size: 14px;
    }
    .shop-price{
      text-align: left;
      font-size: 20px;
      color: #FE4B3A;
    }
    .shop-footer{
      padding: 2px 4px;
      .shop-left{
        float: left;
        font-size: 10px;
        color: gray;
      }
      .shop-right{
        float: right;
         font-size: 10px;
        color: #000;
        padding: 2px 4px;
        border-radius: 10px 10px;
        background-color: rgb(241, 241, 241);
      }
    }
  }
  .addflex{
    &::after{
    content:'';
    flex: 1;
    min-width: 180px;
    max-width: 180px;
    height: 266px;

  }
  }

}
</style>
