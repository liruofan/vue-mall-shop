<template>
    <div class="search_container">
      <div class="input" @click="$router.push('/home/search')">
      <i class="iconfont icon-fangdajing"></i>
      <span>搜索</span>
    </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
          isShow:false
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
    },
    components: {

    },
}
</script>

<style scoped lang="stylus">
@import "~common/css/variable.styl"
.search_container
  width 100%
  box-sizing border-box
  padding .05rem
  background-color $theme-red
  z-index 300
  .input
    width 100%
    background-color #fff
    height .34rem
    border-radius .05rem
    display flex
    justify-content center
    align-items center
    font-size .14rem
    color #666666
    position relative
    &:active
      opacity 0.8
    .icon-fangdajing
      margin-right .02rem
</style>
