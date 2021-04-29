<template>
  <!-- 标题栏 + 右侧的小控件 -->
  <div class="my-titlebar">
    <!-- assets的资源在这里用 -->
        <div id="title-name">
            <!-- 可视化 -->
            {{nowTitle}}
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
            nowTitle:'',
        };
    },
    mounted(){
      // this.getMockData();

    },
    methods:{
        getBlogContent(index){
            // this.$router.push(name,'/BlogDetails')
            // this.$router.push({path:`/BlogDetails/${blogID}`})
            this.$router.push({path:'/blog/articles', 
                query:{ blogID: this.blogListData[index].uuid}
            })

        },
        getMockData(){
          this.$axios.get('/data/index').then(res => {            
              console.log(res);  
              // this.nowTitle = res.data[3].Address      
          }).catch(err => {            
                          
          });
        }
            
    }
}
</script>

<style scoped>
#title-name{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 80px;
  /* padding-right: 10px; */
color: whitesmoke;
font-size: 30px;
  background-color: transparent;
  /* background-color: rgba(43, 129, 199, 0.808); */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
