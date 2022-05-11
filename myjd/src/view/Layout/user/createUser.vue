<template>
    <div class="main">
    <van-nav-bar
  title="注册"
    />

  <!-- 表单 -->
  <div>
    <van-form>
       <van-field
    v-model="username"
    name="uname"
    label="用户名"
    maxlength="12"
    placeholder="请输入用户名"
    :rules="[{validator:checkUname,message:'请输入正确的用户名'}]"
  />
  <van-field
    v-model="email"
    type="text"
    name="umail"
    label="邮箱"
    placeholder="请输入邮箱"
    :rules="[{validator:checkUemail,message:'请输入正确得邮箱'}]"
  />
  <van-field
  v-model="sms"
  center
  clearable
  label="邮箱验证码"
  placeholder="请输入邮箱验证码"
   :rules="[{ validator:checkUsms, message: '请输入6位验证码' }]"
>
  <template #button>
    <van-button size="small" type="primary" color="#FA4332" @click="sendSms" :disabled='flag'>发送验证码</van-button>
  </template>
</van-field>
  <van-field
    v-model="pas"
    type="password"
    name="密码"
    label="密码"
    placeholder="请输入密码"
    maxlength="12"
    :rules="[{validator:checkUpas,message:'请输入正确的密码'}]"
  />
  <van-field
    v-model="secpas"
    type="password"
    name="密码"
    label="确认密码"
    placeholder="确认密码"
    :rules="[{validator:checkUspas,message:'请输入正确的密码'}]"
  />
   <div style="margin: 16px;">
    <van-button plain block type="info" native-type="submit" color="#FA4332" @click="createUser" >注册</van-button><br>
    <van-button plain block type="info" native-type="submit"  color="#FA4332" @click="$router.push('/login')">去登录</van-button>
  </div>
    </van-form>

  </div>
    </div>
</template>

<script>

// api
import { createUser, sendSMS } from '@/api/user'

export default {
  name: 'login-page',
  data () {
    return {
      username: '',
      email: '',
      pas: '',
      secpas: '',
      sms: '',
      flag: false,
      // 用户名校验
      testUsername: [{
        pattern: /[a-zA-Z0-9\u4e00-\u9fa5]{6,12}/,
        message: '请输入正确的用户名'
      }],
      // 邮箱校验
      testEmail: [{
        pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
        message: '请输入正确的邮箱'
      }],
      // 密码校验
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
    // 数据验证
    // 用户名
    checkUname (val) {
      if (/[a-zA-Z0-9\u4e00-\u9fa5]{6,12}/.test(val)) {
        return true
      } else {
        return false
      }
    },
    checkUemail (val) {
      if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(val)) {
        return true
      } else {
        return false
      }
    },
    checkUsms (val) {
      if (/[0-9]{6}/.test(val)) {
        return true
      } else {
        return false
      }
    },
    checkUpas (val) {
      if (/[a-zA-Z0-9]{6,12}/.test(val)) {
        return true
      } else {
        return false
      }
    },
    checkUspas (val) {
      if (val === this.pas) {
        return true
      } else {
        return false
      }
    },
    // 注册
    async createUser () {
      // 数据验证
      if (this.checkUname(this.username) && this.checkUpas(this.pas) && this.checkUspas(this.secpas) && this.checkUemail(this.email) && this.checkUsms(this.sms)) {
        const { data: res } = await createUser({
          email: this.email,
          pas: this.pas,
          sms: this.sms,
          username: this.username
        })
        if (res.code === 200) {
          this.username = ''
          this.email = ''
          this.sms = ''
          this.pas = ''
          this.secpas = ''
          return this.$toast.success('注册成功')
        }
        this.$toast.fail(res.message)
      } else {
        this.$toast.fail('请输入正确的内容')
      }
    },
    // 发送验证码
    async sendSms () {
      if (!this.checkUemail(this.email)) return this.$toast.fail('请输入正确的邮箱')
      try {
        const { data: res } = await sendSMS({
          email: this.email
        })
        if (res.code === 200) {
          this.$toast.success('发送成功')
          this.flag = true
        } else {
          this.$toast.fail(res.message)
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('未知错误')
      }
    }
  }

}

</script>

<style scoped lang="less">
.main{
  height: 100vh;
  background-color: #fff;
}
</style>
