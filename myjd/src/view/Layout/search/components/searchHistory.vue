<template>
    <div class="search-history">
      <div class="search-his-title">
        <span class="his-title-left">搜索历史</span>
        <span class="his-title-right"><van-icon name="delete-o" size="16" @click="delHis"/></span>
      </div>
      <div class="his-list">
        <div class="list-item" v-for="(item,index) in historyList" :key="index" @click="searchgo(item)">{{item}}</div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    historyList: {
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
  methods: {
    searchgo (text) {
      this.$emit('searchHis', text)
    },
    // 删除搜索历史
    delHis () {
      localStorage.removeItem('his')
      // 更新视图
      this.$emit('updateHis')
    }
  }
}
</script>

<style scoped lang="less">
.search-history{
  box-sizing: border-box;
  .search-his-title{
    padding-left: 20px;
    padding-top: 10px;
    font-size: 14px;
    box-sizing: border-box;
    .his-title-left{
      float: left;
      padding-top: 10px;
    }
    .his-title-right{
      padding-right: 20px;
    padding-top: 10px;
    box-sizing: border-box;
      float: right;
    }
  }
  .his-list{
    width: 100vw;
    height: auto;
    padding: 10px 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .list-item{
      color: rgb(58, 58, 58);
      box-sizing: border-box;
      padding: 4px 6px;
      border: 1px solid rgb(240, 240, 240);
      border-radius: 20px 20px;
      font-size: 13px;
      margin: 4px 4px;
    }
  }
}
</style>
