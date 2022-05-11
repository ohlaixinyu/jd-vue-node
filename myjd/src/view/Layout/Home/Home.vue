<template>
    <div class="main">
      <!-- 头部组件 -->
      <home-head/>
      <!-- 主体部分--分类导航 -->
      <home-main/>
    </div>
</template>

<script>
// components
import HomeHead from '@/view/Layout//Home/components/HomeHead.vue'
import HomeMain from '@/view/Layout/Home/components/HomeMain.vue'
export default {
  name: 'home-page',
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  components: {
    HomeHead,
    HomeMain
  },
  methods: {

  }
}
</script>

<style scoped lang="less">

</style>
