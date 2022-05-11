<template>
    <div class="main">
       <van-nav-bar
  title="登录"
  left-arrow
  @click-left="$router.push('/')"
/>

  <!-- 表单 -->
  <div>
     <van-form>
       <van-field
    v-model="email"
    name="email"
    label="邮箱"
    placeholder="请输入邮箱"
    :rules="[{validator:checkUemail,message:'请输入正确的邮箱'}]"
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="请输入密码"
     :rules="[{validator:checkUpas,message:'请输入正确的密码'}]"
  />
  <div style="margin: 16px;">
    <van-button  plain block type="info" native-type="submit"  color="#FA4332" @click='loginUser'>登录</van-button><br>
    <van-button plain block type="info" native-type="submit"  color="#FA4332" @click="$router.push('/createUser')">去注册</van-button>
  </div>
     </van-form>
  </div>
    </div>
</template>

<script>
// api
import { login } from '@/api/user'

export default {
  name: 'login-page',
  data () {
    return {
      email: '',
      password: '',
      testEmail: [
        {
          pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
          message: '请输入正确的邮箱'
        }
      ],
      testPas: [{
        pattern: /[a-zA-Z0-9]{6,12}/,
        message: '请输入正确的密码'
      }]
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 邮箱验证
    checkUemail (val) {
      if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(val)) {
        return true
      } else {
        return false
      }
    },
    // 密码验证
    checkUpas (val) {
      if (/[a-zA-Z0-9]{6,12}/.test(val)) {
        return true
      } else {
        return false
      }
    },
    async loginUser () {
      const logobc = this.$toast.loading({
        duration: 0,
        message: '登录中',
        forbidClick: true
      })
      if (this.checkUemail(this.email) && this.checkUpas(this.password)) {
        try {
          const { data: res } = await login({
            email: this.email,
            pas: this.password
          })
          logobc.clear()
          if (res.code !== 200) return this.$toast.fail(res.message)
          this.$toast.success('登录成功')
          this.$store.commit('setUser', res.token)
          this.$router.push('/user')
          this.email = ''
          this.password = ''
        } catch (error) {
          logobc.clear()
          console.log(error)
          this.$toast.fail('登录错误')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.main{
  height: 100vh;
  background-color: #fff;
  /deep/.van-icon-arrow-left{
    color: #FA4332;
  }
}
</style>
