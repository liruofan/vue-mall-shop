<template>
  <div class="goodlist">
    <Header text="商品列表">
      <i slot="head_left" class="iconfont icon-arrow-lift" @click="$router.back()"></i>
    </Header>
    <div class="dropdown_menu">
      <div class="all_good">全部商品</div>
      <div class="price_paixu" @click="sort">
        <span class="price_sort" :class="{on:current_page.sort===1 || current_page.sort===-1}">价格排序</span>
        <span class="icon_wrap">
          <i class="iconfont icon-shaixuan-shangjiantou" :class="{on:current_page.sort===1}"></i>
          <i class="iconfont icon-shaixuan-xiajiantou" :class="{on:current_page.sort===-1}"></i>
        </span>
      </div>
    </div>
    <div class="good_list">
      <div class="pulldown-scroller" v-if="goods.length">
        <!-- 下拉刷新 -->
        <div class="pulldown-wrapper">
          <div v-show="beforePullDown">
            <span>下拉刷新</span>
          </div>
          <div v-show="!beforePullDown">
            <div v-show="isPullingDown">
              <span>
                <van-loading size=".2rem" text-size=".14rem">加载中...</van-loading>
              </span>
            </div>
            <div v-show="!isPullingDown">
              <span>刷新成功</span>
            </div>
          </div>
        </div>
        <!-- 商品列表 -->
        <ul>
          <li
            class="good_item"
            v-for="(good,index) in goods"
            :key="index"
            @click="goToGoodsDetail(good.goods_id)"
          >
            <img v-lazy="good.goods_small_logo" />
            <div class="good_info">
              <p>{{good.goods_name}}</p>
              <span>￥{{good.goods_price}}</span>
            </div>
          </li>
        </ul>
        <!-- 上拉加载 -->
        <div class="pullup-wrapper" v-if="haveproduction">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">上拉加载更多</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">
              <van-loading size=".2rem" text-size=".14rem">加载中...</van-loading>
            </span>
          </div>
        </div>
        <div class="no_data" v-else>没有更多商品了~</div>
      </div>
      <van-empty v-if="initIcon" description="暂无商品" />
    </div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from 'components/header/header'
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
import { searchGoodList } from 'api'
BScroll.use(PullDown)
BScroll.use(Pullup)

export default {
  props: {},
  data() {
    return {
      current_page: {
        cid: 5,
        pagenum: 1,
        pagesize: 10,
        sort: 0 //0 默认 1 价格从低到高 -1 价格从高到低
      },
      total: null,
      goods: [],
      beforePullDown: true,
      isPullingDown: false,
      isPullUpLoad: false,
      initIcon: false,
      isClick:true
    }
  },
  computed: {
    haveproduction() {
      let { pagenum, pagesize } = this.current_page
      let { total } = this
      return (pagenum - 1) * pagesize < total
    }
  },
  created() {
    if (!this.$route.params.cid) {
      return
    } else {
      this.current_page.cid = this.$route.params.cid
    }
    this._getListData()
  },
  mounted() {},
  watch: {},
  methods: {
    //获取数据
    async _getListData() {
      let { cid, pagenum, pagesize, sort } = this.current_page
      const { message } = await searchGoodList(cid, pagenum, pagesize, sort)
      this.current_page.pagenum += 1
      this.goods = message.goods
      if (!this.goods.length) {
        this.initIcon = true
      }
      this.total = message.total
      this.$nextTick(() => {
        this._initBscroll()
      })
    },
    //初始化better-scroll
    _initBscroll() {
      if (this.bscroll) {
        return
      }
      this.bscroll = new BScroll('.good_list', {
        scrollY: true,
        click: true,
        pullUpLoad: true,
        pullDownRefresh: {
          threshold: 70,
          stop: 56
        }
      })
      //下拉刷新
      this.bscroll.on('pullingDown', async () => {
        this.isClick = false
        this.current_page.pagenum = 1
        this.beforePullDown = false
        this.isPullingDown = true
        this.bscroll.disable()
        let { cid, pagenum, pagesize, sort } = this.current_page
        const { message } = await searchGoodList(cid, pagenum, pagesize, sort)
        this.isPullUpLoad = false
        this.bscroll.openPullUp()
        this.current_page.pagenum++
        setTimeout(() => {
          this.isPullingDown = false
          this.goods = message.goods
          this.finishPullDown()
        }, 1000)
      })
      //上拉加载
      this.bscroll.on('pullingUp', async () => {
        let { cid, pagenum, pagesize, sort } = this.current_page
        let { total } = this
        this.isClick = false
        this.bscroll.disable()
        this.isPullUpLoad = true
        if ((pagenum - 1) * pagesize > total) {
          this.isPullUpLoad = false
          this.bscroll.closePullUp()
          this.bscroll.finishPullUp()
          this.bscroll.enable()
          return
        }
        const { message } = await searchGoodList(cid, pagenum, pagesize, sort)
        this.current_page.pagenum++
        this.goods = this.goods.concat(message.goods)
        this.isPullUpLoad = false
        this.$nextTick(() => {
          this.bscroll.refresh()
          this.bscroll.finishPullUp()
          this.bscroll.enable()
          this.isClick = true
        })
      })
    },
    //下拉刷新收尾工作
    async finishPullDown() {
      await new Promise(resolve => {
        setTimeout(() => {
          this.bscroll.finishPullDown()
          resolve()
        }, 800)
      })
      setTimeout(() => {
        this.beforePullDown = true
        this.bscroll.refresh()
        this.bscroll.enable()
        this.isClick = true
      }, 800)
    },
    //商品排序
    async sort() {
      if (!this.isClick) {
        return 
      }
      this.$toast.loading({
        message: '加载中',
        forbidClick: true,
        duration: 0
      })
      this.bscroll.disable()
      let { sort } = this.current_page
      if (sort === 0) {
        this.current_page.sort = 1
        this.current_page.pagenum = 1
        let { sort, cid, pagenum, pagesize } = this.current_page
        const { message } = await searchGoodList(cid, pagenum, pagesize, sort)
        this.current_page.pagenum++
        this.goods = message.goods
      } else if (sort === 1) {
        this.current_page.sort = -1
        this.current_page.pagenum = 1
        let { sort, cid, pagenum, pagesize } = this.current_page
        const { message } = await searchGoodList(cid, pagenum, pagesize, sort)
        this.current_page.pagenum++
        this.goods = message.goods
      } else {
        this.current_page.sort = 0
        this.current_page.pagenum = 1
        let { sort, cid, pagenum, pagesize } = this.current_page
        const { message } = await searchGoodList(cid, pagenum, pagesize, sort)
        this.current_page.pagenum++
        this.goods = message.goods
      }
      this.$nextTick(() => {
        this.bscroll.scrollTo(0, 0)
        this.bscroll.refresh()
        this.bscroll.openPullUp()
      })
      this.$toast.clear()
      this.bscroll.enable()
    },
    //跳转商品详情
    goToGoodsDetail(goods_id) {
      this.$router.push({
        name: 'gooddetail',
        params: { goods_id }
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
.goodlist
  position fixed
  z-index 200
  background-color #fff
  left 0
  top 0
  right 0
  bottom 0
  .icon-arrow-lift
    color #fff
    font-size $header-arrow-font-size
  .dropdown_menu
    position fixed
    width 100%
    height 0.44rem
    top 0.46rem
    left 0
    border-bottom 0.01rem solid $border-gray
    display flex
    .all_good
      color $theme-red
    div
      flex 1
      display flex
      justify-content center
      align-items center
      font-size 0.14rem
    .price_paixu
      .icon_wrap
        display flex
        flex-direction column
        justify-content center
        .iconfont
          font-size 0.2rem
          &.on
            color $theme-red
        .icon-shaixuan-xiajiantou
          margin-top -0.11rem
      .price_sort
        &.on
          color $theme-red
  .good_list
    position absolute
    top 0.9rem
    left 0
    bottom 0
    width 100%
    padding 0 0.1rem
    box-sizing border-box
    overflow hidden
    .pulldown-wrapper
      position absolute
      width 100%
      height 0.5rem
      font-size 0.14rem
      box-sizing border-box
      transform translateY(-100%)
      display flex
      justify-content center
      align-items center
      color #999
    .good_item
      width 100%
      height 1.26rem
      border-bottom 0.01rem solid $border-gray
      display flex
      align-items center
      &:last-child
        border none
      img
        width 1rem
        margin-left 0.13rem
        margin-right 0.2rem
      .good_info
        flex 1
        height 100%
        display flex
        flex-direction column
        justify-content space-around
        font-size 0.13rem
        font-weight bold
        p
          color $deep-font-color
          line-height 0.17rem
          display -webkit-box
          overflow hidden
          -webkit-line-clamp 2
          -webkit-box-orient vertical
        span
          color $theme-red
    .pullup-wrapper
      padding 0.2rem
      text-align center
      font-size 0.14rem
      color #999
    .no_data
      padding 0.2rem
      font-size 0.14rem
      text-align center
      color #999
.fade-enter-active, .fade-leave-active
  transition all 0.3s
.fade-enter, .fade-leave-to
  transform translate3d(100%, 0, 0)
</style>
