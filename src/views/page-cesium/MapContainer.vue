<template>
    <div class="map-all">
        <div id="cesiumContainer"></div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: "MapContainer",
    components: {},
    data() {
        return {
            //搜索框输入值
            searchValue: "",
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
                imageryProvider: new Cesium.UrlTemplateImageryProvider({
                    url:
                        "http://127.0.0.1:8300/sdc/tiles/image/{z}/{x}/{reverseY}.jpg",
                        // "/myMap/sdc/tiles/image/{z}/{x}/{reverseY}.jpg",
                    tilingScheme:new Cesium.GeographicTilingScheme()

                }),
                /* imageryProvider: new Cesium.UrlTemplateImageryProvider({
                    url:
                        "http://wprd03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=6",
                }),
                */
      
            });
            /*viewer.imageryLayers.addImageryProvider(
                new Cesium.UrlTemplateImageryProvider({
                    url:
                        "http://wprd03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8",
                })
            ); */
            var anno = new Cesium.UrlTemplateImageryProvider({
                    // url: "static/tiles/{z}/{x}/{y}.png"
                    url: "http://127.0.0.1:8300/sdc/tiles/annotation/{z}/{x}/{reverseY}.png",
                    tilingScheme: new Cesium.GeographicTilingScheme()
                });
            viewer.imageryLayers.addImageryProvider(anno);

            viewer.scene.globe.showGroundAtmosphere = false;
            //去掉logo
            viewer._cesiumWidget._creditContainer.style.display = "none";
            //取消默认的双击追踪entity
            viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
                Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
            );
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(
                    116,
                    39.521196,
                    500000
                ),
            });
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
</style>>

