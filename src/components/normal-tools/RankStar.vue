<template>
    <div id="rank-level-star">
        <ul>
            <!-- <li v-for="item in starList" :key='id'>
                <i class="icon-font"></i>
            </li> -->
        </ul>
    </div>
  
</template>

<script>
export default {
    name:'RankStar',
    data() {
        return {
            sideBarShowFlag: false,
            activeIndex1: 0,
            activeIndex2: 0,
            // activeIndex2: 'z',   //默认不显示
            pointNum: 3,
             
            timer: "",
             
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

}
</script>

<style>

</style>