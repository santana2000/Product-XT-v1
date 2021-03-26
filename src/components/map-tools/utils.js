/**
 @Author:zhangbo
 @Date:2019-03-13 21:18:48
 @E-mail:zhangb@geovie.com.cn
 @Last Modified by:zhangbo
 @Last Modified time:2019-03-13 21:18:48
 */

import {world_to_cartesian3,world_to_latlon} from "./Convert";
import XLSX from 'xlsx'
import {open} from 'shapefile'


const earthRadiusMeters = 6371000.0;
const radiansPerDegree = Math.PI / 180.0;
const degreesPerRadian = 180.0 / Math.PI;
/**
 * 返回两个点之间的距离
 * @param x {Cartesian3} 起始点的地理坐标
 * @param y {Cartesian3} 结束点的地理坐标
 * @returns {string} 两点之间的直线距离(m)
 */
function moveDiv(container) {
  let isDrag = false;
  let startPosition = {};
  let defaultPosition = {};
  container.addEventListener('mousedown', function (e) {
    isDrag = true;
    startPosition['x'] = e.x
    startPosition['y'] = e.y
    defaultPosition['x'] = parseFloat(container.style.left.replace('px', ""));
    defaultPosition['y'] = parseFloat(container.style.top.replace('px', ""))
  })
  container.addEventListener('mousemove', function (e) {
    if (isDrag) {
      const offsetX = startPosition.x - defaultPosition.x;
      const offsetY = startPosition.y - defaultPosition.y;
      container.style.left = (e.x - offsetX) + 'px'
      container.style.top = (e.y - offsetY) + 'px'
    }
  })
  container.addEventListener('mouseout', function () {
    isDrag = false
  });
  container.addEventListener('mouseup', function () {
    isDrag = false
  })
}

/**
 * 计算贴地距离
 * @param x
 * @param y
 * @returns {number}
 */
const surfaceDistance = (x, y) => {
  const geodesic = new Cesium.EllipsoidGeodesic();
  geodesic.setEndPoints(x, y);
  const s = Math.round(geodesic.surfaceDistance);
  return Math.sqrt(Math.pow(s, 2) + Math.pow(x.height - y.height, 2));

}
/**
 * 计算空间距离
 * @param x {Cartesian3} 起始点的地理坐标
 * @param y {Cartesian3} 结束点的地理坐标
 * @returns {string} 两点之间的空间距离(m)
 */
const spaceDistance = (x, y) => {
  console.log(10**2)
  const dis=Math.sqrt((x.x-y.x)**2+(x.y-y.y)**2+(x.z-y.z)**2)
  return dis
}
const surfaceDisfromCartesian3Array=(positions)=>{
  let dist=0.0
  for(let i=0;i<positions.length-1;i++){
    dist+=surfaceDistance(positions[i],positions[i+1])
  }
  return dist.toFixed(2)
}
const surfaceDisfromArray=(positions)=>{
  const ct3=positions.map((x)=>{
    return world_to_cartesian3(x)
  })
  let dist=0.0
  for(let i=0;i<ct3.length-1;i++){
    dist+=surfaceDistance(ct3[i],ct3[i+1])
  }
  return dist.toFixed(2)
}
const spaceDisfromArray=(positions)=>{
  let dist=0.0
  for(let i=0;i<positions.length-1;i++){
    dist+=spaceDistance(positions[i],positions[i+1])
  }
  return dist.toFixed(2)
}
/**
 * points 多边形的顶点坐标，形如[{lan:23,lon:99}]
 * 计算多边形面积
 */
const getArea = (points) => {
  const earthRadiusMeters = 6371000.0;
  const radiansPerDegree = Math.PI / 180.0;
  const degreesPerRadian = 180.0 / Math.PI;
  if(points.length<3){
    return 0
  }
  let totalAngle = 0;
  for (let i = 0; i < points.length; i++) {
    let j = (i + 1) % points.length;
    let k = (i + 2) % points.length;
    totalAngle += Angle(points[i], points[j], points[k]);
  }
  const planarTotalAngle = (points.length - 2) * 180.0;
  let sphericalExcess = totalAngle - planarTotalAngle;
  if (sphericalExcess > 420.0) {
    totalAngle = points.length * 360.0 - totalAngle;
    sphericalExcess = totalAngle - planarTotalAngle;
  } else if (sphericalExcess > 300.0 && sphericalExcess < 420.0) {
    sphericalExcess = Math.abs(360.0 - sphericalExcess);
  }
  return sphericalExcess * radiansPerDegree * earthRadiusMeters * earthRadiusMeters;
}

function Angle(p1, p2, p3) {
  const bearing21 = Bearing(p2, p1);
  const bearing23 = Bearing(p2, p3);
  let angle = bearing21 - bearing23;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
};

/*方向*/
function Bearing(from, to) {
  const lat1 = from.lat * radiansPerDegree;
  const lon1 = from.lon * radiansPerDegree;
  const lat2 = to.lat * radiansPerDegree;
  const lon2 = to.lon * radiansPerDegree;
  let angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
  if (angle < 0) {
    angle += Math.PI * 2.0;
  }
  angle = angle * degreesPerRadian;
  return angle;
}

/**
 * 获得当前视图的范围
 * @param viewer
 */
function currentExtent(viewer) {
  // 范围对象
  const extent = {};

  // 得到当前三维场景
  const scene = viewer.scene;

  // 得到当前三维场景的椭球体
  const ellipsoid = scene.globe.ellipsoid;
  const canvas = scene.canvas;

  // canvas左上角
  const car3_lt = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), ellipsoid);

  // canvas右下角
  const car3_rb = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, canvas.height), ellipsoid);

  // 当canvas左上角和右下角全部在椭球体上
  if (car3_lt && car3_rb) {
    const carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
    const carto_rb = ellipsoid.cartesianToCartographic(car3_rb);
    extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude);
    extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude);
    extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude);
    extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude);
  }

  // 当canvas左上角不在但右下角在椭球体上
  else if (!car3_lt && car3_rb) {
    let car3_lt2 = null;
    let yIndex = 0;
    do {
      // 这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
      yIndex <= canvas.height ? yIndex += 10 : canvas.height;
      car3_lt2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, yIndex), ellipsoid);
    } while (!car3_lt2);
    const carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt2);
    const carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb);
    extent.xmin = Cesium.Math.toDegrees(carto_lt2.longitude);
    extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
    extent.xmax = Cesium.Math.toDegrees(carto_rb2.longitude);
    extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
  }

  // 获取高度
  extent.height = Math.ceil(viewer.camera.positionCartographic.height);
  return extent;
}

/**
 * 获得当前视野的中心位置
 * @param viewer
 * @returns {{lon, lat, height}}
 */
const viewerCenter=(viewer)=>{
  const viewCenter = new Cesium.Cartesian2(Math.floor(viewer.canvas.clientWidth / 2), Math.floor(viewer.canvas.clientHeight / 2));
  // Given the pixel in the center, get the world position
  const newWorldPosition = viewer.scene.camera.pickEllipsoid(viewCenter);
  return world_to_latlon(newWorldPosition,viewer)
}
/**
 * 将当前页面的内容保存成图片
 * @param viewer
 * @param filename
 */
const saveCurViewerImage=(viewer,filename)=>{
  viewer.render();
  if(!filename||filename==''){
    filename=new Date().toLocaleString()+".png"
  }
  const ext=filename.split(".")[1]
  downloadFile(filename, viewer.scene.canvas.toDataURL("image/%s" % ext));
}
const downloadFile=(fileName, content)=> {//下载文件
  let aLink = document.createElement('a');
  let blob = base64ToBlob(content); //new Blob([content]);
  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click()
  function base64ToBlob(code) {//base64转blob
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: contentType});
  }
}
export function JSON2Excel(data,filename) {
  let ws=XLSX.utils.json_to_sheet(data)
  let wb=XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "sheet1");/* 生成xlsx文件 */
  XLSX.writeFile(wb, filename);
}
export function ajaxPromise(url,options={}){
  return new Promise((resolve,reject)=>{
    const defaultOptions= {
      service: 'WFS',
      version: '1.0.0',
      request: 'GetFeature',
      outputFormat: 'application/json'
    }
    if(!options['typeName']){
      alert('typeName参数必须提供')
      return
    }
    for(let key in options){
      defaultOptions[key]=options[key]
    }
    let urlString=url+'?'
    for(let key in defaultOptions){
      urlString+=`&${key}=${defaultOptions[key]}`
    }
    axios.get(urlString).then(res=>{
      resolve(res)
    }).catch(e=>{
      reject(e)
    })
  })
}

/**
 * 根据图片和文字绘制canvas
 * @param url
 * @param text
 * @param fontsize
 * @param bg
 * @returns {any[]|Promise<any>|HTMLCanvasElement}
 */
function drawCanvas(url='',text='',fontsize=14,bg=true){
  const canvas = document.createElement('canvas');      //创建canvas标签
  const ctx = canvas.getContext('2d');
  ctx.font = fontsize + "px Arial";
  canvas.width = ctx.measureText(text).width + fontsize * 0;//0.5      //根据文字内容获取宽度
  canvas.height = fontsize * 1.2; // fontsize * 1.5
  const img = new Image();
  img.src=url
  if(url==''){
    if(bg){
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      //设置线条颜色
      ctx.strokeStyle='#ADADAD';
      //设置线条宽度
      ctx.lineWidth=2;
      ctx.strokeRect(0,0,canvas.width,canvas.height);
    }
    ctx.fillStyle = "#000000";
    ctx.font ="italic  lighter"+ fontsize + "px Calibri,sans-serif";
    // ctx.shadowOffsetX = 1;    //阴影往左边偏，横向位移量
    // ctx.shadowOffsetY = 0;   //阴影往左边偏，纵向位移量
    // ctx.shadowColor = "#fff"; //阴影颜色
    // ctx.shadowBlur = 1; //阴影的模糊范围
    ctx.fillText(text, fontsize*1/4, fontsize*5/6);
    return [canvas.width,canvas]
  }
  return new Promise((resolve,reject)=>{
    img.onload = function(){
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0,0,120,60);
      ctx.fillStyle = "#00000099";
      ctx.drawImage(img, 0,0,32, 32);
      ctx.fillStyle = '#000';
      ctx.font = fontsize + "px Calibri,sans-serif";
      ctx.shadowOffsetX = 1;    //阴影往左边偏，横向位移量
      ctx.shadowOffsetY = 0;   //阴影往左边偏，纵向位移量
      ctx.shadowColor = "#fff"; //阴影颜色
      ctx.shadowBlur = 1; //阴影的模糊范围
      ctx.fillText(text, fontsize*7/4, fontsize*4/3);
      resolve(canvas)
    }
  })
  // return canvas

}
const AjaxErrorCatch=function (e,callback) {
  if(e.response){
    callback(e.response.data)
  } else if(e.request){
    callback(e.request)
  } else{
    callback(e.message)
  }
}
/**
 * shp转geojson
 * @param filedata
 * @returns {Promise<any>}
 */
const shp2GeoJSON=function(filedata) {

  const geojson={
    "type": "FeatureCollection",
    "name": "test",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features":[]
  }
  if(new RegExp(".*\.shp").test(filedata)){
    return new Promise((resolve,reject)=>{
      open(filedata)
        .then(source => source.read()
          .then(function log(result) {
            if (result.done) {
              resolve(geojson)
              return false
            }
            geojson.features.push(result.value)
            // console.log(result.value)
            return source.read().then(log);
          }))
        .catch(error => console.error(error.stack));
    })
  }else{
    const reader = new FileReader()
    reader.readAsArrayBuffer(filedata)
    return new Promise((resolve,reject)=>{
      reader.onload = function (e) {
        open(this.result)
          .then(source => source.read()
            .then(function log(result) {
              if (result.done) {
                resolve(geojson)
                return false
              }
              geojson.features.push(result.value)
              // console.log(result.value)
              return source.read().then(log);
            }))
          .catch(error => console.error(error.stack));
      }
    })
  }


}
/**
 * @description 创建 2D 画布。
 * @param {number} opt_width - 画布宽度。
 * @param {number} opt_height - 画布高度。
 */
function createCanvasContext2D(opt_width, opt_height) {
  const canvas = document.createElement('CANVAS');
  if (opt_width) {
    canvas.width = opt_width;
  }
  if (opt_height) {
    canvas.height = opt_height;
  }
  return canvas.getContext('2d');
}
function createCursor(viewer,text) {
  if(document.getElementById('cursortip')){
    document.getElementById('cursortip').innerText=text
    return document.getElementById('cursortip')
  }
  const tip=document.createElement('div')
  tip.id='cursortip'
  tip.style.position='absolute'
  tip.style.backgroundColor='#FFFFFF'
  tip.innerText=text
  tip.style.width='200px'
  tip.style.fontFamily='宋体'
  tip.style.fontSize='10px'
  tip.style.padding='5px'
  tip.style.color='#A8A8A8'
  document.body.appendChild(tip)
  document.body.addEventListener('mousemove',function (e) {
    if(document.getElementById('cursortip')){
      e.preventDefault()
      const div=document.getElementById('cursortip')
      if(e.target===viewer.canvas){
        div.style.display='block'
        div.style.left=e.offsetX+10+'px'
        div.style.top=e.offsetY+10+'px'
      }else{
        div.style.display='none'
      }
    }
  })

  return tip
}
function createPopPanel(viewer,position, text,options={close:true}) {
  if (document.getElementById('popUpDiv')) {
    document.body.removeChild(document.getElementById('popUpDiv'))
  }
  //const cartographic = _this.viewer.scene.globe.ellipsoid.cartesianToCartographic(position);
  let pixel = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, position);
  const popdiv = document.createElement('div')
  popdiv.style.position = 'absolute'
  popdiv.id = 'popUpDiv'
  popdiv.style.zIndex="999"
  // popdiv.style.height="80px"
  const txtdiv = document.createElement('div')
  txtdiv.innerHTML = text
  const arrow = document.createElement('div')

  txtdiv.className = 'a-text'
  arrow.className = 'a-arrow'
  popdiv.appendChild(txtdiv)
  popdiv.appendChild(arrow)
  document.body.appendChild(popdiv)
  popdiv.style.left = pixel.x + 'px'
  popdiv.style.top = pixel.y-100 + 'px'
  const update=()=>{
    pixel = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, position);
    popdiv.style.left = pixel.x + 'px'
    popdiv.style.top = pixel.y-100 + 'px'
  }
  viewer.scene.postRender.addEventListener(update)
  this.closeHandler=function () {
    document.body.removeChild(popdiv)
    viewer.scene.postRender.removeEventListener(update)
  }
  if(options.close){
    const close=document.createElement('span')
    close.className='popup-closer'
    popdiv.appendChild(close)
    close.onclick=this.closeHandler
  }
  this.panel=popdiv
  return this
}
function keepSceneGround(viewer) {
  viewer.clock.onTick.addEventListener(function () {
    if(viewer.camera.pitch > 0){
      viewer.scene.screenSpaceCameraController.enableTilt = false;
    }
  });

  let mousePosition,startMousePosition;
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction(function(movement) {
    mousePosition=startMousePosition= Cesium.Cartesian3.clone(movement.position);
    handler.setInputAction(function(movement) {
      mousePosition = movement.endPosition;
      const y = mousePosition.y - startMousePosition.y;
      if(y>0){
        viewer.scene.screenSpaceCameraController.enableTilt = true;
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);
}
function selectByRectangle(viewer) {

}
export {keepSceneGround,shp2GeoJSON,createPopPanel,surfaceDistance, spaceDisfromArray,spaceDistance,surfaceDisfromArray,getArea,currentExtent,viewerCenter,saveCurViewerImage,downloadFile,AjaxErrorCatch}
export default {
  keepSceneGround,
  drawCanvas,
  moveDiv,
  AjaxErrorCatch,
  surfaceDistance,
  spaceDistance,
  surfaceDisfromArray,
  spaceDisfromArray,
  getArea,
  currentExtent,
  viewerCenter,
  saveCurViewerImage,
  downloadFile,
  shp2GeoJSON,
  createCanvasContext2D,
  createCursor,
  createPopPanel
}
