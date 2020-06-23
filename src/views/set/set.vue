<template>
    <div id="set">
      <Header text="设置">
        <i slot="head_left" class="iconfont icon-arrow-lift" @click="$router.back()"></i>
      </Header>
      <van-cell-group class="van-group">
        <van-cell center class="van-cell" title="个人信息" is-link label="昵称、性别、收货地址" to="/profile/set/setInfo"/>
      </van-cell-group>
      <div class="loginout" @click="loginout">退出账号</div>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>
import Header from 'components/header/header'
import {diaLogConfirm} from 'base/dialog'
export default {
    props: {

    },
    data() {
        return {

        }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
      loginout () {
        diaLogConfirm({message: '确定要退出登陆吗？'},()=>{
          this.$store.dispatch('reqLoginout')
          this.$router.replace('/login')
        })
      }
    },
    components: {
      Header
    },
}
</script>

<style scoped lang="stylus">
@import '~common/css/variable.styl'
#set
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color $bg-gray
  z-index 200
  overflow hidden
  .icon-arrow-lift
    font-size $header-arrow-font-size
  .van-group
    margin-top:.54rem
  .fade-enter-active, .fade-leave-active
    transition all 0.3s
  .fade-enter, .fade-leave-to
    transform translate3d(100%, 0, 0)
  .loginout
    position absolute
    left 50%
    transform translateX(-50%)
    bottom .3rem
    width 94%
    height .4rem
    display flex
    justify-content center
    align-items center
    color #fff
    font-size .13rem
    border-radius .08rem
    background-color $theme-red
</style>
