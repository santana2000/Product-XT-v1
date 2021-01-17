<template>
  <div class="map-all">
        <div id="cesiumContainer"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'MapContainer',
  components: {
    
  },
    data(){
        return {
            //搜索框输入值
            searchValue:'',


        };
    },
    mounted(){
this.initViewer();
    },
    methods:{
                    // 初始化viewer对象
            initViewer() {
                window.viewer = new Cesium.Viewer('cesiumContainer', {
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
                    imageryProvider: new Cesium.UrlTemplateImageryProvider({
                        // url: window.GlobalConfig.BASE_IMAGE_URL,
                        url: 'https://mt0.google.cn/maps/vt?lyrs=s%40781&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&src=app&scale=2'
//                        tilingScheme : new Cesium.GeographicTilingScheme()
                    })
                });
                // this.viewerStatus = true;
                viewer.scene.globe.showGroundAtmosphere = false;

                //去掉logo
                viewer._cesiumWidget._creditContainer.style.display = "none";
                //取消默认的双击追踪entity
                viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

                // 添加注记图层
                /* viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                     url: window.GlobalConfig.BASE_LABEL_URL
                 }));*/

                viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(108, 33, 4500000)
                });
            },
            
    }
}
</script>

<style scoped>
.map-all{
  height: 100%;
}
#cesiumContainer{
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
</style>>