<template>
    <div class="home-head">
      <div class="main">
        <div class="head-little">
          <div class="head-little-left">好物每满300减30</div>
          <div class="head-little-right"> <span class="active">活动</span> <van-icon class='chat' name="chat-o" color="#fff" /> </div>
        </div>
        <div class="search"><input type="text" placeholder="🔍请输入想要搜索的商品" @click="$router.push('/search')"></div>

      </div>
    </div>
</template>

<script>
// components

export default {
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
  width: 100%;
  height: 110px;
  background-color: #FA4332;
  .head-little{
    padding-top: 6px;
    .head-little-left{
      float: left;
      height: 20px;
      font-size: 13px;
      line-height: 20px;
      padding:0px 8px;
      border-radius: 6px 6px;
      font-weight: bold;
      color: #FE4B3A;
      background-color: #FBE4BC;
      margin-left: 4px;
    }
    .head-little-right{
      float: right;
      padding-right: 4px;
      span{
        margin-right: 4px;
      }
    }
    .active{
      color: white;
      font-size: 13px;
      font-weight: bold;
    }
  }
  .search{
    width: 100%;
    text-align: center;
    input{
      text-indent: 1em;
      margin-top: 8px;
      width: 96%;
      outline: none;
      border: none;
      border-radius: 10px 10px;
      font-size: 13px;
      height: 28px;
    }
  }

}
</style>
