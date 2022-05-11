<template>
    <div class="main">
      <div class="shop-item" v-for="(item,index) in list" :key="index">
          <!-- 店铺 -->
          <div class="dian"><input type="checkbox"  class="check" @change='addCom($event,index,item[0].product_id)'><van-icon name="shop-o" size="16"/>京东旗舰店 <div class="left">优惠券</div></div>
          <!-- 商品 -->
          <div class="shop-main">
            <div class="shop-left">
              <img :src="item[0].product_img_url" alt="">
            </div>
            <div class="shop-right">
              <div class="title">{{item[0].product_name}}</div>
              <div class="standerd">标准规格套餐</div>
              <div class="item-control">
                <div class="price">¥{{item[0].product_price}}</div>
                <div class="num-control"><span @click="connum(index,1)">+</span><input type="number" value="1"><span @click="connum(index,-1)">-</span></div>
              </div>
              <div class="delBtn"><van-icon name="delete" size="16" color="#FA4332" @click="deleteCart(item[0].product_id)"/></div>
            </div>
          </div>
      </div>

    </div>
</template>

<script>
import { deletCart } from '@/api/buyCar'

export default {
  props: {
    list: {
      type: Array,
      require: true,
      default () {
        return [

        ]
      }
    }
  },
  data () {
    return {
      selectArr: []
    }
  },
  created () {

  },
  watch: {
    selectArr: {
      handler (val) {
        console.log(val)
      },
      deep: true
    }
  },
  mounted () {

  },

  methods: {
    connum (index, num) {
      const obj = {
        index,
        num
      }
      this.$emit('addNum', obj)
    },
    addCom (e, index, id) {
      const flag = e.target.checked
      if (flag) {
        this.selectArr.push(this.list[index])
      } else {
        this.selectArr = this.selectArr.filter((item) => {
          return item[0].product_id !== id
        })
      }
      // 传入父组件进行计算
      this.$emit('computing', this.selectArr)
    },
    // 删除购物车
    async deleteCart (id) {
      if (id) {
        try {
          const { data: res } = await deletCart({
            product_id: id
          })
          if (!res.code === 200) return this.$toast.fail(res.message)
          // 操作成功 更新视图
          this.$emit('reloadCart')
        } catch (error) {
          console.log(error)
          this.$toast.fail('操作失败')
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
  background-color: rgb(245, 245, 245);
  padding-top: 45px;
  padding-bottom: 110px;
  width: 100%;
  .shop-item{
    background-color: #fff;
    text-align: left;
    width: 90vw;
    padding: 10px 10px;
    margin:  0 auto;
    border-radius: 10px 10px;
    margin-top: 10px !important;
    .dian{
      font-size: 14px;
      font-weight: 500;
    }
    .check{
      border-radius: 20px 20px;
    }
    .left{
      float: right;
      color: #FA4332;
    }
    .shop-main{
      width: 96%;
      margin: 8px auto;
      display: flex;
      .shop-left{
        flex: 1;
        img{
          width: 100%;
        }
      }
      .shop-right{
        position: relative;
        flex: 2.5;
        padding: 2px 8px;
        .title{
          box-sizing: border-box;
          font-size: 13px;
        }
        .standerd{
          font-size: 8px;
          color: rgb(176, 176, 176);
        }
        .item-control{
          width: 100%;
          padding: 0 8px;
          padding-right: 0;
          box-sizing: border-box;
          position: absolute;
          bottom: 0;
          left: 0;
          .price{
            color: #FA4332;
            font-size: 15px;
            float: left;
          }
          .num-control{
            padding: 0!important;
            float:right;
            font-size: 15px;
            vertical-align: middle;
            input{
              width: 28px;
              height: 17px;
              outline: none;
              border: none;
              background-color: rgb(245, 245, 245);
              text-align: center;
              font-size: 12px;
              border-top: 1px solid  rgb(213, 213, 213);
              border-bottom: 1px solid  rgb(213, 213, 213);
              box-sizing: border-box;
            }
            span{
              cursor: pointer;
              display: inline-block;
              height: 17px;
              width: 20px;
              line-height: 16px;
              text-align: center;
              background-color: #fff;
              border: 1px solid rgb(213, 213, 213);
              box-sizing: border-box;
              font-weight: 300;
            }
          }
        }
        .delBtn{
          position:absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
