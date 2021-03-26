 //模型
 var position = Cesium.Cartesian3.fromDegrees(
    116, 
    39.521196
);   
var hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(90),0,0);
var orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr
);
var entity3DModel = viewer.entities.add({
    id: 'lle',
    position: position,
    orientation: orientation,
    model: {
        uri: "models/lhexss.glb",
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        // minimumPixelSize: 258,
        maximumScale: 2000,
        scale: 3,
    },
    clampToGround : true
});