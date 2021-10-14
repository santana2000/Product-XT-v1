<template>
	<div>
		<button class="feature-poi" @click="toggleCom()">显示 / 隐藏</button>
		<div class="wrap" v-if="ytoggleCom">
			<div class="wrap-title">
				<span class="wrap-title-text">要素点</span>
				<img class="close-icon" src="../assets/images/tool/close.png" alt="" @click="toggleCom()" />
			</div>
			<div class="container">
				<transition name="fade" mode="out-in">
					<!-- 列表面板 -->
					<div class="container-list" v-if="ytoggleStatus" key="z-left">
						<!-- <el-select></el-select> -->
						<ul class="poi-list" key="z-ul">
							<li class="poi-item" v-for="(item, index) in this.pageList" @click="intoDetail(item)">
								<i class="el-icon-location-information item-icon"></i>
								<p class="item-name">{{ item.name }}</p>
							</li>
						</ul>
						<el-pagination
							key="z-elpage"
							small
							:page-size="8"
							layout="prev, pager, next"
							:total="26"
							:current-page="currentPage"
							@current-change="handleCurrentChange"
						>
						</el-pagination>
					</div>
					<!-- </transition> -->

					<!-- 详情面板 -->
					<!-- <transition name="right-slide-fade"> -->
					<!-- <div class="container-detail" v-if="!ytoggleStatus"> -->
					<div class="container-detail" v-else key="z-right">
						<div class="back-to-list" @click="toggleStatus()">
							<i class="el-icon-back"></i>
							<span>返回</span>
						</div>
						<div class="item-detail">
							<div class="y-rank item-all">
								<span>地位作用</span>
								<div class="item-detail-content">--- {{ detailInfo.type }}</div>
							</div>
							<div class="y-compose item-all">
								<span>组成分布</span>
								<div class="item-detail-content">--- {{ detailInfo.type }}</div>
							</div>
							<div class="y-structure item-all">
								<span>结构性质</span>
								<div class="item-detail-content">--- {{ detailInfo.type }}</div>
							</div>
							<div class="y-core">
								<span>要害部位</span>
								<div class="item-detail-content">--- {{ detailInfo.type }}</div>
							</div>
							<div class="y-position">
								<span>定位精度</span>
								<div class="item-detail-content">--- {{ detailInfo.type }}</div>
							</div>
							<div class="y-terrain">
								<span>地形状况</span>
								<div class="item-detail-content">--- {{ detailInfo.type }}</div>
							</div>
							<div class="y-defense">
								<span>防御设施</span>
								<div class="item-detail-content">--- {{ detailInfo.type }}</div>
							</div>
							<div class="y-weather">
								<span>气象情况</span>
								<div class="item-detail-content">
									--- {{ detailInfo.type }}
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita necessitatibus cum veritatis asperiores
									molestiae illo facilis eveniet quas harum, voluptatem cupiditate delectus totam maxime quisquam minima, quidem id
									placeat iure?
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import bus from '@/utils/Bus.js';

export default {
	name: 'FeaturePoi',
	components: {},
	data() {
		return {
			isShow: false,
			ytoggleCom: true,
			ytoggleStatus: true,
			poiList: [], // 所有数据
			pageList: [], // 当前列表数据
			// poiEntityCollection: [],
			currentPage: 1,
			detailInfo: {} // 页面详情
		};
	},
	created() {
		window.viewInstance = this;
		let timer = setInterval(() => {
			if (viewer) {
				clearInterval(timer);
				// alert('viewer对象已存在！');
			}
		}, 1000);

		// todo
		this.getPoiData();
	},
	mounted() {
		var sx = viewer.entities.add({
			// position: Cesium.Cartesian3.fromDegrees(item.addlon, item.addlat),
			id: '341',
			position: Cesium.Cartesian3.fromDegrees(-142.1958, 34.1915),
			point: {
				color: Cesium.Color.SKYBLUE,
				pixelSize: 10,
				outlineColor: Cesium.Color.RED,
				outlineWidth: 3,
				heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
			}
		});
		/* this.poiEntityCollection = new Cesium.CustomDataSource('poidata');
		viewer.dataSources.add(this.poiEntityCollection); */
		/* 
		var zzs = new Cesium.EntityCollection('xx');
		this.poiEntityCollection = new Cesium.EntityCollection(sss);
		viewer.dataSources.add(zzs);
	    */
		// this.poiEntityCollection = new Cesium.EntityCollection('poidata');
		// console.log(window.viewer.entities, 'alllllllllllllllllll');
	},
	methods: {
		initFromPlugin(viewer, div) {
			this.$store.commit('initViewer', viewer);
			this.divInIframe = div;
		},
		handler() {
			this.isShow = true;
		},
		cancelHandler() {
			this.isShow = false;
		},
		// 获取后台数据 & 绘制球上点
		async getPoiData() {
			// 加载list---------------------------------------
			const { data: poiData } = await this.$axios.get('/zz.json');
			for (const key in poiData) {
				this.poiList.push(poiData[key]);
			}
			this.pageList = [...this.poiList].slice(0, 8);

			// 加载entity---------------------------------------

			for (const item of this.poiList) {
				let ae = this.addEntity(item);
				// this.poiEntityCollection.entities.add(ae);
				// this.poiEntityCollection.add(ae);
				viewer.entities.add(ae);
			}
			// console.log(this.poiEntityCollection, 'myEntityCollection');

			this.clickMapPoi();
		},
		// 绘制、返回entity信息
		addEntity(item) {
			let e = new Cesium.Entity({
				id: item.id,
				name: item.name,
				position: Cesium.Cartesian3.fromDegrees(item.addlon, item.addlat),
				point: {
					color: Cesium.Color.SKYBLUE,
					pixelSize: 10,
					outlineColor: Cesium.Color.YELLOW,
					outlineWidth: 3,
					heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
				},
				label: {
					text: item.name,
					font: '14pt sans-serif',
					heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
					horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
					verticalOrigin: Cesium.VerticalOrigin.BASELINE,
					fillColor: Cesium.Color.BLACK,
					showBackground: true,
					backgroundColor: new Cesium.Color(1, 1, 1, 0.7),
					backgroundPadding: new Cesium.Cartesian2(8, 4),
					pixelOffset: new Cesium.Cartesian2(-20, 29)
					// pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 0.0, 8.0e6, 10.0),
					// disableDepthTestDistance: Number.POSITIVE_INFINITY // draws the label in front of terrain
				}
			});

			return e;
		},
		// 列表切换至详情面板
		intoDetail(item) {
			this.detailInfo = item;
			this.flyToPosi(item);
			this.toggleStatus();
		},
		flyToPosi(item) {
			viewer.camera.flyTo({
				destination: Cesium.Cartesian3.fromDegrees(item.addlon, item.addlat, 5000)
			});
		},
		// 点击entity修改详情面板
		clickMapPoi() {
			let that = this;
			let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
			handler.setInputAction(function(movement) {
				let pick = viewer.scene.pick(movement.position);
				if (Cesium.defined(pick)) {
					// console.log(pick.id.id, pick.id.name, 'left click');
					that.detailInfo = that.poiList[pick.id.id];

					if (that.ytoggleStatus) {
						that.toggleStatus();
					}
				}
			}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		},
		// 切换面板状态
		toggleStatus() {
			this.ytoggleStatus = !this.ytoggleStatus;
		},
		//分页请求新数据
		handleCurrentChange(pageNum) {
			this.pageList = [...this.poiList].slice((pageNum - 1) * 8, (pageNum - 1) * 8 + 8);
			this.currentPage = pageNum;
		},
		// 打开/关闭组件
		toggleCom() {
			// this.poiEntityCollection.show = !this.poiEntityCollection.show; //性能影响大
			// this.poiEntityCollection.removeAll();
			// this.poiEntityCollection.entities.removeAll();
			// viewer.dataSources.remove(this.poiEntityCollection, true);
			if (this.ytoggleCom) {
				// this.removeEntity(this.poiEntityCollection);
				this.removeEntity();
			} else {
				this.getPoiData();
			}
			// console.log(this.poiEntityCollection._entities._array, 'eeeeeearray');

			this.ytoggleCom = !this.ytoggleCom;
		},
		removeEntity() {
			if (this.poiList != null) {
				for (var i = 0; i < this.poiList.length; i++) {
					window.viewer.entities.removeById(i);
					// console.log(window.viewer.entities, 'every');
				}
			}
			// console.log(entityCollection, 'enttiticolllllfonal');
		}
	}
};
</script>
<style scoped>
/* -----------------要素列表页-------------------- */

.feature-poi {
	position: fixed;
	left: 20px;
	bottom: 180px;
}
.poi-list {
	padding: 3px;
	margin: 8px 0 0 0;
}
.poi-item {
	list-style: none;
	height: 30px;
	/* line-height: 30px; */
	font-size: 16px;
	text-align: center;
	padding: 3px;
	border: #409eff 1px solid;
	margin-bottom: 5px;
	display: flex;
	justify-content: space-around;
	flex-direction: row;
	align-items: center;
}
.poi-item:hover {
	background-color: rgba(173, 200, 223, 0.5);
	cursor: pointer;
}
.item-icon {
	flex-grow: 1;
}
.item-name {
	flex-grow: 5;
	padding-left: 15px;
	text-align: left;
}
.wrap >>> .el-pagination--small {
	/* margin: 0 auto; */
	text-align: center;
	background-color: rgba(24, 31, 40, 0);
	margin: 5px auto;
	position: absolute;
	bottom: 5px;
	left: 39px;
}
.wrap >>> .btn-prev,
.wrap >>> .btn-next {
	background-color: rgba(240, 248, 255, 0);
	color: aliceblue;
}

.wrap >>> .el-pager .number {
	background-color: rgba(241, 241, 241, 0);
	color: rgba(221, 232, 241, 0.911);
}
.wrap >>> .el-pager .active {
	color: #409eff;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
.left-slide-fade-enter-active {
	transition: all 0.1s;
}
.left-slide-fade-leave-active {
	transition: all 0.2s;
}
.left-slide-fade-enter {
}
.left-slide-fade-leave-to {
	transform: translateX(-100px);
	opacity: 0;
}
.right-slide-fade-enter-active {
	transition: all 0.3s ease;
}
.right-slide-fade-leave-active {
	transition: all 0.4s;
}
.right-slide-fade-enter {
	/* transform: translate(30px, -350px); */
	transform: translateX(30px);
}
.right-slide-fade-leave-to {
	transform: translateX(30px);
	opacity: 0;
}
/* -----------------要素详情页-------------------- */
.back-to-list {
	font-size: 16px;
	font-weight: 400;
	padding: 2px;
	margin-bottom: 5px;
}
.back-to-list span {
	margin-left: 5px;
}
.item-detail {
	border: #409eff 1px solid;
	padding: 5px;
	overflow: auto;
	height: 340px;
	/* scrollb */
}
.item-detail span {
	font-size: 15px;
	font-weight: 800;
}
.item-detail .item-all {
	margin-bottom: 3px;
}
.item-detail::-webkit-scrollbar {
	width: 4px;
	/* height: 5px; */
	/* background-color: rgb(211, 207, 206); */
	/* color: tomato; */
}
.item-detail::-webkit-scrollbar-track {
	background: rgb(132, 145, 150);
	border-radius: 2px;
}
.item-detail::-webkit-scrollbar-thumb {
	background: rgb(231, 231, 231);
	border-radius: 2px;
}
</style>
<style scoped>
.wrap {
	position: absolute;
	top: 80px;
	left: 80px;
	/* min-width: 200px; */
	width: 230px;
	height: 450px;
	background-color: rgba(24, 31, 40, 0.6);
	color: #fff;
	font-size: 14px;
	z-index: 999;
}
.wrap-title {
	min-width: 200px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;
	border-bottom: 2px solid #409eff;
}
.wrap-title-text {
	font-size: 16px;
	font-weight: bold;
	margin-left: 10px;
}
.close-icon {
	cursor: pointer;
}
.container {
	padding: 5px 10px;
	/* border-left: 2px solid #40b3ff; */
	/* border-right: 2px solid #40b3ff; */
	/* border-bottom: 2px solid #40b3ff; */
	/* box-sizing: border-box; */
}
</style>
