/* var a ={};
var b ={name:'hah'};
var c ={};

console.log(b.name,'---',b["name"]);

var d = 231;
console.log(d,'---',d.toString(),'---',typeof d.toString()); */

/* let arr =  [{x:1,y:2},{v:1,n:2}];
console.log(arr);
arr.pop();
console.log(arr); */

/* let fo = function(){
    console.log('as');
    let x = 1;
    function aa(){
        console.log(x);
    }
    function bb() {
        console.log(x+1);
    }
    return {aa,bb}
}
let co = fo().aa;
let zo = fo().bb;
co();
zo(); */
function line(p){
    let poiArr = [];
    poiArr = p || [];
    function getPoiArr(){
        return poiArr
    }
    function addPoi(x){
        poiArr.push(x);
        return poiArr
    }
    function deleteLatest(){
        poiArr.pop();
        return poiArr
    }
    return {addPoi,deleteLatest,getPoiArr};
};

// 点击加点
function onclick(){
    let addPoi = line([p0,p1,p2,p3]).addPoi;
    addPoi();
}
// 回退按钮
function backUpStep(){
    let backUp = line([p0,p1,p2,p3]).deleteLatest;
    backUp();
}
// 画线按钮
function drawLine(){
    let entity = new xxx.entity({
        polyline:{
            position: callback(line([p0,p1,p2,p3]).getPoiArr,false)
        }
    })
}

