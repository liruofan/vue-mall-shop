<template>
  <div class="category">
    <Header text="商品分类"></Header>
    <div class="container" :class="{hide:!pageonload}">
      <div class="left_menu">
        <ul>
          <li class="menu_item" 
          v-for="(menuItem,index) in menu" 
          :key="index" 
          :class="{on:menu_index === index}"
          @click="handleMenu(index)"
          >
            {{menuItem}}
          </li>
        </ul>
      </div>
      <div class="goods_container">
        <div>
        <div class="goods_wrap" 
        v-for="(cate,index) in category" 
        :key="index" 
        v-if="menu_index === index">
        <div v-for="(goods,index) in cate.children" :key="index">
          <div class="title"><div class="line"></div><span>{{goods.cat_name}}</span><div class="line"></div></div>
          <ul class="goods">
            <li class="needsclick" v-for="(good,index) in goods.children" :key="index" @click="$router.push({name:'goodlist',params:{cid:good.cat_id}})">
               <img class="pic_item" :src="good.cat_icon">
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
import {getGoodsCategory} from 'api'
export default {
  props: {},
  data() {
    return {
      category:[],
      menu:[],
      goods:[],
      menu_index:0,
      pageonload:false
    }
  },
  computed: {},
  created() {
    this._getGoodsData()
  },
  mounted() {},
  watch: {},
  methods: {
    handleMenu (index) {
      if (this.menu_index === index) {
        return
      }
      this.menu_index = index
      this.$nextTick(()=>{
        this.goodsBscroll.refresh()
        this.goodsBscroll.scrollTo(0,0)
      })
    },
    _getMenu () {
      this.menu = this.category.map((item)=>{
        return item.cat_name
      })
    },
    _init_Menu_BScroll () {
      this.menuBscroll = new BScroll('.left_menu',{
        click:true,
        bounce:{
          top:false,
          bottom:false
        }
      })
    },
    _init_Goods_BScroll () {
      this.goodsBscroll = new BScroll('.goods_container',{
        click:true
      })
    },
    async _getGoodsData () {
      const {message} = await getGoodsCategory()
      this.category = message
      this._getMenu()
      this.$nextTick(()=>{
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
@import "~common/css/variable.styl"
@import "~common/css/mixin.styl"
.category
  .container
    position absolute
    top .46rem
    left 0
    right 0
    bottom .56rem
    overflow hidden
    display flex
    &.hide
      opacity 0
    .left_menu
      flex 0 0 .9rem
      background-color $border-gray
      .menu_item
        width 100%
        box-sizing border-box
        height .44rem
        display flex
        justify-content center
        align-items center
        color $font-color2
        &.on
          border-left .03rem solid $theme-red
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
          font-size .14rem
          font-weight bold
          display flex
          justify-content center
          align-items center
          padding .15rem 0 .1rem
          span
            margin 0 .1rem
          .line
            height .01rem
            width .9rem
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
            height .9rem
          .pic_item
            width .55rem
            margin-bottom .1rem
  .vanLoading
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-100%)
  .fade-enter-active,.fade-leave-active
    transition all .3s
  .fade-enter,.fade-leave-to
    transform translate3d(100%,0,0)
</style>

