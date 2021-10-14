<template>
    <!-- 垂直菜单栏 -->
    <div id="menu-side">
        <div id="menu-logo">l o g o</div>
        <div class="menu-item">
            <ul class="menu-first">

                <li class="item-first" v-for="(item, i) in menuList" :key="i">
                    <div
                        class="item-first-title"
                        :class="{ 'active-first': activeIndex1 == i }" 
                        @click="openMenu(i)"
                    >
                        {{ item.name }}
                    </div>
                    <ul class="menu-second" v-show='item.showSec'>
                        <li
                            class="item-second"
                            :class="{ 'active-second': activeIndex1 == i && activeIndex2 == j }"
                            v-for="(isec, j) in item.children"
                            :key="j"
                            @click="changeMenu(i,j)"

                        >
                            {{ isec.name }}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
 
    </div>
</template>

<script>
export default {
    name: "SideMenu",
    data() {
        return {
            sideBarShowFlag: false,
            activeIndex1: 0,
            activeIndex2: 0,
            // activeIndex2: 'z',   //默认不显示
            pointNum: 3,
            menuList: [
                {
                    id: 1,
                    name: "地理信息",
                    icon: "",
                    showSec:false,
                    children: [
                        {
                            name: "矢量数据",
                            icon: "",
                        },
                        {
                            name: "影像数据",
                            icon: "",
                        },
                        {
                            name: "地形数据",
                            icon: "",
                        },
                    ],
                },
                {
                    id: 2,
                    name: "业务信息",
                    showSec:false,

                    children: [
                        {
                            name: "道路信息",
                            icon: "",
                        },
                        {
                            name: "河流信息",
                            icon: "",
                        },
                        {
                            name: "住宅信息",
                            icon: "",
                        },
                    ],
                },
                {
                    id: 3,
                    name: "其他信息",
                    showSec:false,

                    children: [
                        {
                            name: "标绘数据",
                            icon: "",
                        },
                        {
                            name: "测量数据",
                            icon: "",
                        },
                    ],
                },
            ],
            timer: "",
            that:this,
        };
    },
    mounted() {
        // this.run();
    },
    methods: {
        openMenu(i){
            // "activeIndex" + i = 
            this.menuList[i].showSec = !this.menuList[i].showSec ;
            // this.activeIndex = i;

        },
        changeMenu(i,j){
            this.activeIndex1 = i;
            this.activeIndex2 = j;
        },
      
    },
};
</script>

<style lang="scss" scoped>
$bgcolor1: rgb(124, 190, 85);
$bgcolor2: rgb(85, 178, 190);
$bgcolor3: rgb(177, 77, 19);
#menu-side {
    width: 220px;
    // height: 100%;
    padding: 10px;
    position: absolute;
    left: 0px;
    top: 20px;
    background-color: rgba(103, 150, 28, 0.479);
    #menu-logo {
        width: 100%;
        background-color: burlywood;
        height: 30px;
    }
    .menu-item {
        background-color: rgb(238, 171, 144);
    }
    li {
        list-style: none;
    }
    .menu-first {
    }
    .item-first {
        // height: 50px;
        // color: chartreuse;
        border: chocolate solid 2px;
    }
    .menu-second {
    }
    .item-second {
        // height: 50px;
        // display: none;
    }
    .item-first-title:hover,
    .item-second:hover {
        // height: 50px;
        background-color: rgba(112, 114, 112, 0.664);
        cursor: pointer;
    }
    .active-first {
        background-color: rgb(90, 163, 223);
    }
    
    .active-second {
        background-color: rgba(86, 211, 194, 0.644);
    }
    .active-first-title{
        background-color: rgba(97, 188, 204, 0.89);

    }

    /* animation:mymove 2s ; */
}
/* @keyframes mymove
        {
        from {right:-200px;}
        to {right:0px;}
    }

   @-webkit-keyframes mymove
        {
        from {right:0px;}
        to {right:10px;}
    } */

/* .bar-enter-active, .bar-leave-active {
    transition: opacity 2s
    }
    .bar-enter, .bar-leave-to {
    opacity: 0
    } */
/* .el-icon-picture-outline-round {
     background-color: #d40c0c;
     position: absolute;
     right: 200px;
     bottom: 450px;
     font-size: 80px;
     transform: translate(0,0);
    transition: all 2s ease ;
  } */
.my-side-icon {
    position: absolute;
    right: 0px;
    bottom: 220px;
    font-size: 40px;
    background-color: rgba(127, 255, 212, 0.699);
    transform: translate(0, 0);
    transition: transform 1s ease;
}
.el-icon-help {
    /* background-color: #0ed450; */
}
</style>
