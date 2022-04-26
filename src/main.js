import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
import store from "./store/store"
import router from './router/index'
import echarts from '../node_modules/echarts'
import '../node_modules/echarts/map/js/world.js'
Vue.prototype.$echarts = echarts
import * as Cesium from 'cesium/Cesium'
import './assets/styles/index.scss';
// import 'cesium/Widgets/widgets.css'

import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

Vue.prototype.Cesium = Cesium;
const hostMap = {
  development:'http://127.0.0.1',
  production:window.location.origin
}

Vue.prototype.Urls = {
  host:hostMap[process.env.NODE_ENV]
}
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')


import navTitle from './assets/js/navTitle'
router.beforeEach((to, from, next) => {
  let flag = true
  navTitle.forEach((item, index) => {
    if (('/' + item.path) === to.path) {
      store.dispatch('changeMenu', index + '')
      flag = false
    }
  })
  if (flag) {
    store.dispatch('changeMenu', null)
  }
  next()
})
