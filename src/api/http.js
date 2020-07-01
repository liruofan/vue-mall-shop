import axios from 'axios'
import Router from '@/router'
import { Toast } from 'vant'
axios.defaults.baseURL = 'http://www.leerofan.cn/api'
axios.defaults.timeout = 10000

axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  token && (config.headers.Autorization = token)
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(res => {
  return res.data
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        Toast({
          message: error.response.data.message
        })
        break
      case 403:
        localStorage.removeItem('token')
        Toast({
          message: error.response.data.message
        })
        Router.replace('/login')
        break
    }
    return Promise.reject(error.response)
  } else {
    if (!window.navigator.onLine) {
      Toast.clear()
      Router.replace('/disconnection')
      return
    }
    return Promise.reject(error)
  }
})

export default axios