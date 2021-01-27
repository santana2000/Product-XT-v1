
<template>
    <!--  ---------------class样式的动态设置与css过渡动画的实现-------------- -->
    <!-- 侧边栏 -->
    <div id="sideBar">
        <!-- <i class="el-icon-picture-outline-round" 
            @click="changeSideBar"
            v-show="!iconFlag"
            ref="shou">
            </i> -->
        <i
            class="my-side-icon"
            :class="[
                !this.sideBarShowFlag
                    ? 'el-icon-help'
                    : 'el-icon-picture-outline-round',
            ]"
            @click="changeSideBar"
            ref="mySideIcon"
        >
        </i>
        
        <div class="sideContent" ref="mybar">
        </div>

        <!-- <transition name="bar">
                <div class="sideContent" v-show="sideBarShowFlag"></div>
            </transition> -->
        <!-- <div class="sideContent" ref="mybar" v-show="sideBarShowFlag"></div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            sideBarShowFlag: false,
        };
    },
    methods: {
        changeSideBar() {
            if (!this.sideBarShowFlag) {
                this.$refs.mybar.style.transform = "translate(0,0)";
                this.$refs.mySideIcon.style.transform = "translate(-100px,0)";
            } else {
                this.$refs.mybar.style.transform = "translate(100%,0)";
                this.$refs.mySideIcon.style.transform = "translate(0,0)";
            }

            this.sideBarShowFlag = !this.sideBarShowFlag;
        },
    },
};
</script>

<style scoped>
.sideContent {
    width: 100px;
    height: 200px;
    position: absolute;
    right: 0px;
    bottom: 50px;
    background-color: rgb(56, 118, 121);
    transform: translate(100%, 0);
    transition: transform 1s ease;

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
    transform: translate(0, 0);
    transition: transform 1s ease;
}
.el-icon-help {
    /* background-color: #0ed450; */
}
</style>
