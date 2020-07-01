<template>
  <div id="register">
    <div class="logo_container">
      <h1>账号注册</h1>
      <p>亲，欢迎注册账号</p>
    </div>
    <van-form class="form" @submit="register">
      <van-field
        :rules="[{pattern:/^[a-zA-Z][a-zA-Z0-9]{4,14}$/,message: '账号不能含有非法字符，必须以字母开头，长度在5-15之间'}]"
        class="input"
        v-model="username"
        clearable
        placeholder="请输入注册账号"
      />
      <van-field
        :rules="[{pattern:/^[a-zA-Z0-9]{6,15}$/,message: '密码不能含有非法字符，长度在6-15之间'}]"
        type="password"
        class="input"
        v-model="password1"
        clearable
        placeholder="请输入注册密码"
      />
      <van-field
        :rules="[{validator,message: '两次输入的密码不一致'}]"
        class="input"
        type="password"
        v-model="password2"
        clearable
        placeholder="请再次输入注册密码"
      />
      <div class="login">
        <span @click="$router.replace('/login')">前往登陆</span>
      </div>
      <van-button :disabled="loading" :loading="loading" class="login_btn">注 册</van-button>
    </van-form>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from 'components/header/header'
import { userRegister } from 'api'
import {diaLog} from 'base/dialog'
export default {
  props: {},
  data() {
    return {
      username: '',
      password1: '',
      password2: '',
      loading:false
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    async register() {
      const {username,password1} = this
      this.loading = true
      try{
        const {message} = await userRegister(username,password1)
        this.loading = false
        this.username=''
        this.password1=''
        this.password2=''
        this.$toast.success({
        message:message,
        duration:1500,
        forbidClick:true,
        onClose:()=>{
          this.$router.replace('/login')
        }
        })
      }catch(err){
        //用户名已被注册
        if (err.status === 422) {
          this.loading = false
        return diaLog({message:err.data})
        }
      }
    },
    validator () {
      const {password1,password2} = this
      return password1 === password2
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped lang="stylus">
@import '~common/css/variable.styl'
#register
  position absolute
  left 0
  top 0
  bottom 0
  right 0
  .icon-arrow-lift
    color $font-color2
    font-size $header-arrow-font-size
  .logo_container
    margin 0.7rem 0.2rem 0.5rem
    display flex
    flex-direction column
    justify-content center
    h1
      font-size 0.3rem
    p
      font-size 0.16rem
      color $font-color2
      margin-top 0.12rem
    img
      height 0.8rem
  .form
    width 100%
    box-sizing border-box
    padding 0 0.2rem
    .input
      width 100%
      box-sizing border-box
      font-size 0.16rem
      padding 0 0.05rem 0.05rem
      border-bottom 0.01rem solid $theme-red
      margin-bottom 0.25rem
      &:nth-of-type(3)
        margin 0
      input::-webkit-input-placeholder
        color $font-color2 !important
    .login
      margin-top 0.22rem
      text-align right
      color $font-color2
      font-size 0.14rem
    .login_btn
      width 100%
      height 0.45rem
      background-color $theme-red
      border-radius 0.5rem
      color #fff
      font-size 0.16rem
      margin-top 0.38rem
      box-shadow 0 0.03rem 0.04rem rgba(0, 0, 0, 0.2)
</style>
