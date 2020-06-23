<template>
  <div id="login">
    <Header backGroundColor="#fff">
      <i slot="head_left" class="iconfont icon-arrow-lift" @click="$router.replace('/home')"></i>
    </Header>
    <div class="logo_container">
      <img src="../../common/images/taologo.png" />
    </div>
    <form class="form" @submit.prevent="login">
      <van-field class="input" v-model="username" clearable placeholder="请输入登陆账号" />
      <van-field
        class="input"
        v-if="closeEye"
        @click="handleClick"
        type="password"
        right-icon="closed-eye"
        v-model="password"
        clearable
        placeholder="请输入登陆密码"
      />
      <van-field
        class="input"
        v-else
        @click="handleClick"
        type="text"
        right-icon="eye-o"
        v-model="password"
        clearable
        placeholder="请输入登陆密码"
      />
      <!-- <input class="input" type="text" placeholder="请输入登陆账号">
      <input class="input" type="text" placeholder="请输入登陆密码">-->
      <div class="register">
        <span @click="$router.replace('/register')">免费注册</span>
      </div>
      <van-button hairline :disabled="loading" :loading="loading" class="login_btn">登 陆</van-button>
    </form>
  </div>
</template>

<script>
import Header from 'components/header/header'
import {userLogin} from 'api'
import {diaLog} from 'base/dialog'
export default {
  props: {},
  data() {
    return {
      username: '',
      password:'',
      closeEye:true,
      loading:false
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    handleClick(e) {
      let closeIcon = document.getElementsByClassName('van-icon-closed-eye')[0]
      let openIcon = document.getElementsByClassName('van-icon-eye-o')[0]
      if (e.target === closeIcon) {
        this.closeEye = false
      } else if (e.target === openIcon) {
        this.closeEye = true
      }
    },
    async login () {
      const {username,password} = this
      if (!username.trim()) {
        return diaLog({message:'用户名不能为空'})
      }else if (!password.trim()) {
        return diaLog({message:'密码不能为空'})
      }
      this.loading = true
      const result = await userLogin(username,password)
       if (result.status === 422) {
        this.loading = false
        return diaLog({message:result.message})
       }
       this.username = ''
       this.password = ''
       this.loading = false
       const {token} = result.message
       localStorage.setItem('token',token)
       this.$store.dispatch('reqUserInfo')
       this.$router.replace('/profile')
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped lang="stylus">
@import '~common/css/variable.styl'
#login
  .icon-arrow-lift
    color $font-color2
    font-size $header-arrow-font-size
  .logo_container
    margin 0.5rem 0 0.36rem
    height 0.8rem
    text-align center
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
      height 0.34rem
      border-bottom 0.01rem solid $theme-red
      margin-bottom 0.38rem
      &:nth-of-type(2)
        margin 0
      .van-icon
        font-size 0.2rem
      input::-webkit-input-placeholder
        color $font-color2
    .register
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
