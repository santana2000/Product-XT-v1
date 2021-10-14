<template>
    <div id="measure">
        <!-- 测量面板 -->
        <!-- <i class="iconfont iconyhdrawSpace1"></i> -->

        <i class="iconfont iconyhdrawLine1" @click="startMeasure('length')"></i>

        <i class="iconfont iconyhdrawSpace2" @click="startMeasure('area')"></i>
        <i class="iconfont iconyhguanbi" @click="removeGraphic()"></i>
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

            drawStatus: false,
            PolylineStatus: false,
            PolygonStatus: false,
        };
    },
    mounted() {
        //先等待视图加载完成
        // this.PolyGenerator = new MeasureTools.PolylineGenerator();
        // this.PolygonGenerator = new MeasureTools.PolygonGenerator();
    },
    methods: {
        startMeasure(type) {
            //防止多次重复点击绘制按钮
            if (type === "length") {
                if (this.drawStatus && this.PolylineStatus) {
                    return;
                }
                // if (this.PolylgonStatus) {
                //     this.endMeasure();
                //     this.PolylgonStatus = false;
                // }
                if(this.myHandler != ''){
                this.endMeasure();

                }
                this.drawStatus = true;
                this.PolylineStatus = true;
                this.PolylgonStatus = false;
                // this.endMeasure();
                this.PolyGenerator = new MeasureTools.PolylineGenerator(
                    window.viewer,
                    {}
                );
                /* var myCanvas = window.viewer.scene.canvas;
                this.myHandler = new Cesium.ScreenSpaceEventHandler(myCanvas); */
                console.log("line-测量开始");
            } else if (type === "area") {
                if (this.drawStatus && this.PolylgonStatus) {
                    return;
                }
                /* if (this.PolylineStatus) {
                    this.endMeasure();
                    this.PolylineStatus = false;
                } */
                if(this.myHandler != ''){
                this.endMeasure();

                }

                this.drawStatus = true;
                this.PolylgonStatus = true;
                this.PolylineStatus = false; 
                console.log("area-测量开始");
                this.PolyGenerator = new MeasureTools.PolygonGenerator(
                    window.viewer,
                    {}
                );

                /* var myCanvas = window.viewer.scene.canvas;
                this.myHandler = new Cesium.ScreenSpaceEventHandler(myCanvas); */
            }

            // let myCanvas = window.viewer.scene.canvas;
            var myCanvas = window.viewer.scene.canvas;

            this.myHandler = new Cesium.ScreenSpaceEventHandler(myCanvas);
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
            console.log(this.myHandler,'old');
        },
         
        onLeftClick(event) {
            // 在函数这里传入event,而不是在click调用时
            this.PolyGenerator.addPoint(event);
        },
        onMouseMove(event) {
            this.PolyGenerator.addLine(event);
        },
        onRightClick(event) {
            this.PolyGenerator.addPoint(event, "rightClick");
            this.PolyGenerator.restart();
        },
        //清除后默认结束本次测量
        removeGraphic() {
            if (this.PolyGenerator !== "" && this.myHandler != '') {
                console.log(this.PolyGenerator,'zzz111111');
                console.log(this.myHandler,'zzz13333333333');
                this.endMeasure();

                //还要再判断一下有没有绘制图形
                this.PolyGenerator.removeLine();


                // ????
                // this.PolyGenerator.addPoint(event, "restart"); //清除上次绘制的一组中的最后一条（清空finalArr数组）
            }
        },

        endMeasure() {
            this.myHandler.removeInputAction(
                Cesium.ScreenSpaceEventType.MOUSE_MOVE
            );
            this.myHandler.removeInputAction(
                Cesium.ScreenSpaceEventType.LEFT_CLICK
            );
            this.myHandler.removeInputAction(
                Cesium.ScreenSpaceEventType.RIGHT_CLICK
            );
            // this.myHandler = ''
            //重置绘制状态
            this.drawStatus = false;
        },
    },
};
</script>

<style scoped>
#measure {
    position: absolute;
    right: 30px;
    top: 50px;
    background-color: cadetblue;
    /* height: 180px; */
    width: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.iconfont {
    font-size: 32px !important;
    margin-bottom: 20px;
}
</style>