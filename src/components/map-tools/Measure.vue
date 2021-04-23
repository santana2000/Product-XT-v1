<template>
    <div id="measure">
        <!-- 测量面板 -->
        <!-- <i class="iconfont iconyhdrawLine1"></i> -->
         
        <i class="iconfont iconyhdrawSpace1" @click="startMeasure('length')">测量</i>
 
        <!-- <i class="iconfont iconyhdrawSpace2" @click="D()"></i> -->
        <i class="iconfont iconyhdrawLine2" @click="removeGraphic()">清除</i>
        <!-- <i :class=item.src @click="showPlugins"></i> -->
    </div>
</template>

<script>
import * as MeasureTools from "./tool-measure";
export default {
    name: "Measure",
    data() {
        return {
            // data:"aa",
            myHandler: "",
            PolyGenerator: "",
        };
    },
    mounted() {
        //先等待视图加载完成
        // this.PolyGenerator = new MeasureTools.PolylineGenerator();
        // this.PolygonGenerator = new MeasureTools.PolygonGenerator();
    },
    methods: {
        startMeasure(type) {
            console.log("start");
            //单独提取放到mount里
            var myCanvas = window.viewer.scene.canvas;
            this.myHandler = new Cesium.ScreenSpaceEventHandler(myCanvas);
            var polylinePath = [];

            if (type === "length") {
                this.PolyGenerator = new MeasureTools.PolylineGenerator(
                    window.viewer,
                    {}
                );
            } else if (type === "area") {
                // this.PolyGenerator = new MeasureTools.PolylineGenerator(window.viewer,{});
            }

            //***************************** 回调 *****************************/
            this.myHandler.setInputAction(
                this.onLeftClick,
                Cesium.ScreenSpaceEventType.LEFT_CLICK
            );
            this.myHandler.setInputAction(
                this.onMouseMove,
                Cesium.ScreenSpaceEventType.MOUSE_MOVE
            );
            this.myHandler.setInputAction(
                this.onRightClick,
                Cesium.ScreenSpaceEventType.RIGHT_CLICK
            );
        },
        onLeftClick(event) {
            // 在函数这里传入event,而不是在click调用时
            this.PolyGenerator.addPoint(event);
        },
        onMouseMove(event) {
            this.PolyGenerator.addLine(event);
        },
        onRightClick(event) {
            this.PolyGenerator.addPoint(event,'final');
            this.PolyGenerator.restart();

            
        },
        removeGraphic() {
            this.PolyGenerator.removeLine();
            this.endMeasure();
        },
        endMeasure(){
          this.myHandler.removeInputAction(
                Cesium.ScreenSpaceEventType.MOUSE_MOVE
            );
            this.myHandler.removeInputAction(
                Cesium.ScreenSpaceEventType.LEFT_CLICK
            );
            this.myHandler.removeInputAction(
                Cesium.ScreenSpaceEventType.RIGHT_CLICK
            );
        },

        D(event) {
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
            console.log(cartographic, "cartographic---");
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

                if (polylinePath.length > 1) {
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
        },
    },
};
</script>

<style>
#measure {
    position: absolute;
    right: 30px;
    top: 10px;
    background-color: cadetblue;
    /* height: 100px; */
    width: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.iconfont {
    font-size: 25px !important;
    margin-bottom: 20px;
}
</style>