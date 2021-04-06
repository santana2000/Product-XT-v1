//距离测量函数------------------------------------------------------------------------
function getMyDistance() {
    var AllEnities = [];
    var isDraw = false;
    var polyline = new Cesium.Entity();
    var polylinePath = []; //点集合
    var tooltip = document.getElementById("toolTip");
    var LineEntities = []; //所有折线对象
    var disNums = []; //线路长度之和
    var StartPoint;
    var temLine = null;
    var myhandler = new Cesium.ScreenSpaceEventHandler(myCanvas);
    //鼠标移动
    myhandler.setInputAction(function (movement) {
        // console.log(movement.endPosition); //屏幕坐标
        var cartographic;
        var ray = camera.getPickRay(movement.endPosition); //射线发出位置origin 与射线方向 direction
        if (ray) {
            var position1 = viewer.scene.globe.pick(ray, viewer.scene); //cartisian3坐标
        }
        // if(poisition1)  先判断存在？？？？
        // cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
        cartographic = Cesium.Cartographic.fromCartesian(
            position1,
            viewer.scene.globe.ellipsoid,
            new Cesium.Cartographic()
        );
        if (cartographic) {
            var height = viewer.scene.globe.getHeight(cartographic);
            var point = Cesium.Cartesian3.fromDegrees(
                (cartographic.longitude / Math.PI) * 180,
                (cartographic.latitude / Math.PI) * 180,
                height
            );
            if (isDraw) {
                tooltip.style.left = movement.endPosition.x + 10 + "px";
                tooltip.style.top = movement.endPosition.y + 20 + "px";
                tooltip.style.display = "block";
                if (polylinePath.length < 1) {
                    return;
                }
                if (temLine != null) {
                    //清除临时线
                    viewer.entities.remove(temLine);
                }
                if (polylinePath.length == 1 && point.x != null) {
                    temLine = viewer.entities.add({
                        polyline: {
                            show: true,
                            positions: [polylinePath[0], point],
                            material: new Cesium.PolylineOutlineMaterialProperty(
                                {
                                    color: Cesium.Color.RED,
                                }
                            ),
                            width: 2,
                        },
                    });

                    AllEnities.push(temLine);
                    var distance =
                        sum(disNums) +
                        Number(getLineDis(polylinePath[0], point)); //自己实现
                    tooltip.innerHTML =
                        "<p>长度：" +
                        distance.toFixed(2) +
                        "公里</p><p>双击确定终点</p>";
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);


    //左键单击
    myhandler.setInputAction(function (event) {
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

        isDraw = true;
        var position1;
        var cartographic;
        var ray = viewer.scene.camera.getPickRay(event.position);
        if (ray) position1 = viewer.scene.globe.pick(ray, viewer.scene);
        console.log(
            "左键单击----------------------------------------------------------"
        );
        console.log(position1);
        if (position1)
            // cartographic = Cesium.Cartographic.fromCartesian(position1);
            cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(
                position1
            );
        console.log(position1);
        if (cartographic) {
            var height = viewer.scene.globe.getHeight(cartographic);
            var point = Cesium.Cartesian3.fromDegrees(
                (cartographic.longitude / Math.PI) * 180,
                (cartographic.latitude  / Math.PI) * 180,
                height
            );

            polylinePath.push(point); //加点

            if (isDraw && polylinePath.length == 1) {
                StartPoint = point;
                var strartpoint = viewer.entities.add({
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
                AllEnities.push(strartpoint);
            }

            if (isDraw && polylinePath.length > 1) {
                var text = 0;
                text =
                    sum(disNums) +
                    Number(
                        getLineDis(polylinePath[0], polylinePath[1])
                    );
                disNums.push(
                    getLineDis(polylinePath[0], polylinePath[1])
                );
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
                        text: text.toFixed(2).toString() + "公里",
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
                AllEnities.push(temppoint);

                polyline = viewer.entities.add({
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
                AllEnities.push(polyline);
                LineEntities.push(polyline); //加直线
                var lastpoint = polylinePath[polylinePath.length - 1];
                polylinePath = [lastpoint]; //只有两个点
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);



    
    //右键单击
    myhandler.setInputAction(function () {
        viewer.entities.remove(temLine);
        myhandler.removeInputAction(
            Cesium.ScreenSpaceEventType.LEFT_CLICK
        );
        myhandler.removeInputAction(
            Cesium.ScreenSpaceEventType.MOUSE_MOVE
        );
        AllEnities.push(polyline);
        viewer.trackedEntity = undefined;
        isDraw = false;
        tooltip.style.display = "none";
        polylinePath = [];
        //LineEntities = [];
        // polyline = null;
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}