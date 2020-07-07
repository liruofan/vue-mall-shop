<template>
  <div ref="goodsDetail" class="goodsDetail" @touchmove.stop @scroll="scroll">
    <goodSwiper :items="goodInfo.pics"></goodSwiper>
    <div class="info">
      <span>￥{{goodInfo.goods_price}}</span>
      <div class="goodsName">{{goodInfo.goods_name}}</div>
      <div class="delivery_info">
        <span>快递:免运费</span>
        <span>月销 999件+</span>
        <span>上海市</span>
      </div>
    </div>
    <ul class="pic_list">
      <li v-for="(pic,index) in pics" :key="index">
        <img class="pic_item" :src="pic" />
      </li>
    </ul>

    <div class="icon_wrap" v-show="backIcon_show" @click="$router.back()">
      <i class="iconfont icon-arrow-lift"></i>
    </div>
    <transition name="toggle">
      <Header text="商品详情" v-show="!backIcon_show">
        <i slot="head_left" class="iconfont icon-arrow-lift" @click="$router.back()"></i>
      </Header>
    </transition>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="cart-o" text="购物车" to="/cart" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" v-if="isfavorite" @click="cancelcollection"/>
      <van-goods-action-icon icon="star" text="收藏" color="#9d9d9d" v-else @click="addcollection" />
      <van-goods-action-button @click="addGood" type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" to="/cart" />
    </van-goods-action>
  </div>
</template>

<script>
import Header from 'components/header/header'
import goodSwiper from 'components/swiper/goodSwiper'
import BScroll from '@better-scroll/core'
import {addFavoriteNum,reduceFavoriteNum,isFavorite,getGoodDetail,addCartGood} from 'api'
export default {
  props: {},
  data() {
    return {
      goodInfo: {},
      pics: [
        require('../../common/images/goodDetail1.jpg'),
        require('../../common/images/goodDetail2.jpg'),
        require('../../common/images/goodDetail3.jpg'),
        require('../../common/images/goodDetail4.jpg'),
        require('../../common/images/goodDetail5.jpg'),
        require('../../common/images/goodDetail6.jpg'),
        require('../../common/images/goodDetail7.jpg'),
        require('../../common/images/goodDetail8.jpg'),
        require('../../common/images/goodDetail9.png')
      ],
      backIcon_show: true,
      isfavorite:false,
    }
  },
  computed: {},
  created() {
    this.getGoodDetialData()
    
  },
  mounted() {},
  watch: {
    $route(to, from) {
      if (from.name === 'search' || from.name === 'cart') {
        this.$route.params.goods_id && this.getGoodDetialData()
      }
    },
    goodInfo (val) {
      this.is_favorite()
    }
  },
  methods: {
    async getGoodDetialData() {
      let goods_id = this.$route.params.goods_id
      const { message } = await getGoodDetail(goods_id)
      this.goodInfo = message[0]
    },
    async addGood () {
      let {goods_id,goods_name,goods_small_logo,goods_price} = this.goodInfo
      let query = {goods_id,goods_name,goods_small_logo,goods_price}
      this.$store.dispatch('reqAddCartGood',query)
      
    },
    async is_favorite () {
      let {goods_id} = this.goodInfo
      const {data} = await isFavorite(goods_id)
      this.isfavorite = data
    },
    scroll() {
      let scrolltop = this.$refs.goodsDetail.scrollTop
      if (scrolltop > 100) {
        this.backIcon_show = false
      } else {
        this.backIcon_show = true
      }
    },
    async addcollection () {
      let {goods_id} = this.goodInfo
      this.$toast.loading({
        message:'加载中',
        forbidClick: true,
        duration:0
      })
      await addFavoriteNum(goods_id)
      this.isfavorite = true
      this.$store.dispatch('reqAddFavorite',goods_id)
    },
    async cancelcollection () {
      let {goods_id} = this.goodInfo
      this.$toast.loading({
        message:'加载中',
        forbidClick: true,
        duration:0
      })
      await reduceFavoriteNum(goods_id)
      this.isfavorite = false
      this.$store.dispatch('reqCancelFavorite',goods_id)
      
    }
  },
  components: {
    Header,
    goodSwiper
  }
}
</script>

<style scoped lang="stylus">
@import '~common/css/variable.styl'
@import '~common/css/mixin.styl'
.goodsDetail
  position fixed
  z-index 300
  background-color #fff
  width 100%
  left 0
  top 0
  right 0
  bottom 0
  overflow scroll
  --webkit-overflow-scrolling touch
  .icon_wrap
    position fixed
    z-index 999
    top 0.1rem
    left 0.1rem
    width 0.35rem
    height 0.35rem
    display flex
    justify-content center
    align-items center
    font-size 0.3rem
    color #fff
    border-radius 50%
    background-color rgba(0, 0, 0, 0.5)
    .icon-arrow-lift
      color #fff
      font-size $header-arrow-font-size
  .icon-arrow-lift
    color #fff
    font-size $header-arrow-font-size
  .toggle-enter-active, .toggle-leave-active
    transition all 0.3s
  .toggle-enter, .toggle-leave-to
    opacity 0
  .info
    padding 0.08rem
    display flex
    flex-direction column
    border-bottom 0.05rem solid $border-gray
    & > span
      color $theme-red
      font-size 0.2rem
      font-weight bold
      margin-bottom 0.05rem
    .goodsName
      font-size 0.13rem
      line-height 0.2rem
      color $deep-font-color
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 2
      overflow hidden
      text-align justify
      margin-bottom 0.08rem
    .delivery_info
      color $font-color2
      display flex
      justify-content space-between
  .pic_list
    margin-bottom 50px
    .pic_item
      width 100%
</style>
