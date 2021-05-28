<template>
    <div id="layer-tree">
        <!-- 图层树组件 -->
       <el-tree
       :data="treeData"
  :props="defaultProps"
  show-checkbox
  @check-change="handleCheckChange">
</el-tree>
        
    </div>
</template>

<script>
import * as yBuffer from "./tool-buffer";
export default {
    name: "LayerTree",
    data() {
        return {
            // data:"aa",
            myHandler: "",
            bufferGenerator: "",
            drawStatus: false,

            bufferRadius:1,
            treeData: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
        };
    },
    mounted() {
        //先等待视图加载完成
        // this.PolyGenerator = new MeasureTools.PolylineGenerator();
        // this.PolygonGenerator = new MeasureTools.PolygonGenerator();
    },
    methods: {
        handleCheckChange(){
            //change layer
        },
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