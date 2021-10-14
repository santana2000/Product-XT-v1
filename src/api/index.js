// api接口的统一出口
// 统一导出后，在main中引入，挂载在vue原型上，直接通过$api.getTableFish()的形式调用
import mapData from '@/api/mapData'
import visualData from '@/api/visualData'

// 引用时不需要再去寻找各个接口的位置
export default {mapData,visualData} 

var value = 1;

function foo() {
    console.log(value);
}

var bar = () => {
    var value = 2;
    foo();
}

bar();