<template>
  <!-- 标题栏 + 右侧的小控件 -->
  <div class="my-titlebar">
    <!-- assets的资源在这里用 -->
        <div id="b">
          sssssaa
        </div>
 
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'TitleBar',
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
#b{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100px;
  /* padding-right: 10px; */

  background-color: rgb(62, 139, 202);
}
</style>
