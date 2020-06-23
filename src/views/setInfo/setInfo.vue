<template>
  <div id="setInfo">
    <Header text="个人信息">
      <i slot="head_left" class="iconfont icon-arrow-lift" @click="$router.back()"></i>
    </Header>
    <van-cell-group class="van-group">
      <van-cell
        @click="reviseusername"
        clickable
        :value="userInfo.username"
        class="van-cell"
        title="账号"
      />
      <van-cell
        :value="userInfo.netname"
        class="van-cell"
        title="昵称"
        is-link
        to="/profile/set/setInfo/revisename"
      />
      <van-cell @click="select_sex" :value="userInfo.sex" class="van-cell" title="性别" is-link />
      <van-cell class="van-cell" value="修改/添加" title="收货地址" is-link to="/profile/set/setInfo/addresslist" />
    </van-cell-group>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        class="van-picker"
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from 'components/header/header'
import { mapState } from 'vuex'
export default {
  props: {},
  data() {
    return {
      columns: ['男', '女'],
      showPicker: false
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    reviseusername() {
      this.$toast('账号不能修改哦~')
    },
    select_sex() {
      this.showPicker = true
    },
    onConfirm(value, index) {
      this.$store.dispatch('reqReviseSex', value)
      this.showPicker = false
    },
    onCancel() {
      this.showPicker = false
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped lang="stylus">
@import '~common/css/variable.styl'
#setInfo
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
  .van-group
    margin-top 0.54rem
    & >>> .van-cell:first-child
      padding-right 37px !important
  .fade-enter-active, .fade-leave-active
    transition all 0.3s
  .fade-enter, .fade-leave-to
    transform translate3d(100%, 0, 0)
</style>
