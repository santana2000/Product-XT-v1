<template>
  <div class="my-other">
      <SideMenu></SideMenu>
      <SlideBar></SlideBar>
      <!-- <Carousel></Carousel> -->
      <div class="zzss">
        <Carousel></Carousel>
      </div>
       
  </div>
</template>

<script>
// @ is an alias to /src
import SlideBar from '@/components/normal-tools/SlideBar.vue'
import Carousel from '@/components/normal-tools/Carousel.vue';
import SideMenu from '@/components/normal-tools/SideMenu.vue';

export default {
  name: 'OtherTools',
  components: {
    SlideBar,
    Carousel,
    SideMenu
  },
    data(){
        return {
            //搜索框输入值
            searchValue:'',
        };
    },
    mounted(){

    },
    methods:{
    
            
    }
}
</script>
<style scoped>
.my-other{
    height: 90%;
    margin-left: 200px;
    background-color: rgba(219, 173, 22, 0.205);
    overflow-x: hidden;
    position: relative;
}
.zzss{
  position: absolute !important;
  left: 10px!important;
  top:1200px!important;
}

</style>>