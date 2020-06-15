<template>
  <div class="homeSwiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in items" :key="index">
          <img class="img_item" :src="item.image_src" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import { getSwiper } from 'api'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  props: {},
  data() {
    return {
      items: []
    }
  },
  mounted() {},
  async created() {
    this._initSwiperData()
  },
  methods: {
    async _initSwiperData() {
      const { message } = await getSwiper()
      this.items = message
      this.$nextTick(() => {
        this._initSwiper()
      })
    },
    _initSwiper() {
      this.mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          bulletActiveClass: 'my-bullet-active'
        }
      })
    }
  },
  deactivated() {
    if (this.mySwiper) {
      this.mySwiper.autoplay.stop()
    }
  },
  activated() {
    if (this.mySwiper) {
      this.mySwiper.autoplay.start()
    }
  }
}
</script>

<style lang="stylus">
.homeSwiper
  .swiper-container
    width 100%
    height 0
    padding-bottom 45.2%
    overflow hidden
    .img_item
      width 100%
    .my-bullet-active
      background-color #fff
      width 0.18rem
      border-radius 0.05rem
      opacity 0.8
</style>
