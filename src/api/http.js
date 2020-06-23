import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.timeout = 10000

axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  token && (config.headers.Autorization = token)
  return config
},error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(res => {
  return res.data
},error => {
  if (error.response) {
    return Promise.reject(error.response)
  }else{
    return Promise.reject(error)
  }
})

export default axios