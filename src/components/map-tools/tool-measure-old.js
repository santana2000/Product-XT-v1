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
        this.firstClick = true;
    }

    //点击获取球上位置
    getTempPosition(event, poiType) {
        let ray;
        let tempPoint;
        if (poiType == 'tempPoint') {
            ray = this.viewer.scene.camera.getPickRay(event.position);
        } else if (poiType == 'tempLine') {
            ray = this.viewer.scene.camera.getPickRay(event.endPosition);
        }
        if (ray) {
            tempPoint = this.viewer.scene.globe.pick(ray, this.viewer.scene);
        }
        if (tempPoint) {
            return tempPoint
        }
    }
    //点击一次绘制点和线，final为右键结束该线路，restart点击清除所有绘制,x区分左右键点击
    addPoint(event, x) {
        let finalLineArr = [];  //多次测量时保存上次的折线
        let updatePoi = () => {
            if (x === 'final' || x === 'restart') {
                return finalLineArr;
            }
            return this.pointArr;
        };
        this.firstClick = true;

        if (x === 'rightClick') {
            finalLineArr = this.pointArr;  //连续多次测量，保证上次的不被清空
            this.firstClick = false;
        } else if (x === 'restart') {
            //清除上一次，多次绘制后的最后一条线段
            finalLineArr = [];
            this.options.polyline.positions = new Cesium.CallbackProperty(
                updatePoi,
                false
            );
            const entityLine = this.viewer.entities.add({
                polyline: this.options.polyline,
            });
            return;
        }

        let tempPoint = this.getTempPosition(event, 'tempPoint');
        //把点位添加至数组中
        if (tempPoint) {
            this.pointArr.push(tempPoint);
            //是否为起点
            if (this.pointArr.length === 1 && this.firstClick) {
                this.options.label.text = '起点';
                this.options.position = this.pointArr[0];
                const entity = this.viewer.entities.add(this.options);
                //当前点设置为移动绘制线的数组起点
                this.tempLineArr[0] = this.pointArr[this.pointArr.length - 1];
                this.firstClick = true;
            } else if(this.pointArr.length>1){
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

                if (this.pointArr.length > 1) {
                    this.options.polyline.positions = new Cesium.CallbackProperty(
                        updatePoi,
                        false
                    );
                    //只更新位置数组，这个entity始终没变
                    const entityLine = this.viewer.entities.add({
                        polyline: this.options.polyline,
                    });
                }
                this.tempLineArr[0] = this.pointArr[this.pointArr.length - 1];
                // this.firstClick = true;

            }
        }
    }
    //跟随鼠标移动动态绘制临时线段
    addLine(event) {
        //防止鼠标直接移入界面时获取不到值报错
        if (this.pointArr.length !== 0) {
            // this.tempLineArr.push(this.pointArr[this.pointArr.length - 1]); //面积
            let tempPoint = this.getTempPosition(event, 'tempLine');
            if (tempPoint) {
                this.tempLineArr[1] = tempPoint;
                let updatePoi = () => {  //如何抽取为公共函数？
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

    /*  clearLastestArr() {
        let fo = this.addPoint(event, 'restart');
        fo();
        console.log('en');
    } */

    restart() {
        this.pointArr = [];
        this.tempLineArr = [];
        this.sumDistance = 0;
    }

    removeLine() {
        console.log('line已清除');
        this.viewer.entities.removeAll();  //移除所有
        //  viewer.zoomTo(rainEntity);   //居中显示
        // 销毁handler
    }

    getDistance(poi1, poi2) {
        let p1 = this.getCartographic(poi1);
        let p2 = this.getCartographic(poi2);
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

    /* changeFinalArr() {
        var finalLineArr = [];
        function getArr() {
            return finalLineArr;
        }
        function reSetArr() {
            finalLineArr = [];
        }
    } */

}


class PolygonGenerator {
    constructor(viewer, options) {
        this.viewer = viewer;
        this.options = options;
        this.options.point = POINT_STYLE;
        this.options.polyline = LINE_STYLE;
        this.options.label = LABEL_STYLE;

        this.pointArr = [];       //多边形顶点集合
        this.tempLineArr = [];    //实时绘制折线，永远保持三个值
        this.sumArea = 0;         //绘制完成后用truf一次性计算
        this.firstClick = true; 
    }
        //点击获取球上位置
    getTempPosition(event, poiType) {
        let ray;
        let tempPoint;
        if (poiType == 'tempPoint') {
            ray = this.viewer.scene.camera.getPickRay(event.position);
        } else if (poiType == 'tempLine') {
            ray = this.viewer.scene.camera.getPickRay(event.endPosition);
        }
        if (ray) {
            tempPoint = this.viewer.scene.globe.pick(ray, this.viewer.scene);
        }
        if (tempPoint) {
            return tempPoint
        }
    }
    addPoint(event,x){
        this.pointArr.push(tempPoint);

        //第一层  当数组长度为一时，判断左键还是右键点击
        if (this.pointArr.length === 1){
            if(x === 'rightClick'){
                return;
            }else if (x === 'restart'){

            }else{
                this.options.label.text = '起点';
                this.options.position = this.pointArr[0];
                const entity = this.viewer.entities.add(this.options);
            }
        }else if(this.pointArr.length > 1){
            if(x === 'rightClick'){
                 //stop draw ...
            }else if(x === 'leftClick'){
                //draw polygon...
            }else if (x === 'restart'){
                //clear finalArr
            }
        }
         
        //第二层  如果是左键点击，判断是不是起点
        //绘制完成后用truf一次性计算
        this.pointArr.push(tempPoint);
        //是否为起点
        if (this.pointArr.length === 1 && this.firstClick) {
            this.options.label.text = '起点';
            this.options.position = this.pointArr[0];
            const entity = this.viewer.entities.add(this.options);
            //当前点设置为移动绘制线的数组起点
            this.tempLineArr[0] = this.pointArr[this.pointArr.length - 1];
            this.firstClick = true;
        } else if(this.pointArr.length>1){
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

            if (this.pointArr.length > 1) {
                this.options.polyline.positions = new Cesium.CallbackProperty(
                    updatePoi,
                    false
                );
                //只更新位置数组，这个entity始终没变
                const entityLine = this.viewer.entities.add({
                    polyline: this.options.polyline,
                });
            }
            this.tempLineArr[0] = this.pointArr[this.pointArr.length - 1];
            // this.firstClick = true;

        }
        //...

        //点击右键添加面积label
        
        //多个点，将点击的点与每一个已绘制的点进行连线
        //删除上一个点连线过得所以线段
        //不再是添加线的思路，而是直接根据点集绘制多边形


    }
    addPolygon(){

    }

}

export { PolylineGenerator,PolygonGenerator }

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