<template>
    <div class="search-head">
<van-nav-bar right-text="搜索" left-arrow  @click-left="$router.go(-1)" @click-right='loadSearch'>
  <template #title>
  <input class="search" v-model="val" ref="inf" type="text" placeholder="请输入搜索内容">
  </template>
</van-nav-bar>
    </div>
</template>

<script>
// api
import { searchProduct } from '@/api/search'

export default {
  name: 'head-page',
  props: {
    hisval: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      val: '',
      isShow: false,
      shoplist: []
    }
  },
  created () {

  },
  mounted () {

  },
  watch: {
    hisval (val) {
      this.val = val
    }
  },
  methods: {
    async loadSearch () {
      const check = /[0-9a-zA-Z\u4e00-\u9fa5]/
      if (this.val.length !== 0 && check.test(this.val)) {
      //  执行搜索
        try {
          const { data: res } = await searchProduct({
            searchVal: this.val
          })
          if (res.code) return this.$toast.fail(res.message)
          this.shoplist = res
        } catch (error) {
          console.log(error)
          this.$toast.fail('加载失败')
        }
        this.$emit('showRes', this.shoplist, this.val)
      } else {
        this.shoplist = []
        this.$toast.fail('请输入正确的内容')
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-head{
   .search{
    width: 56vw;
    height: 26px;
    font-size: 13px;
    text-indent: 1em;
    border-radius: 20px 20px;
    outline: none;
    border: 0.5px solid #EC877B;
    letter-spacing: 0.5px;
  }
  /deep/.van-icon-arrow-left{
    color: #EC877B !important;
  }
  /deep/.van-nav-bar__text{
    color: #EC877B !important;
    font-size: 13px;
  }
}
</style>
