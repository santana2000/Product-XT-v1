let turf = require('@turf/turf')
// import * as turf  from '@turf/turf'

//面积计算
let polygon = turf.polygon([[
    [108.09876, 37.200787],
    [106.398901, 33.648651],
    [114.972103, 33.340483],
    [113.715685, 37.845557],
    [108.09876, 37.200787]
  ]]);

let area = turf.area(polygon);
console.log(area);

//缓冲区
let point = turf.point([120,32]);
let bufferPoint = turf.buffer(point,10,{units:'miles'})
console.log(bufferPoint,'bufferPoint');
// console.log(buffer.geometry.coordinates);
let bufferArr = [];
let liney = turf.lineString([[120,30],[120.5,30.5],[121,31]]);
let bufferLine = turf.buffer(liney,10,{units:'miles'})
console.log(bufferLine,'bufferLine');

for (const item of bufferLine.geometry.coordinates[0]) {
  bufferArr.push(item[0]);
  bufferArr.push(item[1]);
}
console.log(bufferArr,'bufferArr------');
