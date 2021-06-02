<template>
    <div id="search-container" ref="searchplace">

        <div class="search-bar">
            <div class="search-input" :class="{isInputActive:isInputActive}">
                <input class='inputx' type="text" v-model="poiName" placeholder="搜索" @focus="isInputActive = !isInputActive" @blur="isInputActive = !isInputActive"> 
                <i class="iconfont iconyhguanbi1" :class="{isNull:isNull}" @click="clearInput"></i>
            </div>
            <div class="search-button">
                <i class="iconfont iconyhchaxun" @click="showSearchList"></i>
            </div>
            
        </div>

        <div class="search-list">
            <ul>
                <li v-for="item in poiList" :key="item.id"> item.name</li>
            </ul>
        </div>
    </div>
</template>

<script>
// import * as CVTLonLatFormat from "@/js/map/CVTLonLatFormat.js";
export default {
    name: "PlaceSearch",
    components: {},

    data() {
        return {
            poiName: "",
            poiList: "",
            isNull:true,
            isInputActive:false,

            nowLevel: "",
            nowLonDFM: "",
            nowLatDFM: "",
        };
    },
    mounted() {
        this.$refs.searchplace.addEventListener(
        "keydown",
        function (event) {
          //console.log("down:"+event.keyCode);
          /* switch (event.keyCode) {
            case 72:
              _that.flyHome(); //home
              break;
            case 78:
              _that.setDueNorth(); //north
              break;
            default:
              _that.setFlagForKeyCode(event.keyCode, true);
          } */
        },
        false
      );
    },
    watch: {
        poiName(oldVal,newVal){
            
            // 控制清空按钮的显隐
            if(this.poiName == ''){
                this.isNull = true
            }else{
                this.isNull = false
            }


        },


    },
    methods: {
        clearInput(){
this.poiName = '';
this.isNull = true
        },
        
        showSearchList(){
            //if poiname = ''  隐藏面板
 
            // showListPanel
            // if(getPoiPositions) 5list
            // else show null

        },
        poiChange() {
            
        },

        getPoiPositions (movement) {
            axios.post('',data).then(
                (res)=>{

                }
            ).catch()
        },
        flyToPoi() {
            
        },
        
    },
};
</script>

<style scoped>
#search-container{
    /* width: 256px; */
    /* height: 250px; */
    position: absolute;
    top: 100px;
    left: 100px;
    padding: 2px;
    background-color: transparent;
    z-index: 999;
}
.search-bar{
    /* width: 256px; */
    /* height: 50px; */
    display: flex;
    /* position: absolute;
    top: 150px;
    left: 150px; */
    background-color: rgba(29, 173, 65, 0.767);
    padding: 5px 2px 0 2px;

    /* background-color: transparent */
}

.search-input{
    height: 32px;
    width: 200px;
    display: flex;
    border: 1px solid rgb(61, 61, 61);
    align-items: center;
    background-color: #ffffff;

}
.isInputActive{
        border: 1px solid rgb(231, 89, 6);

}
.search-button{
    width: 32px;
    height: 32px;
    background-color: rgb(235, 235, 235);
    line-height: 32px;
    border-top: 1px solid rgb(61, 61, 61);
    border-right: 1px solid rgb(61, 61, 61);
    border-bottom: 1px solid rgb(61, 61, 61);

}
.inputx{
    height: 30px;
    border: none;
    outline: none;
    padding: 2px 0 2px 6px;

    
}
.isNull{
    display: none;
}
.iconyhguanbi1{
    font-size: 15px;
    margin-left: 3px;
}
.iconyhguanbi1:hover{
    cursor: pointer;
}
.iconyhchaxun{
    font-size: 18px;
}
.iconyhchaxun:hover{
    cursor: pointer;
}


.search-list{
    width: 230px;
    height: 150px;
    background-color: tomato;
    position: absolute;
    left: 5px;
}
</style>
