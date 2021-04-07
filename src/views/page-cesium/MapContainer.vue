<template>
  <div class="map-all">
    <div id="cesiumContainer"></div>
    <div id="mapPlugins">
      <plugin1></plugin1>
      <!-- <Draw></Draw> -->
      <router-view></router-view>
    </div>
    <div id="liney" @click="drawLine">
      lineaaa
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Draw from '@/components/map-tools/Draw.vue'

export default {
  name: "MapContainer",
  components: {Draw},
  data() {
    return {
      //搜索框输入值
      searchValue: "",
      //绘制
      polylinePath:[],

    };
  },
  mounted() {
    this.initViewer();
  },
  methods: {
    // 初始化viewer对象
    initViewer() {
      window.viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false,
        shouldAnimate: true,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        infoBox: false,
        navigationInstructionsInitiallyVisible: false,
        // 地形能否走SDC，还是直接用webapps发布
        /* terrainProvider: new Cesium.CesiumTerrainProvider({
					url: Cesium.IonResource.fromAssetId(1),
                }),
                 */
        /* imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url: "http://127.0.0.1:8300/sdc/tiles/image/{z}/{x}/{reverseY}.jpg",
          // "/myMap/sdc/tiles/image/{z}/{x}/{reverseY}.jpg",
          tilingScheme: new Cesium.GeographicTilingScheme(),
        }), */
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
                    url:
                        "http://wprd03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=6",
                }),
               
      });
      /*viewer.imageryLayers.addImageryProvider(
                new Cesium.UrlTemplateImageryProvider({
                    url:
                        "http://wprd03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8",
                })
            ); */
      /* var anno = new Cesium.UrlTemplateImageryProvider({
        // url: "static/tiles/{z}/{x}/{y}.png"
        url:
          "http://127.0.0.1:8300/sdc/tiles/annotation/{z}/{x}/{reverseY}.png",
        tilingScheme: new Cesium.GeographicTilingScheme(),
      });
      viewer.imageryLayers.addImageryProvider(anno); */

      viewer.scene.globe.showGroundAtmosphere = false;
      //去掉logo
      viewer._cesiumWidget._creditContainer.style.display = "none";
      //取消默认的双击追踪entity
      viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(116, 39.521196, 500000),
      });
    },
    drawLine() {
      console.log("开始绘制");
      var myCanvas = viewer.scene.canvas;
      var myHandler = new Cesium.ScreenSpaceEventHandler(myCanvas);
      var polylinePath = [];

      //左键单击
      myHandler.setInputAction(function(event) {
        //1.点击菜单栏，进入绘制状态（默认贴地距离，可以开启空间距离）

        //2.左键点击地球，绘制第一个点，显示点和标牌信息（如果点不在球面上，提示需要放大地球）
        //2.移动鼠标，（如果有，先清除当前线段）随着鼠标移动动态生成连接线，显示标牌
        //2.再次点击，绘制当前连点之间的连接线，绘制点与标牌信息
        //2.再次移动
        //2.右键点击，绘制连接线，绘制点、标牌和删除图标，结束当前绘制

        //3.清除绘制  i:每条线的结尾处关闭按钮 ii:菜单面板中的全部清除

        //
        //4.再次点击菜单栏，结束绘制状态

        //贴地距离是指点没有高度的情况？直接根据经纬度按默认函数计算
        //空间距离通过三角形计算？在建筑物上的点到地面点的距离？
        //两种方法与线条贴不贴地没关系，看的是测量应用场景

        //笛卡尔cartesian3里的Z坐标并非物体距离地面的高度值
        //屏幕坐标转Cartographic后，可以通过EllipsoidGeodesic中指定起始点，
        //并直接通过surfaceDistance属性得到地表距离

        //空间距离  i:在上述基础上还需要获取两点之间的高度差再通过勾股定理来计算
        //         ii:直接获取起始点的笛卡尔坐标，通过三个坐标差计算长方体对角距离
        // https://blog.csdn.net/luoyun620/article/details/107182493/

        //尽可能多的以配置的形式，去指定各类可能发生变化的（如样式、模式、显示与否）

        // isDraw = true;

        // x1.创建对象，对象接收各类参数（viewer,点击位置的坐标，）
        // x2.点击时调用对象的画点和画线方法，
        // x3.移动时调用对象的画线方法，传入实时callback更新坐标的函数作为参数
        // x4.右键点击调用对象的结束方法
        // var polylinePath = new Array();
        console.log(event, "event---");
        console.log(event.position, "position---");
        var position1;
        var cartographic;
        var ray = viewer.scene.camera.getPickRay(event.position);
        console.log(ray, "ray---");
        if (ray) position1 = viewer.scene.globe.pick(ray, viewer.scene);
        console.log(position1, "cartesian3---");
        if (position1)
          // cartographic = Cesium.Cartographic.fromCartesian(position1);
          // cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(
          cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(
            position1
          );
        console.log(cartographic,'cartographic---');
        if (cartographic) {
          var height = viewer.scene.globe.getHeight(cartographic);
          var point = Cesium.Cartesian3.fromDegrees(
            (cartographic.longitude / Math.PI) * 180,
            (cartographic.latitude / Math.PI) * 180,
            height
          );

          polylinePath.push(point); //加点

            if (polylinePath.length == 1) {
                var startpoint = viewer.entities.add({
                    position: point,
                    point: {
                        heightReference:
                            Cesium.HeightReference.CLAMP_TO_GROUND,
                        show: true,
                        color: Cesium.Color.SKYBLUE,
                        pixelSize: 5,
                        outlineColor: Cesium.Color.YELLOW,
                        outlineWidth: 3,
                    },
                    label: {
                        text: "起点",
                        font: "14pt monospace",
                        color: Cesium.Color.RED,
                        backgroundColor: Cesium.Color.CORAL,
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        outlineWidth: 2,
                        //垂直位置
                        heightReference: Cesium.HeightReference.NONE,
                        verticalOrigin: Cesium.VerticalOrigin.TOP,
                        pixelOffset: new Cesium.Cartesian2(50, 0),
                    },
                });
                // AllEnities.push(strartpoint);
            }

            if ( polylinePath.length > 1) {
                var text = 0;
                /* text =
                    sum(disNums) +
                    Number(
                        getLineDis(polylinePath[0], polylinePath[1])
                    );
                disNums.push(
                    getLineDis(polylinePath[0], polylinePath[1])
                ); */
                var temppoint = viewer.entities.add({
                    position: point,
                    point: {
                        heightReference:
                            Cesium.HeightReference.CLAMP_TO_GROUND,
                        show: true,
                        color: Cesium.Color.SKYBLUE,
                        pixelSize: 3,
                        outlineColor: Cesium.Color.YELLOW,
                        outlineWidth: 1,
                    },
                    label: {
                        // text: text.toFixed(2).toString() + "公里",
                        text: "公里",
                        font: "14pt monospace",
                        color: Cesium.Color.RED,
                        backgroundColor: Cesium.Color.CORAL,
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        outlineWidth: 2,
                        //垂直位置
                        heightReference: Cesium.HeightReference.NONE,
                        verticalOrigin: Cesium.VerticalOrigin.TOP,
                        pixelOffset: new Cesium.Cartesian2(50, 0),
                    },
                });
                // AllEnities.push(temppoint);

                var polyline = viewer.entities.add({
                    polyline: {
                        show: true,
                        positions: polylinePath,
                        material: new Cesium.PolylineOutlineMaterialProperty(
                            {
                                color: Cesium.Color.RED,
                            }
                        ),
                        width: 2,
                    },
                });
                // AllEnities.push(polyline);
                // LineEntities.push(polyline); //加直线
                var lastpoint = polylinePath[polylinePath.length - 1];
                // polylinePath = [lastpoint]; //只有两个点
            }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
  },
};
</script>

<style scoped>
.map-all {
  height: 100%;
}
#cesiumContainer {
  /* height: 450px; */
  height: 100%;
  width: 100%;
  margin: 0px auto;
  padding: 20px;
  /* box-sizing: border-box; */
  /* 影响了height为100% */
  /* position: relative; */
  /* top: 30px;
	left: 30px; */
}
#liney {
  height: 30px;
  width: 30px;
  background-color: cadetblue;
  position: fixed;
  bottom: 50px;
  right: 50px;
}
#mapPlugins{
  width: 500px;
  height: 500px;
  position: absolute;
  right: 10px;
  top: 50px;
  background-color: rgba(255, 127, 80, 0.479);
}
</style>

