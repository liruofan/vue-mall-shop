<template>
  <div class="goodSwiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in items" :key="index">
          <img class="img_item" :src="item.pics_mid_url" @click="check_big_pic(index)"/>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import { ImagePreview } from 'vant'
export default {
  props: {
    items: Array
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    _initSwiper() {
      this.mySwiper = new Swiper('.swiper-container', {
        autoplay: {
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
          bulletActiveClass: 'my-bullet-active'
        }
      })
    },
    check_big_pic(index) {
      ImagePreview({
        images:this.items.map((item)=>{
          return item.pics_big_url
        }),
        startPosition: index,
      })
    }
  },
  watch: {
    items(val) {
      this.$nextTick(() => {
        this._initSwiper()
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.goodSwiper
  .swiper-container
    position relative
    width 100%
    height 0
    padding-bottom 70%
    text-align center
    overflow hidden
    .img_item
      width 70%
    .swiper-pagination
      position absolute
      left 50%
      transform translateX(-50%)
      background-color rgba(0,0,0,0.4)
      color #fff
      border-radius .1rem
      width .3rem
      padding .04rem
</style>
