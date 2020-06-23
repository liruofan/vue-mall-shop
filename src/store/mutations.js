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
    //  const result = state.userInfo.deliveryAdress.filter((item)=>{
    //    return item.id !== id
    // })
    // state.userInfo.deliveryAdress = result
  }
}
export default mutations