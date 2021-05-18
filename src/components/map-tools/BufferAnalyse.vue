<template>
    <div id="buffer">
        <!-- 测量面板 -->
        <!-- <i class="iconfont iconyhdrawSpace1"></i> -->
<!-- 
        <i class="iconfont iconyhdrawSpace1" @click="startMeasure('length')">点</i>

        <i class="iconfont iconyhdrawSpace1" @click="startMeasure('area')">线</i>
        <i class="iconfont iconyhdrawSpace1" @click="startMeasure('area')">面</i> -->
        
        <el-tabs type="border-card">
            <el-tab-pane label="点">
                <!-- 后续单位要改为可选 m/km -->
                <el-input v-model="bufferRadius"></el-input> 
                <el-button @click="startBuffer('point')">生成缓冲区</el-button>
                <el-button @click="removeGraphic(bufferRadius,'point')">清除</el-button>
            </el-tab-pane>
            <el-tab-pane label="线">配置管理</el-tab-pane>
            <el-tab-pane label="面">角色管理</el-tab-pane>
        </el-tabs>
        
    </div>
</template>

<script>
import * as yBuffer from "./tool-buffer";
export default {
    name: "BufferAnalyse",
    data() {
        return {
            // data:"aa",
            myHandler: "",
            bufferGenerator: "",
            drawStatus: false,

            bufferRadius:1,
        };
    },
    mounted() {
        //先等待视图加载完成
        // this.PolyGenerator = new MeasureTools.PolylineGenerator();
        // this.PolygonGenerator = new MeasureTools.PolygonGenerator();
    },
    methods: {
        startBuffer(type){
            console.log('start');
            if (this.drawStatus == true) {
                return;
            } else {
                this.drawStatus = true;
                var myCanvas = window.viewer.scene.canvas;
                this.myHandler = new Cesium.ScreenSpaceEventHandler(myCanvas);
                var polylinePath = [];

                if (type === "point") {
                    this.bufferGenerator = new yBuffer.PointBuffer(
                        window.viewer,
                        {}
                    );
                } else if (type === "line") {
                    this.bufferGenerator = new yBuffer.LineBuffer(
                        window.viewer,
                        {}
                    );
                }
                this.myHandler.setInputAction(
                    this.onLeftClick,
                    Cesium.ScreenSpaceEventType.LEFT_CLICK
                );
                /* this.myHandler.setInputAction(
                    this.onMouseMove,
                    Cesium.ScreenSpaceEventType.MOUSE_MOVE
                ); */ 
                this.myHandler.setInputAction(
                    this.onRightClick,
                    Cesium.ScreenSpaceEventType.RIGHT_CLICK
                );
            }
            // let r1 = 
            // console.log(r1); 字符串转数字
        },
      
      
     
        onLeftClick(event) {
            // 在函数这里传入event,而不是在click调用时
            this.bufferGenerator.drawX(event,'leftClick',this.bufferRadius);
        },
        onMouseMove(event) {
            this.PolyGenerator.addLine(event);
        },
        onRightClick(event) {
            this.bufferGenerator.drawX(event,'rightClick',this.bufferRadius);
        },
        //清除后默认结束本次测量
        removeGraphic() {
            if (this.bufferGenerator !== "") {
                this.bufferGenerator.removeLine();
                this.endMeasure();
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
            //重置绘制状态
            this.drawStatus = false;
        },
    },
};
</script>

<style>
#buffer {
    position: absolute;
    right: 30px;
    top: 50px;
    background-color: cadetblue;
    /* height: 100px; */
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.iconfont {
    font-size: 25px !important;
    margin-bottom: 20px;
}
</style>