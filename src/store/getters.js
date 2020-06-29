const getters = {
  cartGoodNum (state) {
    return state.userInfo.cart.length
  },
  totalNum(state) {
    return state.userInfo.cart.reduce((total, item, index) => {
      return (total += item.checked ? 1 : 0)
    }, 0)
  },
  totalPrice (state) {
    return state.userInfo.cart.reduce((total,item)=>{
      return total+=item.checked? (item.count*item.good_price) : 0
    },0)
  }
}
export default getters