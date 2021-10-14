/*
 * @Descripttion:
 * @version:
 * @Author: NeXT2020
 * @email: 532014809@qq.com
 * @Date: 2021-01-15 11:12:56
 * @LastEditors: NeXT2020
 * @LastEditTime: 2021-09-22 13:56:00
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/page-system/Login.vue';
import PageError from '../views/page-system/PageError.vue';
import ElementTools from '../views/page-tools/ElementTools.vue';
import VisualTools from '../views/page-tools/VisualTools.vue';
import OtherTools from '../views/page-tools/OtherTools.vue';

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// 自己写的Nav重复点击会报错吗
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);
// 定义hash地址与组件之间的对应关系
const routes = [
	{ path: '/', redirect: '/home' },
	{
		path: '/home',
		name: 'Home',
		component: Home,
		// children: [
		// 	{
		// 		//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;
		// 		//在生成路由时，主路由上的path会被自动添加到子路由之前，
		// 		//所以子路由上的path不用在重新声明主路由上的path了。
		// 		path: 'home',
		// 		name: 'Home',
		// 		component: Home
		// 	},
		// ]
		children: [
			{
				path: 'draw',
				name: 'Draw',
				component: function() {
					return import(/* webpackChunkName: "about" */ '../components/map-tools/Draw.vue');
				}
			}
		]
	},
	{
		path: '/about',
		name: 'About',
		// redirect:'/vis'
		component: function() {
			return import(/* webpackChunkName: "about" */ '../views/About.vue');
		},
		// 两个子路由 一个elment 一个可视化
		children: [
			{
				// path: '', 默认子路由
				path: 'vis',
				name: 'VisualTools',
				component: VisualTools
			},
			{
				path: 'ele',
				// 路由名称可以自定义，在push时和这里的对应即可，不一定要和组件名相同
				name: 'zzzzz',
				component: ElementTools
			},
			{
				path: 'oth',
				// 路由名称可以自定义，在push时和这里的对应即可，不一定要和组件名相同
				name: 'OtherTools',
				component: OtherTools
			}
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/error',
		name: 'PageError',
		component: PageError
	}
];

const router = new VueRouter({
	routes
});

export default router;
