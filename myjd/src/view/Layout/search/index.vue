<template>
    <div class="main">
      <!-- head -->
        <search-head @showRes='showRes' :hisval='hisval' />
      <!-- /head -->

      <!-- search-history -->
        <search-history v-if="!isShopList"  :historyList='historyList' @searchHis='searchHis' @updateHis='updateHis'/>
       <!-- /search-history -->

       <!-- search-res -->
        <shop-list :shoplist="shoplist" v-else />
      <!-- /search-res -->
    </div>
</template>

<script>
import searchHead from '@/view/Layout/search/components/head.vue'
import searchHistory from '@/view/Layout/search/components/searchHistory.vue'
import shopList from '@/components/shopList.vue'

export default {
  name: 'search-page',
  data () {
    return {
      isShopList: false,
      shoplist: [],
      historyList: JSON.parse(localStorage.getItem('his')) || [],
      hisval: ''
    }
  },
  created () {

  },
  mounted () {

  },
  components: {
    searchHead,
    searchHistory,
    shopList
  },
  methods: {
    showRes (val, his) {
      if (his.length !== 0) {
        for (let i = 0; i < this.historyList.length; i++) {
          if (this.historyList[i].indexOf(his) !== -1) {
            this.historyList.splice(i, 1)
          }
        }
        this.historyList.unshift(his)
        if (this.historyList.length >= 8) {
          this.historyList.pop()
        }
        localStorage.setItem('his', JSON.stringify(this.historyList))
      }
      if (val.length !== 0) {
        this.isShopList = true
        this.shoplist = val
      } else {
        this.isShopList = false
      }
    },
    searchHis (text) {
      this.hisval = text
    },
    updateHis () {
      this.historyList = []
    }
  }
}
</script>

<style scoped lang="less">
.main{
  min-height: 100vh;
  background-color: #fff;
}
</style>
