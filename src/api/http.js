import axios from 'axios'
axios.defaults.baseURL = 'http://www.leerofan.cn/api'
axios.interceptors.response.use(res => {
  return res.data
})
axios.defaults.timeout = 10000
export default axios