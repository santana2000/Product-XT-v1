//同一个函数，传入不同参数 
//  1.类型是 点，需要半径
// 不管啥类型  参数都是缓冲半径
let turf = require('@turf/turf')
const Cesium = window.Cesium;

//配置缓冲区颜色和entity样式
const color = Cesium.Color.fromCssColorString("rgba(225,65,64,0.4)");

class PointBuffer {
    constructor(viewer, options) {
        this.viewer = viewer;
        this.options = options;
        this.color = color;
        // this.options.point = POINT_STYLE;
        // this.options.polyline = LINE_STYLE;
        // this.options.label = LABEL_STYLE;
        // this.options.r = options.r;

        this.bufferPoint = [];
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
    //x区分左右键点击,r设置缓冲半径
    drawX(event, x,r) {
        let lat;
        let lon;
        let bufferPoint = new Array();
        let tempPoint = this.getTempPosition(event, 'tempPoint');
        if (tempPoint) {
            let cartographic = window.viewer.scene.globe.ellipsoid.cartesianToCartographic(tempPoint);
            lat = parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(6));
            lon = parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(6));
        }
        // 左键画点，右键画缓冲区
        if(x === 'leftClick') {
            //把点位添加至数组中
            this.bufferPoint = [];
            this.viewer.entities.add({
                position : Cesium.Cartesian3.fromDegrees(lon, lat),
                point:{
                    pixelSize:5,
                    color:Cesium.Color.fromCssColorString("rgba(225,243,0,1)"),
                    outlineColor:this.color,
                    height:20,
                    outlineWidth:2
                }
            })
            bufferPoint = [lon,lat];
            this.bufferPoint = [lon,lat];

        }else if (x === 'rightClick') {
            // console.log(this.bufferPoint,'bufferPoint---222');   //传值与传引用
            this.drawBuffer(this.bufferPoint,r)
        }  
    }
    drawBuffer(poi,r){
        let point = turf.point(poi);
        var buffer = turf.buffer(point, r, {units: 'miles'});
        let bufferArr = [];
        //把turf生成的缓冲区多边形坐标数组转为cesium绘制需要的坐标数组
        for (const item of buffer.geometry.coordinates[0]) {
            bufferArr.push(item[0]);
            bufferArr.push(item[1]);
        }
        this.viewer.entities.add({
            polygon:{
                hierarchy : Cesium.Cartesian3.fromDegreesArray(bufferArr),
                outline: true,
                height:10,
                color:this.Color,
                // outlineColor:green,
                outlineWidth:2,
                material: Cesium.Color.fromCssColorString("rgba(225,65,64,0.4)")
            }

        })
    }
    
    //右键关闭handler

    restart() {
        this.pointArr = [];
        this.tempLineArr = [];
        this.sumDistance = 0;
    }

    removeLine() {
        this.viewer.entities.removeAll();  //移除所有
    }



}

class LineBuffer {
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
            if (x === 'rightClick' || x === 'restart') {
                return finalLineArr;
            }
            return this.pointArr;
        };
        this.firstClick = true;

        if (x === 'rightClick') {
            finalLineArr = this.pointArr;  //连续多次测量，保证上次的不被清空
            this.firstClick = false;  //如果是右键 就不操作
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

    drawBuffer(){
        let ypoint = turf.point([-90.548630, 14.616599]);
            var buffered = turf.buffer(ypoint, 10, {units: 'miles'});
            
            for (const item of buffer.geometry.coordinates[0]) {
                
            }
            let bufferArr = [];
            this.drawGraphics(bufferArr)
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



}

class PolygonBuffer {
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
            if (x === 'rightClick' || x === 'restart') {
                return finalLineArr;
            }
            return this.pointArr;
        };
        this.firstClick = true;

        if (x === 'rightClick') {
            finalLineArr = this.pointArr;  //连续多次测量，保证上次的不被清空
            this.firstClick = false;  //如果是右键 就不操作
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

    drawBuffer(){
        let ypoint = turf.point([-90.548630, 14.616599]);
            var buffered = turf.buffer(ypoint, 10, {units: 'miles'});
            
            for (const item of buffer.geometry.coordinates[0]) {
                
            }
            let bufferArr = [];
            this.drawGraphics(bufferArr)
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



}
 
export {PointBuffer,LineBuffer,PolygonBuffer}