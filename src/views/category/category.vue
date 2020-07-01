<template>
  <div class="category">
    <Header text="商品分类"></Header>
    <van-notice-bar
      v-if="notice"
      left-icon="volume-o"
      text="此项目为个人开源项目，仅'曲面电视'中有商品数据，仅供参考！"
    />
    <div class="container" :class="{hide:!pageonload}">
      <div class="left_menu">
        <ul>
          <li
            class="menu_item"
            v-for="(menuItem,index) in menu"
            :key="index"
            :class="{on:menu_index === index}"
            @click="handleMenu(index)"
          >{{menuItem}}</li>
        </ul>
      </div>
      <div class="goods_container">
        <div>
          <div
            class="goods_wrap"
            v-for="(cate,index) in category"
            :key="index"
            v-if="menu_index === index"
          >
            <div v-for="(goods,index) in cate.children" :key="index">
              <div class="title">
                <div class="line"></div>
                <span>{{goods.cat_name}}</span>
                <div class="line"></div>
              </div>
              <ul class="goods">
                <li
                  class="needsclick"
                  v-for="(good,index) in goods.children"
                  :key="index"
                  @click="$router.push({name:'goodlist',params:{cid:good.cat_id}})"
                >
                  <img class="pic_item" :src="good.cat_icon" />
                  <span>{{good.cat_name}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-loading class="vanLoading" color="#000" v-show="!pageonload" type="spinner" />
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from 'components/header/header'
import BScroll from '@better-scroll/core'
import { getGoodsCategory } from 'api'
export default {
  props: {},
  data() {
    return {
      category: [],
      menu: [],
      goods: [],
      menu_index: 0,
      pageonload: false,
      notice:true,
    }
  },
  computed: {},
  created() {
    this._getGoodsData()
  },
  deactivated () {
    this.notice = false
  },
  activated () {
    console.log('activated')
    this.notice = true
    this.menuBscroll && this.menuBscroll.refresh()
    this.goodsBscroll && this.goodsBscroll.refresh()
  },
  methods: {
    handleMenu(index) {
      if (this.menu_index === index) {
        return
      }
      this.menu_index = index
      this.$nextTick(() => {
        this.goodsBscroll.refresh()
        this.goodsBscroll.scrollTo(0, 0)
      })
    },
    _getMenu() {
      this.menu = this.category.map(item => {
        return item.cat_name
      })
    },
    _init_Menu_BScroll() {
      this.menuBscroll = new BScroll('.left_menu', {
        click: true,
        bounce: {
          top: false,
          bottom: false
        }
      })
    },
    _init_Goods_BScroll() {
      this.goodsBscroll = new BScroll('.goods_container', {
        click: true
      })
    },
    async _getGoodsData() {
      const { message } = await getGoodsCategory()
      this.category = message
      this._getMenu()
      this.$nextTick(() => {
        this._init_Menu_BScroll()
        this._init_Goods_BScroll()
        this.pageonload = true
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
.category
  .van-notice-bar
    position absolute
    top 0.46rem
    left 0
    right 0
  .container
    position absolute
    top 0.86rem
    left 0
    right 0
    bottom 0.56rem
    overflow hidden
    display flex
    &.hide
      opacity 0
    .left_menu
      flex 0 0 0.9rem
      background-color $border-gray
      .menu_item
        width 100%
        box-sizing border-box
        height 0.44rem
        display flex
        justify-content center
        align-items center
        color $font-color2
        &.on
          border-left 0.03rem solid $theme-red
          background-color #fff
          font-weight bold
          color #000
    .goods_container
      flex 1
      background-color #fff
      .goods_wrap
        height 100%
        overflow hidden
        .title
          font-size 0.14rem
          font-weight bold
          display flex
          justify-content center
          align-items center
          padding 0.15rem 0 0.1rem
          span
            margin 0 0.1rem
          .line
            height 0.01rem
            width 0.9rem
            background-color $border-gray
        .goods
          display flex
          flex-wrap wrap
          li
            width 33.33%
            box-sizing border-box
            display flex
            flex-direction column
            justify-content center
            align-items center
            height 0.9rem
          .pic_item
            width 0.55rem
            margin-bottom 0.1rem
  .vanLoading
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -100%)
  .fade-enter-active, .fade-leave-active
    transition all 0.3s
  .fade-enter, .fade-leave-to
    transform translate3d(100%, 0, 0)
</style>

