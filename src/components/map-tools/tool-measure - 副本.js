//
//  点击进入测量状态（传入参数、距离还是面积）
//  创建 handler
//  为handler绑定点击事件 （左、移动、右）
//  抽取事件对应的函数（传参不同，函数执行内容不同）


//  移除handler

/* setInpution(onclick,left_click)
setInpution(onmove,move)
setInpution(onclick,right_click)
onclick (){
    switch (key) {
        case LINE:
            PolylineGenerator.a
            break;
        case area:
            PolygonGenerator.a
            break;
        default:
            break;
    }
} */

//获取Cesium对象，在index.html中引入过
const Cesium = window.Cesium;

const COLOR = Cesium.Color.fromCssColorString("rgba(247,224,32,0.6)");

const LABEL_STYLE = {
    font: "36px sans-serif",
    fillColor: Cesium.Color.WHITE,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    //outlineWidth: 2,
    showBackground: true,
    scale: 0.5,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    pixelOffset: new Cesium.Cartesian2(20, -20),
    heightReference: Cesium.HeightReference.NONE,
}
const POINT_STYLE = {
    pixelSize: 8,
    color: COLOR,
}
const LINE_STYLE = {
    positon: [],
    width: 5,
    material: Cesium.Color.RED,
    // scale: 13
}

class PolylineGenerator {
    constructor(viewer, options) {
        this.viewer = viewer;
        this.options = options;
        this.options.point = POINT_STYLE;
        this.options.polyline = LINE_STYLE;
        this.options.label = LABEL_STYLE;

        this.pointArr = [];
        this.linePointArr = [];
    }
    getTempPosition(event,poiType) {
        //获取位置
        // console.log(event, "event---");
        // console.log(event.position, "position---");
        let position;
        let cartographic;
        if (poiType == 'tempLine' ) {
            let ray = this.viewer.scene.camera.getPickRay(event.endPosition);   
        }else{
            let ray = this.viewer.scene.camera.getPickRay(event.position);
        }
        // console.log(ray, "ray---");
        if (ray) position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
        // console.log(position, "cartesian3---");
        if (position)
            // cartographic = Cesium.Cartographic.fromCartesian(position);
            // cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(
            cartographic = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(
                position
            );
        // console.log(cartographic, 'cartographic---');
        if (cartographic) {
            let height = this.viewer.scene.globe.getHeight(cartographic);
            var tempPoint = Cesium.Cartesian3.fromDegrees(
                (cartographic.longitude / Math.PI) * 180,
                (cartographic.latitude / Math.PI) * 180,
                height
            );
        }
        return tempPoint
    }
    addPoint(event) {
        // let tempPOI = this.getTempPosition();
        // console.log('已进入addpoint');
        let tempPoint = this.getTempPosition(event);
        //把点位添加至数组中
        this.pointArr.push(tempPoint);

        //是否为起点
        if (this.pointArr.length === 1) {
            //label为起点
            this.options.label.text = '起点';
            this.options.position = this.pointArr[0];
            const entity = this.viewer.entities.add(this.options);
        } else {
            //label为距离
            // let distance = 0;
            // distance += distance
            LABEL_STYLE.text = 'distance';
            // this.options.position = this.pointArr[1];
            const entityPoint = this.viewer.entities.add({
                position: this.pointArr[this.pointArr.length - 1],
                point: this.options.point,
                label: this.options.label
            });
            // this.addLine()
            let updatePoi = ()=> {
                return this.pointArr;
            };
            if (this.pointArr.length > 1) {
                console.log(this.pointArr, '222222');
                this.options.polyline.positions = new Cesium.CallbackProperty(
                    updatePoi,
                    false
                );
                const entityLine = this.viewer.entities.add({
                    polyline: this.options.polyline,
                    
                });
                // this.pointArr.pop();
                // 画线
                // 实时更新polyline.positions
                // this.pointArr = new Cesium.CallbackProperty(
                //     this.update,
                //     false
                // );
                // console.log(this.pointArr, 'this.pointArrthis.pointArrthis.pointArrthis.pointArrline222');
                // this.options.polyline.position = this.pointArr;
                // console.log(this.options.polyline.position, 'this.options.polyline.position');
                // console.log(this.options, 'this.options');
                // const entity = this.viewer.entities.add(this.options);
    
            }
            //回调，画完之后再删除
            /* setTimeout(()=>{
                this.pointArr.shift();
            },1) */

        }
    }
    addLine(event) {
        //move时，不停的画线（数组持续更新）
        // this.pointArr[1] = tempPoint;
        this.getTempPosition();
        
        console.log('line111');
        console.log(Cesium.Cartesian3.fromDegreesArray([-77, 35, -77.1, 35]), ' Cesium.Cartesian3.fromDegreesArray([-77, 35,-77.1, 35]),');
        //click时，画最终线
        //有两个点才画线，画完清除上一个点，让线数组始终保持两个点
        if (this.pointArr.length > 1) {
            console.log(this.pointArr, '222222');
            this.options.polyline.positions = new Cesium.CallbackProperty(
                updatePoi,
                false
            );
            const entityLine = this.viewer.entities.add({
                polyline: this.options.polyline,
                
            });

            console.log('jjah');
            // this.pointArr.pop();
            // 画线
            // 实时更新polyline.positions
            // this.pointArr = new Cesium.CallbackProperty(
            //     this.update,
            //     false
            // );
            // console.log(this.pointArr, 'this.pointArrthis.pointArrthis.pointArrthis.pointArrline222');
            // this.options.polyline.position = this.pointArr;
            // console.log(this.options.polyline.position, 'this.options.polyline.position');
            // console.log(this.options, 'this.options');
            // const entity = this.viewer.entities.add(this.options);

        }
        // this.pointArr.pop();

    }
    removeLine() {
        console.log('line已清除');

        //  viewer.entities.removeAll();  //移除所有
        //  viewer.zoomTo(rainEntity);   //居中显示
    }

}


/* class PolygonGenerator {

} */

export { PolylineGenerator }

