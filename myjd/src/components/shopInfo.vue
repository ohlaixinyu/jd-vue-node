<template>
    <div class="main">
      <van-cell title='商品详情'/>
      <div class="content">
        {{content}}
      </div>
    </div>
</template>

<script>
export default {
  props: {
    content: {
      default () {
        return '商品详情'
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
  methods: {

  }
}
</script>

<style scoped lang="less">
.main{
  background-color: #fff;
  .content{
    padding: 10px 10px;
    text-align: left;
    font-size: 13px;
  }
}
</style>
