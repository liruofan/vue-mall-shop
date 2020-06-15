<template>
  <div ref="home" class="home">
    <Search class="search"></Search>
    <Swiper></Swiper>
    <div class="tab_list">
      <div
        class="tab_item"
        v-for="(tab,index) in tabs"
        :key="index"
        @click="$router.replace('./category')"
      >
        <img :src="tab.image_src" />
      </div>
    </div>
    <div class="floor_container" v-for="(floor,index) in floors" :key="index">
      <div class="title_img">
        <img class="title" v-if="floors.length" :src="floor.floor_title.image_src" />
      </div>
      <div class="content_wrap">
        <div class="navgation" v-for="(pic,index) in floor.product_list" :key="index">
          <img class="con_img" :src="pic.image_src" />
        </div>
      </div>
    </div>
    <Header text="商城首页"></Header>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from 'components/header/header'
import Search from 'components/search/search'
import Swiper from 'components/swiper/swiper'
import { getCategory, getFloors } from 'api'
export default {
  data() {
    return {
      tabs: [],
      floors: []
    }
  },
  created() {
    this._initCategory()
    this._initFloors()
  },
  mounted() {},
  watch: {},
  methods: {
    async _initCategory() {
      const { message } = await getCategory()
      this.tabs = message
      this.loading = false
    },
    async _initFloors() {
      const { message } = await getFloors()
      this.floors = message
    }
  },
  components: {
    Header,
    Search,
    Swiper
  }
}
</script>

<style scoped lang="stylus">
.home
  margin-bottom 0.56rem
  .tab_list
    width 100%
    margin-top 0.1rem
    height 1.14rem
    display flex
    .tab_item
      flex 1
      text-align center
      img
        width 80%
  .floor_container
    &:last-child
      margin-bottom 0.64rem
    .title
      width 100%
      margin 0.11rem 0
      &:first-child
        margin-top 0
    .content_wrap
      width 100%
      height 0
      padding-bottom 55.46%
      margin-bottom 0.12rem
      .navgation
        float left
        box-sizing border-box
        padding 0.02rem
        width 33.33vw
        height 1.04rem
        &:nth-of-type(1)
          height 2.08rem
          padding-left 0.04rem
        &:nth-of-type(3)
          padding-right 0.04rem
        &:nth-of-type(5)
          padding-right 0.04rem
        .con_img
          width 100%
          height 100%
  .fade-enter-active, .fade-leave-active
    transition all 0.3s
  .fade-enter, .fade-leave-to
    transform translate3d(100%, 0, 0)
</style>
