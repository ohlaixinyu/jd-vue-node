<template>
    <div class="main">
      <div class="header">
        <div class="head">
        <div class="user-img"><img src="@/assets/images/addimg/730ba017c47baecc.jpg" alt=""></div>
        <div class="user-title">
          <div class="usercontent">
            <div class="username"><span>{{user.user_number}}</span><img src="@/assets/images/bai3.png" alt=""></div>
          <div class="more"><span>邮箱：{{user.user_email}}</span></div>
          </div>
        </div>
        <div></div>
      </div>
      <div class="menu">
        <div class="menu-item">
          <div>1</div>
          <div>商品收藏</div>
        </div>
        <div class="menu-item">
          <div>1</div>
          <div>店铺收藏</div>
        </div>
        <div class="menu-item">
          <div>10</div>
          <div>我的足迹</div>
        </div>
      </div>
      </div>

      <div class="main-content">
        <!-- 订单主体部分 -->
        <userDan/>
      <!-- /订单主体部分 -->

      <!-- 资产部分 -->
        <user-money/>
      <!-- /资产部分 -->

      <!-- 工具与服务 -->
        <user-tool/>
      <!-- /工具与服务 -->
      </div>
      <div class="goout"><van-button plain type="primary" @click="loginOut">退出登录</van-button></div>
      <div class="footer">

        <img src="@/assets/images/addimg/jdfooter.png" alt="">
      </div>
    </div>
</template>

<script>
// components
import userDan from '@/view/Layout/user/components/userDan.vue'
import userMoney from '@/view/Layout/user/components/userMoney.vue'
import userTool from '@/view/Layout/user/components/userTool.vue'

// api
import { getUserInfo } from '@/api/user'

export default {
  name: 'user-page',
  data () {
    return {
      user: {
        user_email: '',
        user_number: ''
      }
    }
  },
  created () {
    this.loadUser()
  },
  mounted () {

  },
  components: {
    userDan,
    userMoney,
    userTool
  },
  methods: {
    async loadUser () {
      try {
        const { data: res } = await getUserInfo()
        if (res.code) return this.$toast.fail(res.message)
        this.user = res
        console.log(res)
      } catch (error) {
        console.log(error)
        return this.$toast.fail('请先登录')
      }
    },
    // 退出登录
    loginOut () {
      window.localStorage.removeItem('JD_USER')
      this.$router.push('/login')
      window.location.reload()
    }
  }
}
</script>

<style scoped lang="less">
.main{
 .header{
   height: 160px;
   background: url('@/assets/images/userbgc.png') no-repeat;
   background-size: 100% 100%;
   background-position: center;
    .head{
    display: flex;
    width: 100vw;
    height: 90px;
    .user-img{
      flex: 1;
      position: relative;
      img{
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        width: 60px;
        border-radius: 50% 50%;
      }
    }
    .user-title{
      flex: 4;
      position: relative;
      .usercontent{
        color: #fff;
        position: absolute;
        top: 50%;
        left: 30px;
        transform: translateY(-50%);
        .username{
          font-size: 17px;
          letter-spacing: 1px;
          font-weight: bold;

          img,span{
            vertical-align: middle;
          }
          img{
            height: 18px;
            padding-left: 6px;
          }
        }
        .more{
          margin-top: 6px;
          span{
            font-size: 10px;
            margin-right: 14px;
          }
        }
      }
    }
  }
  .menu{
    display: flex;
    .menu-item{
      flex: 1;
      text-align: center;
      div{
        font-size: 13px;
        color: white;
      }
    }
  }
 }
 .main-content{
   position: relative;
   z-index: 9;
   overflow: hidden;
   margin-top: -22px;
 }
  .footer{
    margin-top: 50px;
    text-align: center;
    img{
      width: 100px;
    }
  }
  .goout{
    text-align: center;
    button{
      border-radius: 10px 10px;
      margin-top: 14px;
      width: 98%;
      border: 1px solid #FA4332;
      color: #FA4332;
    }
  }
}
</style>
