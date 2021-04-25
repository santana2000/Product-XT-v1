const Cesium = window.Cesium;

let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (e) {
    console.log(e.position);
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

/*  获取位置说明
    点击对应event.position
    移动对应movement.endposition
*/

/*  屏幕坐标说明
    获取屏幕坐标,鼠标点击位置距离canvas左上角的像素值
    Cartesian2 {x: 517.3333740234375, y: 205}
        x: 517.3333740234375
        y: 205
        __proto__: Object
 */
function get2Coo(e) {
    return e.position;
};

/*  地表坐标(Cartesian3)说明
    获取的是地图/椭球体表面上的位置 
    Cartesian3 {x: -1948182.0419029165, y: 1530381.9782531322, z: 5857636.413724339}
        x: -1948182.0419029165
        y: 1530381.9782531322
        z: 5857636.413724339
        __proto__: Object
 */
function getSurfaceCo(event, viewer) {
    let poi = get2Coo(event);
    //窗口坐标与当前椭球体
    let SurfaceCo = this.viewer.camera.pickEllipsoid(poi, viewer.scene.globe.ellipsoid);
    return SurfaceCo;
}

/*  地形/地标坐标(Cartesian3)说明
    从相机位置到windowPosition 窗口坐标中的像素创建射线，返回Cartesian3形式的射线的位置和方向 
    获取射线与地球之间的交点（与地形相交的点位的坐标）
    Cartesian3 {x: -2775458.547411221, y: 4453362.240140479, z: 3593104.596429011}
        x: (...)
        y: (...)
        z: (...)
        __ob__: Observer {value: Cartesian3, dep: Dep, vmCount: 0}
        get x: ƒ reactiveGetter()
        set x: ƒ reactiveSetter(newVal)
        get y: ƒ reactiveGetter()
        set y: ƒ reactiveSetter(newVal)
        get z: ƒ reactiveGetter()
        set z: ƒ reactiveSetter(newVal)
        __proto__: Object
*/
function getTerrainCoo(event, viewer) {
    let poi = get2Coo(event);
    let ray = viewer.scene.camera.getPickRay(poi);
    //无需关注ray的具体坐标（表现）形式
    if (ray) {
        let TerrainCoo = viewer.scene.globe.pick(ray, viewer.scene);
    }
    return TerrainCoo;
}

/*  空间直角坐标转经纬度坐标说明
    1.用度表示
    2.用弧度表示
    3.弧度转度
*/
function car3ToDegree(position) {

}
function car3ToCatorgraphic(position) {
    if (position) {
        let cartographic = Cesium.Cartographic.fromCartesian(
            //  cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(
            position
        );
        return cartographic
    }
}
function CartToDegree(position, viewer) {
    let lat = Cesium.Math.toDegrees(position.latitude).toFixed(2);
    let lon = Cesium.Math.toDegrees(position.longitude).toFixed(2);
    // let height=(viewer.camera.positionCartographic.height/1000).toFixed(2); 
    let degree = [lat, lon];
    return degree
}

/*  获取屏幕坐标
    可以用于添加气泡窗
*/
function getScreenCoo(event) {
    if (event.position) {
        let screenCoo = new Cesium.Cartesian2(event.position.x, event.position.y);
    }
    // var winpos = viewer.scene.cartesianToCanvasCoordinates(earthPosition); 
    return screenCoo;

}
//-----------------------基于坐标的计算------------------------------------

//获取地表距离,通过固定api计算,cartographic
function getSurfaceDis() {

}
//获取空间几何距离,通过长方体对角线计算,Cartesian3
function getSpatialDis() {

}




export { getSurfaceCo }
