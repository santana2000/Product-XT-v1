
//经纬度转度分秒
let degreeToDFM = function (param) {

    let degree;
    let minute;
    let second;
    let minuteTemp;

    let arrDFM = [];
    arrDFM = param.toString().split('.');
    // console.log(arrDFM);

    degree = parseInt(arrDFM[0]);
    minuteTemp = '0.' + arrDFM[1];
    minute = parseInt(minuteTemp * 60);

    let minuteTemp2 = parseFloat(minuteTemp * 60);
    let minuteTemp3 = '0.' + minuteTemp2.toString().split('.')[1]
    second = parseInt(minuteTemp3 * 60);

    // console.log( degree,'---', minute,'---',second,);
    // console.log( typeof degree,'---', typeof minute,'---',typeof second);

    return degree + '°' + minute + '′' + second + '″';

}

// degreeToDFM(143.5863933);
// degreeToDFM(29.73784595);

// console.log('-----------------------------------------------');

//度分秒转经纬度

// a.bbbbb;
// 0.bbbbb * 60 = xx.cccc;
// 0.ccccc * 60 = zz.dddd;
let dfmToDegree = function (deg, min, sec) {
    // let a = parseFloat(sec / 60).toFixed(4);
    let a = parseFloat((sec / 60).toFixed(4));
    // console.log( '1.---' + a ); 
    let temp = min + a;
    // console.log( typeof temp,temp,'===' ); 
    // console.log( typeof min ,'---', typeof a ); 

    let b = parseFloat((temp / 60).toFixed(4));
    // console.log( '2.---' + b , typeof b); 

    let c = deg;
    return parseFloat(c + b)
}
// dfmToDegree(103, 35, 11);
// dfmToDegree(29, 44, 16);

export {degreeToDFM,dfmToDegree}
