import * as method from 'api'
import * as type from './mutation-types'
const actions = {
  //请求用户个人信息
  async reqUserInfo ({commit}) {
    const {message} = await method.getUserInfo()
    commit(type.RECEIVE_USERINFO,message)
  },
  //请求登出
  async reqLoginout ({commit}) {
    localStorage.removeItem('token')
    commit(type.LOGIN_OUT)
  },
  //请求修改性别
  async reqReviseSex ({commit},sex) {
    await method.reviseSex(sex)
    commit(type.REVISE_SEX,sex)
  },
  //请求修改昵称
  async reqReviseName ({commit},netname) {
    await method.reviseName(netname)
    commit(type.REVISE_NETNAME,netname)
  },
  //请求添加收获地址
  async reqAddDeliveryAddress ({commit},contentObj) {
    const {data} =await method.addDeliveryAddress(contentObj)
    commit(type.ADD_DELIVERY_ADDRESS,data)
  },
  //请求修改收获地址
  async reqUpdateDeliveryAddress ({commit},contentObj) {
    const {data} = await method.updateDeliveryAddress(contentObj)
    console.log(data)
    commit(type.UPDATE_DELIVERY_ADDRESS,data)
  },
  //请求删除收获地址
  async reqDeleteDeliveryAddress ({commit},id) {
    console.log(id)
    const {data} = await method.deleteDeliveryAddress(id)
    commit(type.DELETE_DELIVERY_ADDRESS,data)
  }
}
export default actions