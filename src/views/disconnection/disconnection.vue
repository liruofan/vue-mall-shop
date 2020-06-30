<template>
  <div id="disconnection">
    <van-empty image="network">
      <template #default>
        <p class="dec">网络好像开小差咯~</p>
        <p @click="refresh" class="dec2">点击刷新</p>
      </template>
    </van-empty>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {}
  },
  computed: {},
  beforeCreate() {
    if (window.navigator.onLine) {
      this.$router.replace('/home')
    }
  },
  mounted() {},
  watch: {},
  methods: {
    refresh() {
      if (window.navigator.onLine) {
        window.location.reload()
      } else {
        this.$toast.fail({
          message: '请重试'
        })
      }
    }
  },
  components: {}
}
</script>

<style scoped lang="stylus">
@import '~common/css/variable.styl'
#disconnection
  .dec
    font-size 0.18rem
    color #5f5f5f
    margin-bottom 0.2rem
    text-align center
  .dec2
    color $font-color2
    text-align center
    font-size 0.13rem
</style>
