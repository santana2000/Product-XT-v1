<template>
    <div class="mapContainer">
        <div id="cesiumContainer">
            <PlaceSearch></PlaceSearch>
            <MousePoi v-if="showPoi"></MousePoi>
            
        </div>
        <!-- 图层树 -->
        <div id="mapLayerTree">
            <!-- 如果用if,每次都会重新挂载一次，导致底图也重新加载，而不是直接叠加 -->
            <LayerTree v-show="showTree"></LayerTree>
        </div>
        <!-- 插件 -->
        <div id="mapPlugins">
            <!-- vuex显隐版插件 -->
            <Measure v-show="showMeasure"></Measure>
            <Draw v-show="showDraw"></Draw>
            <BufferAnalyse v-show="showBuffer"></BufferAnalyse>
            <!-- vuex显隐版插件 -->

            <!-- bus显隐版插件 -->
            <!-- <Measure v-show="measureSymbol"></Measure> -->
            <!-- <Draw v-show="drawSymbol"></Draw> -->
            <!-- bus显隐版插件 -->

            <!-- 路由版插件 -->
            <!-- <router-view></router-view> -->
            <!-- 路由版插件 -->
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Draw from "@/components/map-tools/Draw.vue";
import Measure from "@/components/map-tools/Measure.vue";
import BufferAnalyse from "@/components/map-tools/BufferAnalyse.vue";
import MousePoi from "@/components/map-tools/MousePoi.vue";
import PlaceSearch from "@/components/map-tools/PlaceSearch.vue";
import LayerTree from "@/components/map-tools/LayerTree.vue";
import yBus from "@/js/common/bus.js";

export default {
    name: "MapContainer",
    components: { Draw, Measure, BufferAnalyse, MousePoi, LayerTree, PlaceSearch},
    data() {
        return {
            //搜索框输入值
            searchValue: "",
            //绘制
            polylinePath: [],

            measureSymbol: false, //测量显隐标识
            drawSymbol: false, //标绘显隐标识
        };
    },
    mounted() {
        this.initViewer();

        /* yBus.$on('showMeasureTool', (para) => {
        console.log('bus = ok');
        if(para === 'measure'){
            this.measureSymbol = !this.measureSymbol;
        }else if(para === 'draw'){
            this.drawSymbol = !this.drawSymbol;
        }
        }) */
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
                terrainProvider: new Cesium.EllipsoidTerrainProvider(),
                // 地形能否走SDC，还是直接用webapps发布

                imageryProvider: window.gd_imglayer,
            });
            this.$store.commit(`loadViewerSuccess`);
            window.viewer.scene.debugShowFramesPerSecond = true; //显示帧率


            window.gd_imglayer = viewer.imageryLayers.addImageryProvider(
                new Cesium.UrlTemplateImageryProvider({
                    url:
                        "http://wprd03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=6",
                })
            );
            window.gd_annolayer = viewer.imageryLayers.addImageryProvider(
                new Cesium.UrlTemplateImageryProvider({
                    url:
                        "http://wprd03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8",
                })
            );

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
            // viewer.camera.flyTo({
            //   destination: Cesium.Cartesian3.fromDegrees(116, 39.521196, 20000000),
            // });
        },
    },
    computed: {
        showMeasure() {
            return this.$store.state.measureSymbol;
        },
        showDraw() {
            return this.$store.state.drawSymbol;
        },
        showBuffer() {
            if (this.$store.state.viewerLoadStatus) {
                return this.$store.state.bufferAnalyse;
            } else {
                return;
            }
        },
        showTree() {
            return this.$store.state.layerTree;
        },
        showPoi() {
            return this.$store.state.viewerLoadStatus;
        },
    },
};
</script>

<style scoped>
.mapContainer {
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
#mapPlugins {
    /* width: 200px; */
    height: 100px;
    /* height: 50%; */
    padding: 10px;
    border-radius: 5px;
    position: absolute;
    right: 30px;
    top: 100px;
    background-color: rgba(231, 195, 182, 0.479);
}
#mapLayerTree {
    width: 150px;
    /* height: 500px; */
    /* height: 50%; */
    position: absolute;
    left: 80px;
    top: 150px;
    background-color: rgba(231, 195, 182, 0.479);
    border-radius: 5px;
}
</style>
