<template>
    <div id="netname">
      <Header text="修改昵称">
        <i slot="head_left" class="iconfont icon-arrow-lift" @click="$router.back()"></i>
        <span slot="head_right" class="keep" @click="keepname">保存</span>
      </Header>
      <van-field clearable class="input" maxlength="15" v-model="value" label="昵称" placeholder="请输入昵称"/>
    </div>
</template>

<script>
import Header from 'components/header/header'
export default {
    props: {

    },
    data() {
        return {
          value:this.$store.state.userInfo.netname
        }
    },
    computed: {
      
    },
    created() {
      
    },
    mounted() {
    },
    watch: {

    },
    methods: {
      keepname () {
        this.$store.dispatch('reqReviseName',this.value)
        this.$router.back()
      }
    },
    components: {
      Header
    },
}
</script>

<style scoped lang="stylus">
@import '~common/css/variable.styl'
#netname
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 200
  background-color $bg-gray
  overflow hidden
  .icon-arrow-lift
    font-size $header-arrow-font-size
  .keep
    font-size .14rem
  .input
    margin-top .46rem
    & >>> .van-field__control
      color $font-color2
</style>
