<template>
    <div class="main">
       <div class="category">
          <van-tabs v-model="active" class="currentTab" background='#FA4332' color="#FA4332" @click="getProduct" >
            <!-- 分类组件 -->
        <van-tab title="首页">
          <keep-alive>
          <main-content/>
          </keep-alive>
        </van-tab>
        <van-tab v-for="item in catelist" :key="item.category_id" :name='item.category_id' :title="item.category_name">
          <shop-list :shoplist="shoplist"/>
        </van-tab>

</van-tabs>
        </div>
    </div>
</template>

<script>
// component
import MainContent from '@/view/Layout/Home/components/MainContent.vue'
import shopList from '@/components/shopList.vue'

// api
import { getCateAll, getProductById } from '@/api/getCateGory'

export default {
  data () {
    return {
      catelist: [],
      active: '',
      shoplist: []
    }
  },
  created () {
    this.loadAllCate()
  },
  mounted () {

  },
  components: {
    MainContent,
    shopList
  },
  methods: {
    // 拉取商品分类
    async loadAllCate () {
      const { data: res } = await getCateAll()
      if (res.code) {
        return this.$toast.fail('加载失败')
      }
      this.catelist = res
    },
    // 根据分类id获取对应的商品
    async getProduct (name) {
      if (name.length === 0 || !name) {
        this.shoplist = []
        return
      }
      const { data: res } = await getProductById({
        cate_id: name
      })
      if (res.code) {
        this.shoplist = []
        return this.$toast.fail('无数据')
      }
      this.shoplist = res
    }
  }

}
</script>

<style scoped lang="less">
.main{
   .category{
     /deep/.van-tab{
       height: 38px;
     }
     background-color: #fff;
     margin-top: -48px;
    /deep/.van-tab__text{
      color: white;
      font-size: 17px;
    }
    /deep/.van-tab--active{
       .van-tab__text{
         font-weight: bold;
       }
    }
    .currentTab{
      /deep/.van-tabs__content{
        padding-top: 10px;
      }
    }
  }
}
</style>
