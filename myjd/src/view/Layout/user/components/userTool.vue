<template>
    <div class="content">
      <div class="title">工具与服务</div>
      <div class="main">
      <div class="dan-item">
        <van-icon name="service-o" size="26" color="#FA4332" />
        <div>客户服务</div>
      </div>
      <div class="dan-item">
        <van-icon name="todo-list-o" color="#7D7D7D" size="26" />
        <div>我的预约</div>
      </div>
      <div class="dan-item">
        <van-icon name="question-o" color="#7D7D7D" size="26" />
        <div>我的问答</div>
      </div>
      <div class="dan-item">
        <van-icon name="gold-coin-o" color="#7D7D7D"  size="26" />
        <div>闲置还钱</div>
      </div>
      <div class="dan-item">
        <van-icon name="replay" color="#7D7D7D" size="26" />
        <div>高价回收</div>
      </div>
    </div>
    </div>
</template>

<script>
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
.content{
  margin-top: 14px;
  .title{
    padding-left: 24px;
    height: 34px;
    line-height: 34px;
    background-color: #fff;
    border-radius: 12px 12px 0 0 ;
    font-weight: bold;
    font-size: 15px;
  }
  .main{

  display: flex;
  flex-wrap: wrap;
  padding-bottom: 14px;
  border-radius: 0 0 12px 12px;
  background-color: #fff;
  width: 100vw;
  justify-content: space-between;
  .dan-item{
    margin-top: 10px;
    flex: 1;
    min-width: 80px;
    max-width: 80px;
    text-align: center;
    div{
      font-size: 13px;
    }
  }
}
}
</style>
