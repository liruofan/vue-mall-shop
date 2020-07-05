<template>
  <div class="header" :style="`background-color:${backGroundColor}`">
    <div class="head_left">
      <slot name="head_left"></slot>
    </div>
    <div class="header_center">
      <span :style="`color:${color}`">{{text}}</span>
    </div>
    <div class="head_right">
      <slot name="head_right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    backGroundColor: {
      type: String,
      default: '#eb4450'
    },
    color:{
      type: String,
      default: '#fff'
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
}
</script>

<style scoped lang="stylus">
@import '~common/css/variable.styl'
.header
  position fixed
  left 0
  top 0
  width 100%
  height 0.46rem
  box-sizing border-box
  padding 0 0.05rem
  font-size 0.16rem
  color #fff
  line-height 0.46rem
  overflow hidden
  z-index 100
  .head_left
    font-size 0.16rem
    float left
  .header_center
    position absolute
    left 50%
    transform translateX(-50%)
  .head_right
    font-size 0.16rem
    margin-right .1rem
    float right
</style>
