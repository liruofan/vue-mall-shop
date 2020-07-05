import * as method from 'api'
import * as type from './mutation-types'
import { Toast } from 'vant'
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
    commit(type.UPDATE_DELIVERY_ADDRESS,data)
  },
  //请求删除收获地址
  async reqDeleteDeliveryAddress ({commit},id) {
    const {data} = await method.deleteDeliveryAddress(id)
    commit(type.DELETE_DELIVERY_ADDRESS,data)
  },
  //请求添加购物车商品
  async reqAddCartGood ({commit},goodObj) {
    let {goods_id,goods_name,goods_small_logo,goods_price} = goodObj
    Toast.loading({
      message: '加载中',
      forbidClick: true,
      duration:0
    })
    const {data} = await method.addCartGood(goods_id,goods_name,goods_small_logo,goods_price,1)
    commit(type.ADD_CART_GOOD,data)
    Toast.clear()
    Toast.success('加入成功')
  },
  //请求修改购物车商品数量
  async reqReviseCount ({commit},params) {
    let {good_id,count} = params
    Toast.loading({
      message: '加载中',
      forbidClick: true,
      duration:0
    })
    const {data} = await method.reviseCount(good_id,count)
    commit(type.REVISE_CART_COUNT,data)
    Toast.clear()
  },
  //请求修改购物车商品选中状态
  async reqReviseCheck ({commit},params) {
    let {good_id,checked} = params
    Toast.loading({
      message: '加载中',
      forbidClick: true,
      duration:0
    })
    const {data} = await method.reviseCheck(good_id,checked)
    commit(type.REVISE_CART_CHECKED,data)
    Toast.clear()
  },
  //请求修改购物车所有商品选中状态
  async reqReviseAllCheck ({commit},checked) {
    Toast.loading({
      message: '加载中',
      forbidClick: true,
      duration:0
    })
    const {data} = await method.reviseAllCheck(checked)
    commit(type.REVISE_CART_ALL_CHECKED,data)
    Toast.clear()
  },
  //请求删除购物车中所有选中的商品
  async reqDeleteAllCheck ({commit}) {
    Toast.loading({
      message: '加载中',
      forbidClick: true,
      duration:0
    })
    const {data} = await method.deleteCheckedGood()
    commit(type.DELETE_CART_GOOD,data)
    Toast.clear()
  },
  //请求添加商品到用户收藏夹
  async reqAddFavorite ({commit},goods_id) {
    Toast.loading({
      message: '加载中',
      forbidClick: true,
      duration:0
    })
    const {data} = await method.addFavorite(goods_id)
    commit(type.ADD_FAVORITE,data)
    Toast.clear()
    Toast.success('收藏成功')
  },
  //请求取消商品到用户收藏夹
  async reqCancelFavorite ({commit},goods_id) {
    Toast.loading({
      message: '加载中',
      forbidClick: true,
      duration:0
    })
    const {data} = await method.cancelFavorite(goods_id)
    commit(type.CANCEL_FAVORITE,data)
    Toast.clear()
  },
  //请求修改收藏夹商品选中状态
  async reqReviseFavoriteCheck ({commit},params) {
    let {goods_id,checked} = params
    Toast.loading({
      message: '加载中',
      forbidClick: true,
      duration:0
    })
    const {data} = await method.reviseFavoriteCheck(goods_id,checked)
    commit(type.REVISE_FAVORITE_CHECKED,data)
    Toast.clear()
  },
  //请求修改收藏夹所有商品选中状态
  async reqFavoriteReviseAllCheck ({commit},checked) {
    Toast.loading({
      message: '加载中',
      forbidClick: true,
      duration:0
    })
    const {data} = await method.reviseFavoriteAllCheck(checked)
    commit(type.REVISE_FAVORITE_ALL_CHECKED,data)
    Toast.clear()
  },
  async reqDeleteFavoriteAllCheck ({commit}) {
    Toast.loading({
      message: '加载中',
      forbidClick: true,
      duration:0
    })
    const {data} = await method.deleteFavoriteCheckedGood()
    commit(type.DELETE_FAVORITE_GOOD,data)
    Toast.clear()
  }
}
export default actions