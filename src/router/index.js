import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/page-system/Login.vue'
import PageError from '../views/page-system/PageError.vue'
import ElementTools from '../views/page-table/ElementTools.vue'
import VisualTools from '../views/page-table/VisualTools.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home'},
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 三个子路由 一个 一个 一个
    // children: [
		// 	{
		// 		//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;
		// 		//在生成路由时，主路由上的path会被自动添加到子路由之前，
		// 		//所以子路由上的path不用在重新声明主路由上的path了。
		// 		path: 'home',
		// 		name: 'Home',
		// 		component: Home
		// 	},
		// 	{
		// 		path: 'categories',
		// 		name: 'Categories',
		// 		component: Categories
		// 	},
		// ]
  },
  {
    path: '/about',
    name: 'About',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    // 两个子路由 一个elment 一个可视化
    children: [
			{
				path: 'ele',
				name: 'ElementTools',
				component: ElementTools
			},
			{
				path: 'vis',
				name: 'VisualTools',
				component: VisualTools
			},
		
		]
  },
  {
    path: '/login',
    name: 'Login',
	component: Login,
  },
  {
    path: '/error',
    name: 'PageError',
	component: PageError,
  }
]

const router = new VueRouter({
  routes
})

export default router
