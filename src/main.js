import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//http请求
import axios from 'axios'
Vue.prototype.$axios = axios
import yapi from '@/api/index'
Vue.prototype.$yapi = yapi

//三方组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//字体图标
// import './assets/icons/iconmap/iconfont.css'

//mockjs
// const mock = true;
// if (mock) {
//     require('./js/mock/fakeApi')
// }

// import './js/mock/fakeApi.js'

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

// 可以建立很多个，只要和元素绑定起来就可以了
// 全局组件必须写在Vue实例创建之前，才在该根元素下面生效

/* Vue.component('rank-star', {
  props: {
    rankNum: {
      type: Number,
      default: 5
    },
    color: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      mes: '星级'
    }
  },
  templete: `
    <div> {{mes}} </div>
  `
})
new Vue({
  components:{
    'warn-info': {
      props: {
        rankNum: {
          type: Number,
          default: 5
        },
        color: {
          type: String,
          default: 'red'
        }
      },
      data() {
        return {
          mes: '星级'
        }
      },
      templete: `<div> {{mes}} </div>`
    }
  },

  render: function (h) { return h(App) }
}).$mount('#homez') */