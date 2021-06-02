<template>
    <!-- 导航按钮     -->
    <div class="my-navbar">
        <!-- assets的资源在这里用 -->
        <div class="my-navbar-item" v-for="(item,index) in navBarList" :key="item.id" >
            <el-tooltip
                class="item"
                effect="dark"
                :content="item.tip"
                placement="right-start"
            >
                <i
                    :class="[ navBarList[index].isActive ? item.src  : item.src2 + ' ' + 'activeBGcolor']"
                    @click="showPlugins(item.name,index)"
                ></i>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import yBus from "@/js/common/bus.js";

export default {
    name: "NavBar",
    components: {},
    data() {
        return {

            //导航菜单
            navBarList: [
                {
                    id: 1,
                    tip: "测量",
                    name: "Measure",
                    src: "iconfont iconyhdrawSpace1",
                    src2: "iconfont iconyhbiaozhu",
                    isActive:true,
                },
                {
                    id: 2,
                    tip: "标注",
                    name: "Draw",
                    src: "iconfont iconyhbiaozhu",
                    src2: "iconfont iconyhbiaozhu",
                    isActive:true,
                },
                {
                    id: 3,
                    tip: "缓冲区",
                    name: "Buffer",
                    src: "iconfont iconyhbuffer",
                    src2: "iconfont iconyhbiaozhu",
                    isActive:true,

                },
                {
                    id: 4,
                    tip: "图层树",
                    name: "Tree",
                    src:  "iconfont iconyhtuceng",
                    src2: "iconfont iconyhbiaozhu",
                    isActive: true,

                },
            ],
        };
    },
    mounted() {},
    methods: {
        //菜单形式1
        /* showPlugins(){
        this.$router.push({path:'/home/draw'})
      }, */
        //菜单形式2
        showPlugins(name,index) {
            //方法一 vuex管理状态
            //提交commit,更改显隐
            this.$store.commit(`active${name}`);
            this.navBarList[index].isActive = !this.navBarList[index].isActive;

            //方法二 公共组件bus传值
            // yBus.$emit('showMeasureTool',name)
        },
 
    },
};
</script>
<style scoped>
.my-navbar {
    position: absolute;
    top: 40%;
    left: 20px;
    width: 60px;
    /* height: 160px; */
    padding: 20px 10px;
    background-color: rgba(127, 255, 212, 0.795);
}
.my-navbar-item {
    margin-top: 15px;
}
.my-navbar-item:nth-child(1) {
    margin-top: 0px;
}
.iconfont {
    font-size: 32px;
}
.activeBGcolor{
  background-color: brown;
}
/* .iconyhhuizhi{
  font-size: 64px;
}
.iconyhdrawSpace2{
  font-size: 64px;
} */
</style>
