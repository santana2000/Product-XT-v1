<template>
    <!-- 导航按钮     -->
  <div class="my-navbar">
    <!-- assets的资源在这里用 -->
 
    <div id="a">
      sss
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'NavBar',
  components: {
    
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
            // this.$router.push(name,'/BlogDetails')
            // this.$router.push({path:`/BlogDetails/${blogID}`})
            this.$router.push({path:'/blog/articles', 
                query:{ blogID: this.blogListData[index].uuid}
            })

        },
            
    }
}
</script>
<style scoped>
#a{
  position: absolute;
  top: 160px;
  left: 20px;
  width: 40px;
  height: 100px;
  background-color: aquamarine;
}
</style>
