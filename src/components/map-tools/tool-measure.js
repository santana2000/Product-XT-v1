//  点击进入测量状态（传入参数、距离还是面积）
//  创建 handler
//  为handler绑定点击事件 （左、移动、右）
//  抽取事件对应的函数（传参不同，函数执行内容不同
//  移除handler

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
    width: 2,
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
        this.tempLineArr = [];  //实时绘制线，永远保持两个值
        this.sumDistance = 0;
    }
    getTempPosition(event, poiType) {
        //获取位置
        // console.log(event, "event---");
        // console.log(event.position, "position---");
        let ray;
        let position;
        let tempPoint;
        let cartographic;
        if (poiType == 'tempPoint') {
            ray = this.viewer.scene.camera.getPickRay(event.position);
        } else if (poiType == 'tempLine') {
            ray = this.viewer.scene.camera.getPickRay(event.endPosition);
        }
        // console.log(ray, "ray---");
        if (ray) {
            // position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
            tempPoint = this.viewer.scene.globe.pick(ray, this.viewer.scene);
        } 
        // console.log(position, "cartesian3---");
        /* if (position) {
            // cartographic = Cesium.Cartographic.fromCartesian(position);
            cartographic = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(
                position
            );
            console.log(cartographic, 'cartographic---');
        }
        if (cartographic) {
            let height = this.viewer.scene.globe.getHeight(cartographic);
            tempPoint = Cesium.Cartesian3.fromDegrees(
                (cartographic.longitude / Math.PI) * 180,
                (cartographic.latitude / Math.PI) * 180,
                height
            );
            console.log(tempPoint, 'tempPoint----');
        } */
        // return tempPoint

        if(tempPoint){
            return tempPoint
        }
    }
    addPoint(event) {
        let tempPoint = this.getTempPosition(event, 'tempPoint');
        //把点位添加至数组中
        if (tempPoint) {
            this.pointArr.push(tempPoint);
            //是否为起点
            if (this.pointArr.length === 1) {
                this.options.label.text = '起点';
                this.options.position = this.pointArr[0];
                const entity = this.viewer.entities.add(this.options);
                this.tempLineArr[0] = this.pointArr[this.pointArr.length - 1];
            } else {
                let tempDistance = this.getDistance(
                    this.pointArr[this.pointArr.length - 2],
                    this.pointArr[this.pointArr.length - 1]
                );
                this.sumDistance += tempDistance;
                this.options.label.text = this.sumDistance.toFixed(2);

                const entityPoint = this.viewer.entities.add({
                    position: this.pointArr[this.pointArr.length - 1],
                    point: this.options.point,
                    label: this.options.label
                });
                let updatePoi = () => {
                    return this.pointArr;
                };
                if (this.pointArr.length > 1) {
                    this.options.polyline.positions = new Cesium.CallbackProperty(
                        updatePoi,
                        false
                    );
                    const entityLine = this.viewer.entities.add({
                        polyline: this.options.polyline,
                    });
                }
                this.tempLineArr[0] = this.pointArr[this.pointArr.length - 1];
            }
        }
    }
    addLine(event) {
        //防止鼠标直接移入界面时获取不到值报错
        if (this.pointArr.length !== 0) {
            // this.tempLineArr.push(this.pointArr[this.pointArr.length - 1]); //面积
            let tempPoint = this.getTempPosition(event, 'tempLine');
            if (tempPoint) {
                this.tempLineArr[1] = tempPoint;
                let updatePoi = () => {
                    return this.tempLineArr;
                };
                // this.tempLineArr.push(tempPoint);
                // this.tempLineArr.pop();
                if (this.pointArr.length >= 1) {
                    this.options.polyline.positions = new Cesium.CallbackProperty(
                        updatePoi,
                        false
                    );
                    const entityLine = this.viewer.entities.add({
                        polyline: this.options.polyline,
                    });
                }
            }
            // console.log(Cesium.Cartesian3.fromDegreesArray([-77, 35, -77.1, 35]), ' Cesium.Cartesian3.fromDegreesArray([-77, 35,-77.1, 35]),');
        }
    }
    removeLine() {
        console.log('line已清除');

        //  viewer.entities.removeAll();  //移除所有
        //  viewer.zoomTo(rainEntity);   //居中显示
    }
    getDistance(poi1, poi2) {
        let p1 = this.getCartographic(poi1);
        let p2 = this.getCartographic(poi2);
        console.log(p1, p2, 'qq');
        let geodesic = new Cesium.EllipsoidGeodesic();
        geodesic.setEndPoints(p1, p2);
        let tempDistance = (geodesic.surfaceDistance / 1000).toFixed(2);
        tempDistance = parseFloat(tempDistance);
        return tempDistance;
    }
    getCartographic(position) {
        let cartographic
        if (position) {
            cartographic = Cesium.Cartographic.fromCartesian(
                // cartographic = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(
                position
            );
            return cartographic
        }
    }

}


/* class PolygonGenerator {

} */

export { PolylineGenerator }

