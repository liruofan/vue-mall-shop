<template>
  <div id="favorite"  v-if="JSON.stringify(userInfo) !== '{}'">
    <Header color="#494949" backGroundColor="#fff" text="我收藏的宝贝">
      <i slot="head_left" class="iconfont icon-arrow-lift" @click="$router.back()"></i>
      <span class="head_right" slot="head_right" @click="manage" v-show="userInfo.favorite.length">{{manageMode? '管理' : '完成'}}</span>
    </Header>
    <div class="favorite_item" v-for="(item,index) in userInfo.favorite" :key="index">
      <van-checkbox v-show="!manageMode" @click="clickSingle(item.goods_id,item.checked)" checked-color="#eb4450" v-model="item.checked"></van-checkbox>
      <img
        :src="item.goods_small_logo"
      />
      <div class="introduce">
        <span class="good_name">{{item.goods_name}}</span>
        <span class="favorite_num">{{item.hot_mumber}}人收藏</span>
        <span class="price">
          ￥<span>{{item.goods_price}}</span>
        </span>
      </div>
    </div>
    <van-empty v-show="!userInfo.favorite.length" image="search">
      <template #default>
        <p class="dec">收藏夹空空如也~</p>
        <p class="dec2">再忙，也要记得买点什么犒赏自己~</p>
      </template>
    </van-empty>
    <div class="cart_control"  v-show="userInfo.favorite.length && !manageMode">
      <van-checkbox class="all_select" checked-color="#eb4450" v-model="isAllChecked">全选</van-checkbox>
      <div class="btn" @click="deleteGood">删除</div>
    </div>
  </div>
</template>

<script>
import Header from 'components/header/header'
import { diaLogConfirm } from 'base/dialog'
import {mapState} from 'vuex'
export default {
  props: {},
  data() {
    return {
      manageMode:true
    }
  },
  computed: {
    ...mapState(['userInfo']),
    isAllChecked: {
      get() {
        return this.$store.state.userInfo.favorite.every(
          item => item.checked === true
        )
      },
      set(val) {
        console.log(val)
        this.$store.dispatch('reqFavoriteReviseAllCheck', val)
      }
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    manage () {
      this.manageMode = !this.manageMode
    },
    clickSingle (goods_id, checked) {
      let params = { goods_id, checked }
      this.$store.dispatch('reqReviseFavoriteCheck', params)
    },
    deleteGood () {
      let haveSelected = this.userInfo.favorite.some(item => item.checked === true)
      if (!haveSelected) {
        this.$toast('您还没有选择商品哦~')
        return 
      }
      diaLogConfirm({
        message:'确定要删除选中的商品吗'
      },()=>{
        this.$store.dispatch('reqDeleteFavoriteAllCheck')
      })
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped lang="stylus">
@import '~common/css/variable.styl'
@import '~common/css/mixin.styl'
#favorite
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color #fff
  z-index 200
  overflow scroll
  .icon-arrow-lift
    font-size $header-arrow-font-size
    color $font-color
  .head_right
    color $font-color
    font-size .15rem
    margin-right 0
  .favorite_item
    height 1.2rem
    display flex
    padding 0 0.16rem
    overflow hidden
    &:nth-of-type(2)
      margin-top 0.46rem
    .van-checkbox
      margin-right 0.14rem
    img
      margin-right 0.15rem
      width 1.2rem
    .introduce
      flex 1
      display flex
      flex-direction column
      justify-content space-around
      .good_name
        font-size 0.12rem
        display -webkit-box
        -webkit-line-clamp 2
        -webkit-box-orient vertical
        overflow hidden
        line-height 0.18rem
      .favorite_num
        color $font-color2
      .price
        color $theme-red
        span
          font-size 0.18rem
  .van-empty
    position absolute
    top 50%
    transform translateY(-80%)
    width 100%
    .dec
      font-size .18rem
      color #5f5f5f
      margin-bottom .16rem
      text-align center
    .dec2
      color $font-color2
      font-size .13rem
  .cart_control
    position fixed
    left 0
    bottom 0rem
    padding 0 0.15rem
    background-color #fff
    display flex
    justify-content space-between
    align-items center
    width 100%
    box-sizing border-box
    height 0.45rem
    .btn
      width .75rem
      flex 0 0 .75rem
      height 0.3rem
      color #fff
      font-size 0.13rem
      display flex
      justify-content center
      align-items center
      border-radius 0.2rem
      background-image linear-gradient(to right, #eb4450, #f5022d)
      margin-left 0.1rem
</style>
