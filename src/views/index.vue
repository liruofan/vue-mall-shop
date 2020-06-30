<template>
  <div class="index">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <nav-footer v-if="$route.meta.navfooter"></nav-footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import NavFooter from 'components/navFooter/navFooter'
export default {
  components: {
    NavFooter
  },
  created() {
    if (this.$route.name === 'gooddetail' || this.$route.name === 'goodlist') {
      this.$router.replace('/category')
    } else if (
      this.$route.name === 'addressedit' ||
      this.$route.name === 'addresslist'
    ) {
      this.$router.replace('/profile')
    }
    this.reqUserInfo()
  },
  mounted() {},
  methods: {
    ...mapActions(['reqUserInfo'])
  }
}
</script>

<style lang="stylus">
.index
  height 100%
</style>
