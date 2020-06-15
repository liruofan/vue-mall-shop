<template>
  <nav class="nav_footer">
    <li v-for="item in navs" :key="item.title" @click="navToggle(item)">
      <img :src="current_name === item.name ? item.activeUrl : item.url" />
      <span :class="{activeClass: current_name === item.name}">{{item.title}}</span>
    </li>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      current_name: '',
      navs: [
        {
          name: 'home',
          title: '首页',
          url: require('components/navFooter/home.png'),
          activeUrl: require('components/navFooter/home_clone.png')
        },
        {
          name: 'category',
          title: '分类',
          url: require('components/navFooter/category.png'),
          activeUrl: require('components/navFooter/category_clone.png')
        },
        {
          name: 'cart',
          title: '购物车',
          url: require('components/navFooter/cart.png'),
          activeUrl: require('components/navFooter/cart_clone.png')
        },
        {
          name: 'profile',
          title: '我的',
          url: require('components/navFooter/my.png'),
          activeUrl: require('components/navFooter/my_clone.png')
        }
      ]
    }
  },
  mounted() {
    this.current_name = this.$route.fullPath.slice(1)
  },
  methods: {
    navToggle(item) {
      this.current_name = item.name
      if (this.$route.fullPath !== `/${item.name}`) {
        this.$router.push(`/${item.name}`)
      }
    }
  },
  watch: {
    $route(newRouter) {
      if (
        newRouter.name === 'home' ||
        newRouter.name === 'category' ||
        newRouter.name === 'cart' ||
        newRouter.name === 'profile'
      ) {
        this.current_name = newRouter.name
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/css/variable.styl'
.nav_footer
  height 0.55rem
  width 100%
  display flex
  position fixed
  z-index 100
  left 0
  bottom 0
  border-top 0.01rem solid $border-gray
  background-color #fff
  .activeClass
    color $theme-red
  li
    flex 1
    display flex
    flex-direction column
    align-items center
    justify-content center
    font-size 0.12rem
    img
      width 0.28rem
      margin-bottom 0.05rem
</style>
