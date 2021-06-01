const Cesium = window.Cesium;

let add_DATABOX_Img = function(val){
  if (val) {
    // window.viewer.imageryLayers.remove(window.gd_imglayer);

    window.boxImgLayer = window.viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url:window.GlobalLayerConfig.BOXMAP_IMAGE_URL,
          tilingScheme: new Cesium.GeographicTilingScheme(),
        })
    );
  }else{
    window.viewer.imageryLayers.remove(boxImgLayer);
  }


}
let add_DATABOX_ImgLabel = function(val){
  if (val) {
      window.boxLabelLayer = window.viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: window.GlobalLayerConfig.BOXMAP_IMAGELABEL_URL,
          tilingScheme: new Cesium.GeographicTilingScheme(),
        })
      );
  }else{
    window.viewer.imageryLayers.remove(boxLabelLayer);

  }
    
}

// 地形terrainProvider只能同时存在一个
let add_DATABOX_Terrain = function(val){
    if (val) {
        let terrainProvider = new Cesium.CesiumTerrainProvider({
          url: window.GlobalLayerConfig.BOXMAP_TERRAIN_URL,
            // 请求照明
            // requestVertexNormals: true,
            // 请求水波纹效果
            // requestWaterMask: true
            // minimumLevel: 1,
            // maximumLevel: 12,
        });
        window.viewer.terrainProvider = terrainProvider;
      } else {
        window.viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
      }
}

let add_GDMAP_Img = function(){
    window.GDMAPImgLayer = window.viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url:window.GlobalLayerConfig.GDMAP_IMAGE_URL,
        })
    );

}
let add_GDMAP_ImgLabel = function(){
    window.GDMAPLabelLayer = window.viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url:window.GlobalLayerConfig.GDMAP_IMAGELABEL_URL,
        //   tilingScheme: new Cesium.GeographicTilingScheme(),
        })
    );
}

export {add_DATABOX_Img,add_DATABOX_ImgLabel,add_DATABOX_Terrain}