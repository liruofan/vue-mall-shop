import axios from './http'
//获取轮播图
export const getSwiper = () => axios.get('/swiperdata')
//获取导航分类
export const getCategory = () => axios.get('/catitems')
//获取楼层
export const getFloors = () => axios.get('/floor')
//搜索
export const search = (query) => axios.get('/goods/search',{params:{query}})
//获取商品分类
export const getGoodsCategory = () => axios.get('/goods/goods')
//商品列表搜索
export const searchGoodList = (cid,pagenum,pagesize) => axios.get('/goods/detailGoods',{params:{cid,pagenum,pagesize}})
//获取商品详情
export const getGoodDetail = (goods_id) => axios.get('/goods/detailInfo',{params:{goods_id}})
//账号注册
export const userRegister = (username,password) => axios.post('/user/register',{username,password})
//账号登陆
export const userLogin = (username,password) => axios.post('/user/login',{username,password})
//获取个人信息
export const getUserInfo = () => axios.post('/user/profile')
//修改性别
export const reviseSex = (sex) => axios.post('/user/revisesex',{sex})
//修改昵称
export const reviseName = (netname) => axios.post('/user/revisename',{netname})
//添加收获地址
export const addDeliveryAddress = (deliveryaddressObj) => axios.post('/user/adddeliveryaddress',{...deliveryaddressObj})
//修改收获地址
export const updateDeliveryAddress = (deliveryaddressObj) => axios.post('/user/updatedeliveryaddress',{...deliveryaddressObj})
//删除收获地址
export const deleteDeliveryAddress = (id) => axios.post('/user/deletedeliveryaddress',{id})
//添加商品到购物车
export const addCartGood = (good_id,good_name,img_url,good_price,count) => axios.post('/user/addcartgood',{good_id,good_name,img_url,good_price,count})
//修改商品数量
export const reviseCount = (good_id,count) => axios.post('/user/reviseCount',{good_id,count})
//修改商品选中状态
export const reviseCheck = (good_id,checked) => axios.post('/user/reviseChecked',{good_id,checked})
//修改全部商品的选中状态
export const reviseAllCheck = (checked) => axios.post('/user/reviseAllChecked',{checked})
//删除所有选中的商品
export const deleteCheckedGood = () => axios.post('/user/deleteCartGood')