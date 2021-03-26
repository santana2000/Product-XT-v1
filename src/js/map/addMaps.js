/* imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
                		url:
                				"http://t3.tianditu.com/img_w/mts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=d6a72a78a43a2c17294b72ab26354cd6",
                		layer: "tdtBasicLayer",
                		style: "default",
                		format: "tiles",
                		tileMatrixSetID: "GoogleMapsCompatible",
                		show: true,
                		maximumLevel: 18,
                }), */
/* window.annotationLayer = new Cesium.WebMapTileServiceImageryProvider(
   {
       //电子地图添加中文标记
       url:
           "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=d6a72a78a43a2c17294b72ab26354cd6",
       layer: "tdtAnnoLayer",
       style: "default",
       format: "tiles",
       tileMatrixSetID: "GoogleMapsCompatible",
       show: false,
   }
); //天地图影像注记
viewer.imageryLayers.addImageryProvider(annotationLayer); */

            // 添加注记图层
            /* viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
										 url: window.GlobalConfig.BASE_LABEL_URL
								 }));*/
			//添加3d tiles
			/* var tilesetModel = new Cesium.Cesium3DTileset({
				// uri: "models/BatchedXLY/tileset.json",
				url: "models/daxue/tileset.json",
            });
            viewer.scene.primitives.add(tilesetModel); */
            /* var tileset = viewer.scene.primitives.add(
                new Cesium.Cesium3DTileset({
                    url: Cesium.IonResource.fromAssetId(54482),
                    scale:1000,
                })
            ); */

         /*    imageryProvider: new Cesium.UrlTemplateImageryProvider({
                url:
                    "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali",
            }), */