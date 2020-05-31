import axios from 'axios'
import qs from 'qs'

// switch (process.env.NODE_ENV) {
//   case "production":
//     axios.defaults.baseURL = "http://api.zhufengpeixun.cn"
//     break
//   case "test":
//     axios.defaults.baseURL = "http://192.168.20.12:8080"
//     break
//   default:
//     axios.defaults.baseURL = "http://127.0.0.1:3000"
// }
axios.defaults.baseURL = '/api'
/**
 * 设置超时时间和跨域是否允许携带凭证
 */
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true

/**
 * 设置请求传递数据的格式（看服务器要求什么格式）
 * x-www-form-urlencoded
 * axios.defaults.headers['Content-Type'] 默认为application/json
 */
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded' 
//将js对象转为xx=xxx&xx=xxx格式
axios.defaults.transformRequest = data => qs.stringify(data)

/**
 * 设置请求拦截器
 * 客户端发送请求 => [请求拦截器] => 服务器
 * Token校验(JWT):接收服务器返回的token,存储到 redux/vuex/本地缓存中,每次向服务器发请求,我们应该把token带上
 */

axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  token && (config.headers.Autorization = token)
  return config
},error => {
  return Promise.reject(error)
})

/**
 * 设置响应拦截器
 * 服务器返回信息 => [拦截的统一处理] => 客户端js获取到信息
 */

axios.interceptors.response.use(res => {
  //只返回响应主体中的信息（部分公司根据需求会进一步完善，例如指定服务器返回的CODE值来指定成功还是失败）
  return res.data
},error => {
  if (error.response) {
    switch (error.response.status) {
      case 401: //当前请求需要用户验证（一般未登录）
        break
      case 403: //服务器已经理解请求，但是拒绝执行它（一般是TOKEN过期）
        localStorage.removeItem('token')
        break
      case 404: //请求失败，请求所希望得到的字员未被在服务器上发现
        break
    }
    return Promise.reject(error.response)
  }else{
    //断网处理
    if (window.navigator.onLine) {
      //断开网络了,可以跳转到断网提示页面
      return
    }
    return Promise.reject(error)
  }
})

export default axios