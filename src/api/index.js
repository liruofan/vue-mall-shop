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