<template>
    <div id="mouse-position">
        <div class="lon-lat">
            <div class="mouse-lon">
                <!-- {{ nowLon }} -->
                 {{ nowLonDFM }}, 
                </div>
            <div class="mouse-lat">
                <!-- {{ nowLat }} -->
                 {{ nowLatDFM }} 
                </div>
        </div>

        <div class="viewer-level">
            {{ nowLevel }}
        </div>
    </div>
</template>

<script>
import * as CVTLonLatFormat from "@/js/map/CVTLonLatFormat.js";
export default {
    name: "MousePoi",
    components: {},

    data() {
        return {
            nowLon: "",
            nowLat: "",
            nowLevel: "",
            nowLonDFM: "",
            nowLatDFM: "",
        };
    },
    mounted() {
        this.poiChange();
        this.viewerChange();
    },
    methods: {
        poiChange() {
            let canvas = window.viewer.scene.canvas;
            let handler = new Cesium.ScreenSpaceEventHandler(canvas);
            handler.setInputAction(
                this.getPoi,
                Cesium.ScreenSpaceEventType.MOUSE_MOVE
            );
        },

        getPoi(movement) {
            let ellipsoid = window.viewer.scene.globe.ellipsoid;

            let cartesian = window.viewer.camera.pickEllipsoid(
                movement.endPosition,
                ellipsoid
            );
            if (cartesian) {
                //将笛卡尔三维坐标转为地图坐标（弧度）
                let cartographic = window.viewer.scene.globe.ellipsoid.cartesianToCartographic(
                    cartesian
                );
                //将地图坐标（弧度）转为十进制的度数
                this.nowLat = Cesium.Math.toDegrees(
                    cartographic.latitude
                ).toFixed(3);
                this.nowLon = Cesium.Math.toDegrees(
                    cartographic.longitude
                ).toFixed(3);
                this.nowLatDFM = CVTLonLatFormat.degreeToDFM(this.nowLat);
                this.nowLonDFM = CVTLonLatFormat.degreeToDFM(this.nowLon);
            }
        },
        viewerChange() {
            window.viewer.camera.changed.addEventListener(() => {
                this.nowLevel = this.getZoom();
            });
        },
        getZoom() {
            let ellipsoid = window.viewer.scene.globe.ellipsoid;
            //相机为位置的获取
            let cameraHeight = ellipsoid.cartesianToCartographic(
                window.viewer.camera.position
            ).height;
            let moveRate = cameraHeight / 1000.0;
            if (moveRate > 10123) {
                return 2;
            } else if (moveRate > 7123) {
                return 3;
            } else if (moveRate > 6321) {
                return 4;
            } else if (moveRate > 5522) {
                return 5;
            } else if (moveRate > 3436) {
                return 6;
            } else if (moveRate > 539) {
                return 7;
            } else if (moveRate > 305) {
                return 8;
            } else if (moveRate > 180) {
                return 9;
            } else if (moveRate > 133) {
                return 10;
            } else if (moveRate > 100) {
                return 11;
            } else if (moveRate > 76.5) {
                return 12;
            } else if (moveRate > 58.2) {
                return 13;
            } else if (moveRate > 23.5) {
                return 14;
            } else if (moveRate > 9.6) {
                return 15;
            } else if (moveRate > 4) {
                return 16;
            } else if (moveRate > 2) {
                return 17;
            } else if (moveRate > 1.7) {
                return 18;
            } else {
                return 18;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#mouse-position {
    position: absolute;
    left: 20px;
    bottom: 20px;
    z-index: 99;
    background-color: rgba(255, 228, 196, 0.623);
    border-radius: 5px;
    height: 7%;
    width: 220px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 15px;
    .lon-lat{
        width: 300px;
        display: flex;
    justify-content: flex-start;


        .mouse-lon {
            font-size: 18px;
            color: black;
        }
        .mouse-lat {
            font-size: 18px;
            color:black ;
        }
        
    }
    .viewer-level {
            font-size: 18px;
            color: cadetblue;
            // width: 100px;
            
        }
}
</style>
