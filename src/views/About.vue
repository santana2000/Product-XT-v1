<template>
  <div class="about">
    <NavTree></NavTree>
    <!-- <VisualTools></VisualTools>
    <ElementTools></ElementTools> -->
    <router-view></router-view>
  </div>
</template>
<script>
// @ is an alias to /src
import NavTree from './page-table/NavTree.vue';
import VisualTools from './page-table/VisualTools.vue';
import ElementTools from './page-table/ElementTools.vue';


export default {
  name: 'About',
  components: {
    NavTree,VisualTools,ElementTools
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
        getBlogContent(index){
             
        },
            
    }
}
</script>

<style scoped>
.about{
  height: 90%;
  position: relative;
  background-color: rgb(185, 89, 137);
}

</style>>