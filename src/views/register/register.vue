<template>
  <div id="register">
    <div class="logo_container">
      <h1>账号注册</h1>
      <p>亲，欢迎注册账号</p>
    </div>
    <form class="form">
      <van-field class="input" v-model="user" clearable placeholder="请输入注册账号" />
      <van-field class="input" type="password" v-model="password1" clearable placeholder="请输入注册密码" />
      <van-field
        class="input"
        type="password"
        v-model="password2"
        clearable
        placeholder="请再次输入注册密码"
      />
      <div class="login">
        <span @click="$router.replace('/login')">前往登陆</span>
      </div>
      <button class="login_btn">注 册</button>
    </form>
  </div>
</template>

<script>
import Header from 'components/header/header'
export default {
  props: {},
  data() {
    return {
      user: '',
      password1: '',
      password2: ''
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {
    Header
  }
}
</script>

<style scoped lang="stylus">
@import '~common/css/variable.styl'
#register
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
      padding 0 0.05rem
      height 0.34rem
      border-bottom 0.01rem solid $theme-red
      margin-bottom 0.25rem
      &:nth-of-type(3)
        margin 0
      input::-webkit-input-placeholder
        color $font-color2
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
      display flex
      justify-content center
      align-items center
      color #fff
      font-size 0.16rem
      margin-top 0.38rem
      box-shadow 0 0.03rem 0.04rem rgba(0, 0, 0, 0.2)
</style>
