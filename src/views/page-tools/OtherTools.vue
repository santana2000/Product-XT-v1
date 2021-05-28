<template>
  <div class="my-other">
      <SlideBar></SlideBar>
  </div>
</template>

<script>
// @ is an alias to /src
import SlideBar from '@/components/normal-tools/SlideBar.vue'

export default {
  name: 'OtherTools',
  components: {
    SlideBar
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
    height: 100%;
    margin-left: 200px;
    background-color: rgba(219, 173, 22, 0.74);
    overflow-x: hidden;
}


</style>>