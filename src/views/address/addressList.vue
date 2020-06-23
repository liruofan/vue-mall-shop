<template>
  <div id="addresslist">
    <Header text="我的收货地址">
      <i slot="head_left" class="iconfont icon-arrow-lift" @click="$router.back()"></i>
    </Header>
    <van-address-list
      :list="filterlist"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      :switchable="false"
    />
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from 'components/header/header'
import {mapState} from 'vuex'
export default {
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['userInfo']),
    filterlist () {
      return this.userInfo.deliveryAdress.map((item,index) => {
        const {id,name,tel,province,city,county,addressDetail,isDefault} = item
        return {
          id,
          name,
          tel,
          address: province + city + county + addressDetail,
          isDefault
        }
      })

      }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onAdd () {
      this.$router.push({name:'addressedit',params:{'method':'add'}})
    },
    onEdit(item, index) {
      console.log(item.id)
      let initinfo = this.userInfo.deliveryAdress.filter(i=>{
        return i.id === item.id
      })
      initinfo = initinfo[0]
      this.$router.push({name:'addressedit',params:{id:item.id,'method':'update','initinfo':initinfo}})
    },
  },
  components: {
    Header
  }
}
</script>

<style scoped lang="stylus">
@import '~common/css/variable.styl'
#addresslist
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color $bg-gray
  z-index 200
  overflow hidden
  .icon-arrow-lift
    font-size $header-arrow-font-size
  .van-address-list
    margin-top .46rem
  .fade-enter-active, .fade-leave-active
    transition all 0.3s
  .fade-enter, .fade-leave-to
    transform translate3d(100%, 0, 0)
</style>
