import * as type from './mutation-types'
const mutations = {
  [type.RECEIVE_USERINFO] (state,message) {
    state.userInfo = message
  },
  [type.LOGIN_OUT] (state) {
    state.userInfo = {}
  },
  [type.REVISE_SEX] (state,sex) {
    state.userInfo.sex = sex
  },
  [type.REVISE_NETNAME] (state,netname){
    state.userInfo.netname = netname
  },
  [type.ADD_DELIVERY_ADDRESS] (state,data) {
    state.userInfo.deliveryAdress = data
  },
  [type.UPDATE_DELIVERY_ADDRESS] (state,data) {
   state.userInfo.deliveryAdress = data
  },
  [type.DELETE_DELIVERY_ADDRESS] (state,data) {
    state.userInfo.deliveryAdress = data
  },
  [type.ADD_CART_GOOD] (state,data) {
    state.userInfo.cart = data
  },
  [type.REVISE_CART_COUNT] (state,data) {
    state.userInfo.cart = data
  },
  [type.REVISE_CART_CHECKED] (state,data) {
    state.userInfo.cart = data
  },
  [type.REVISE_CART_ALL_CHECKED] (state,data) {
    state.userInfo.cart = data
  },
  [type.DELETE_CART_GOOD] (state,data) {
    state.userInfo.cart = data
  },
  [type.ADD_FAVORITE] (state,data) {
    state.userInfo.favorite = data
  },
  [type.CANCEL_FAVORITE] (state,data) {
    state.userInfo.favorite = data
  },
  [type.REVISE_FAVORITE_CHECKED] (state,data) {
    state.userInfo.favorite = data
  },
  [type.REVISE_FAVORITE_ALL_CHECKED] (state,data) {
    state.userInfo.favorite = data
  },
  [type.DELETE_FAVORITE_GOOD] (state,data) {
    state.userInfo.favorite = data
  }
}
export default mutations