<template>
  <div id="profile" v-if="JSON.stringify(userInfo) !== '{}'">
    <div class="user_header">
      <div class="top_container">
        <div class="wrapper">
          <div class="port_wrap" @click="$router.push('/profile/set/setInfo')">
            <img :src="userInfo.sex === '男'? require('../../common/images/man.png') : require('../../common/images/woman.png')" />
          </div>
          <span class="name" @click="$router.push('/profile/set/setInfo')">{{userInfo.netname}}</span>
        </div>
        <span class="set" @click="$router.push('/profile/set')">
          <i class="iconfont icon-icon08"></i>
        </span>
      </div>
      <div class="bottom_container">
        <div class="sort_wrap" @click="$router.push('/profile/favorite')">
          <div class="number">{{userInfo.favorite.length}}</div>
          <span>收藏夹</span>
        </div>
        <div class="sort_wrap">
          <div class="number">0</div>
          <span>关注店铺</span>
        </div>
        <div class="sort_wrap">
          <div class="number">0</div>
          <span>足迹</span>
        </div>
        <div class="sort_wrap">
          <div class="number">0</div>
          <span>红包卡卷</span>
        </div>
      </div>
    </div>
    <div class="order_container">
      <div class="order_title">
        <span class="myorder">我的订单</span>
        <div class="checkorder">
          <span>查看全部订单</span>
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </div>
      <div class="order_con">
        <div class="order_item">
          <i class="iconfont icon-daifukuan"></i>待付款
        </div>
        <div class="order_item">
          <i class="iconfont icon-daifahuo1"></i>待发货
        </div>
        <div class="order_item">
          <i class="iconfont icon-daishouhuo"></i>待收货
        </div>
        <div class="order_item">
          <i class="iconfont icon-daipingjia"></i>待评价
        </div>
        <div class="order_item">
          <i class="iconfont icon-tuikuan1"></i>退款/售后
        </div>
      </div>
    </div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getUserInfo } from 'api'
import {mapState} from 'vuex'
export default {
  props: {},
  data() {
    return {
    }
  },
  computed:{
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped lang="stylus">
@import '~common/css/variable.styl'
@import '~common/css/mixin.styl'
#profile
  height 100%
  background-color $bg-gray
  .user_header
    width 100%
    padding 0.3rem 0.1rem 0.18rem 0.1rem
    box-sizing border-box
    background-image linear-gradient(to right, #ea8d94, #eb4450)
    .top_container
      width 100%
      position relative
      .wrapper
        display flex
        align-items center
        width 80%
        .port_wrap
          width 0.6rem
          height 0.6rem
          border-radius 50%
          display flex
          justify-content center
          align-items center
          overflow hidden
          img
            width 100%
        .name
          margin-left 0.05rem
          font-size 0.2rem
          font-weight bold
          color #fff
          ellipsis()
      .set
        position absolute
        top 0
        right 0
        .icon-icon08
          font-size 0.23rem
          color #fff
    .bottom_container
      display flex
      height 0.61rem
      .sort_wrap
        flex 1
        display flex
        flex-direction column
        align-items center
        justify-content center
        color #fff
        .number
          font-size 0.14rem
          margin-bottom 0.11rem
  .order_container
    background-color #fff
    margin 0.1rem 0.12rem
    border-radius 0.12rem
    overflow hidden
    .order_title
      height 0.38rem
      padding 0 0.12rem
      border-bottom 0.01rem solid $bg-gray
      display flex
      justify-content space-between
      align-items center
      .myorder
        font-size 0.14rem
        font-weight bold
      .checkorder
        display flex
        height 100%
        align-items center
        color $font-color2
        .icon-arrow-right
          font-size 0.2rem
    .order_con
      height 0.76rem
      display flex
      .order_item
        flex 1
        display flex
        flex-direction column
        justify-content center
        align-items center
        .iconfont
          font-size 0.25rem
          color $theme-red
          margin-bottom 0.08rem
  .fade-enter-active, .fade-leave-active
    transition all 0.3s
  .fade-enter, .fade-leave-to
    transform translate3d(100%, 0, 0)
</style>
