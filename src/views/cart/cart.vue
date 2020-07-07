<template>
  <div ref="cart" id="cart" v-if="JSON.stringify(userInfo) !== '{}'">
    <div class="header_bg">
      <div class="cart_title">
        <span class="cart">购物车</span>
        <span
          class="manage"
          @click="manage"
          v-show="userInfo.cart.length"
        >{{manageMode? '完成' : '管理'}}</span>
      </div>
      <div
        v-show="userInfo.cart.length"
        class="delivery_address"
      >共{{cartGoodNum?cartGoodNum:0}}件宝贝 收货地址：{{defaultAddress}}</div>
      <div
        class="good_item"
        v-for="(good,index) in userInfo.cart"
        :key="index"
        v-show="userInfo.cart.length"
        @click="goDetail(good.good_id,index,$event)"
      >
        <van-checkbox
          checked-color="#eb4450"
          v-model="good.checked"
          @click="clickSingle(good.good_id,good.checked)"
        ></van-checkbox>
        <img :src="good.img_url" />
        <div class="introduce">
          <span class="good_name">{{good.good_name}}</span>
          <div class="good_price">
            <span>￥{{good.good_price}}</span>
            <van-stepper
              :integer="true"
              @change="((value,detail)=>reviseCount(value,detail,good.good_id))"
              v-model="good.count"
              :max="999"
              :min="1"
              @overlimit="disreduce(good.count)"
              @focus="focus(index)"
              @blur="blur"
            />
          </div>
        </div>
      </div>
    </div>
    <van-empty v-show="!userInfo.cart.length" image="search">
      <template #default>
        <p class="dec">购物车竟然是空的</p>
        <p class="dec2">再忙，也要记得买点什么犒赏自己~</p>
      </template>
    </van-empty>
    <div class="cart_control" v-show="userInfo.cart.length">
      <van-checkbox class="all_select" checked-color="#eb4450" v-model="isAllChecked">全选</van-checkbox>
      <div class="right_wrap">
        <div class="total_wrap" v-show="!manageMode">
          合计：
          <div class="total">￥{{totalPrice}}</div>
        </div>
        <div class="btn" v-show="!manageMode">结算({{totalNum}})</div>
        <div class="btn_delete" @click="deleteGood" v-show="manageMode">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { diaLogConfirm } from 'base/dialog'

export default {
  props: {},
  data() {
    return {
      disStepChange: false,
      manageMode: 0,
      isEmpty: false
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['cartGoodNum', 'totalPrice', 'totalNum']),
    defaultAddress() {
      let { deliveryAdress } = this.userInfo
      let haveDefault = deliveryAdress.some(item => {
        return item.isDefault === true
      })
      if (haveDefault) {
        for (let i = 0; deliveryAdress.length; i++) {
          if (deliveryAdress[i].isDefault === true) {
            if (deliveryAdress[i].province === deliveryAdress[i].city) {
              return (
                deliveryAdress[i].province +
                deliveryAdress[i].county +
                deliveryAdress[i].addressDetail
              )
            } else {
              return (
                deliveryAdress[i].province +
                deliveryAdress[i].city +
                deliveryAdress[i].county +
                deliveryAdress[i].addressDetail
              )
            }
          }
        }
      } else {
        return '尚未设置收货地址'
      }
    },
    isAllChecked: {
      get() {
        return this.$store.state.userInfo.cart.every(
          item => item.checked === true
        )
      },
      set(val) {
        this.$store.dispatch('reqReviseAllCheck', val)
      }
    }
  },
  methods: {
    reviseCount(count, detail, good_id) {
      let params = { good_id, count }
      if (count == '') {
        return
      }
      if (this.disStepChange === false) {
        this.$store.dispatch('reqReviseCount', params)
      }
    },
    disreduce(count) {
      if (count === 999) {
        this.$toast('该宝贝不能增加了呦~')
      } else {
        this.$toast('该宝贝不能减少了呦~')
      }
    },
    focus(index) {
      let dom = document.getElementsByClassName('van-stepper__input')[index]
      if (!dom.getAttribute('maxlength')) {
        dom.setAttribute('maxlength', 3)
      }
      this.disStepChange = true
    },
    blur(event) {
      this.disStepChange = false
    },
    clickSingle(good_id, checked) {
      let params = { good_id, checked }
      this.$store.dispatch('reqReviseCheck', params)
    },
    manage() {
      this.manageMode = !this.manageMode
    },
    deleteGood() {
      let haveSelected = this.userInfo.cart.some(item => item.checked === true)
      if (!haveSelected) {
        this.$toast('您还没有选择商品哦~')
        return
      }
      diaLogConfirm(
        {
          message: '确定要删除选中的商品吗'
        },
        () => {
          this.$store.dispatch('reqDeleteAllCheck')
        }
      )
    },
    goDetail(good_id, index, event) {
      let vanIconSuccessDom = document.getElementsByClassName(
        'van-icon-success'
      )[index]
      let vanCheckbox = document.getElementsByClassName('van-checkbox')[index]
      let vanStepperMinus = document.getElementsByClassName(
        'van-stepper__minus'
      )[index]
      let vanStepperInput = document.getElementsByClassName(
        'van-stepper__input'
      )[index]
      let vanStepperPlus = document.getElementsByClassName('van-stepper__plus')[
        index
      ]
      if (
        event.target === vanIconSuccessDom ||
        event.target === vanCheckbox ||
        event.target === vanStepperMinus ||
        event.target === vanStepperInput ||
        event.target === vanStepperPlus
      ) {
        return
      }
      this.$router.push({
        name: 'gooddetail',
        params: { goods_id: good_id }
      })
    }
  },
  components: {}
}
</script>

<style scoped lang="stylus">
@import '~common/css/variable.styl'
@import '~common/css/mixin.styl'
#cart
  .header_bg
    height 1.5rem
    background-color $theme-red
    padding 0 0.1rem
    .cart_title
      display flex
      color #fff
      align-items center
      justify-content space-between
      padding 0.18rem 0
      .cart
        font-size 0.23rem
      .manage
        font-size 0.15rem
    .delivery_address
      width 75%
      height 0.18rem
      line-height 0.18rem
      color #fff
      font-size 0.13rem
      margin-bottom 0.21rem
      ellipsis()
    .good_item
      height 1rem
      margin 0 auto
      background-color #fff
      border-radius 0.15rem
      margin-bottom 0.15rem
      box-shadow 0 0 0.1rem rgba(0, 0, 0, 0.1)
      display flex
      padding 0 0.2rem
      overflow hidden
      &:last-child
        margin-bottom 1.29rem
      .van-checkbox
        margin-right 0.14rem
      img
        margin-right 0.15rem
        width 0.9rem
      .introduce
        flex 1
        display flex
        flex-direction column
        justify-content space-around
        .good_name
          font-size 0.12rem
          display -webkit-box
          -webkit-line-clamp 2
          -webkit-box-orient vertical
          overflow hidden
          line-height 0.19rem
        .good_price
          display flex
          justify-content space-between
          align-items center
          span
            font-size 0.13rem
            font-weight bold
            color $theme-red
  .dec
    font-size 0.18rem
    color #5f5f5f
    margin-bottom 0.16rem
    text-align center
  .dec2
    color $font-color2
    font-size 0.13rem
  .cart_control
    position fixed
    left 0
    bottom 0.56rem
    padding 0 0.15rem
    background-color #fff
    border-top 0.01rem solid $border-gray
    display flex
    justify-content space-between
    width 100%
    box-sizing border-box
    height 0.56rem
    .right_wrap
      display flex
      align-items center
      justify-content flex-end
      width 70%
      .total_wrap
        display flex
        align-items center
        height 100%
        color $font-color
        font-size 0.15rem
        .total
          font-size 0.13rem
          color $theme-red
      .btn
        width 1rem
        flex 0 0 1rem
        height 0.4rem
        color #fff
        font-size 0.15rem
        display flex
        justify-content center
        align-items center
        border-radius 0.2rem
        background-image linear-gradient(to right, #eb4450, #f5022d)
        margin-left 0.1rem
      .btn_delete
        width 0.57rem
        height 0.24rem
        color $theme-red
        font-size 0.13rem
        display flex
        justify-content center
        align-items center
        border-radius 0.2rem
        border 0.01rem solid $theme-red
        background-color #fff
        margin-left 0.1rem
    & >>> .van-checkbox__label
      color $font-color2 !important
      font-size 0.13rem !important
</style>
