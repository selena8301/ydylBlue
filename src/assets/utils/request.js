import axios from 'axios'
import {
  Message
} from 'element-ui'
import store from '@/store/store.js'
import router from '@/router'
import qs from 'qs'
// create an axios instance
const service = [
  axios.create({
    baseURL: window.serverConfig.publicPath, // api的base_url
    // timeout: 10000, // request timeout
    // transformRequest: [
    //   data => qs.stringify(data)
    // ],
    withCredentials: true
  }),
  axios.create({
    baseURL: window.serverConfig.fullTextSearchPath, // 全文检索用
    withCredentials: true
  }),
  axios.create({
    baseURL: window.serverConfig.managePath, // 全文检索用
    withCredentials: true
  }),
]

service.forEach(item => {
  item.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'


  item.interceptors.request.use(config => {
    if (Boolean(store.getters.token)) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = store.getters.token
    }
    store.dispatch('changeShowLoader', true)
    return config
  }, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  })

  item.interceptors.response.use(
    response => {
      if (response.data.code === 401) {
        // Message.error(response.data.data)
        store.dispatch('logout')
        router.push('/login')
        return false
      } else {
        // setTimeout(() => {
        //   store.dispatch('changeShowLoader', false)
        // }, 200)
        store.dispatch('changeShowLoader', false)
        return response
      }
    },
    error => {
      if (error.response) {
        const errRes = error.response
        // Message({
        //   message: errRes.data.message,
        //   type: 'error',
        //   duration: 3 * 1000
        // })
      }
      // setTimeout(() => {
      //   store.dispatch('changeShowLoader', false)
      // }, 200)
      store.dispatch('changeShowLoader', false)
      return Promise.reject(error)
    })
})

export default service
