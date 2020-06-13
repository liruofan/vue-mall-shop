<template>
<div>
<keep-alive>
  <router-view></router-view>
</keep-alive>
<nav-footer v-if="$route.meta.navfooter"></nav-footer>
</div>

</template>

<script>
import NavFooter from 'components/navFooter/navFooter'
export default {
    components: {
        NavFooter
    },
    created () {
      if (this.$route.name === 'gooddetail' || this.$route.name === 'goodlist') {
       this.$router.replace('/category')
      }
    }
}
</script>

<style lang="stylus">
</style>
