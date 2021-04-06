import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//http请求
import axios from 'axios'
Vue.prototype.$axios = axios

//三方组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//字体图标
import './assets/icons/iconmap/iconfont.css'

//mockjs
//mock开关
const mock = true;
if (mock) {
    require('./js/mock/fakeApi')
}
// axios.defaults.baseURL = '/api';




new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
