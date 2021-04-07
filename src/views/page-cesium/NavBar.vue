<template>
    <!-- 导航按钮     -->
  <div class="my-navbar">
    <!-- assets的资源在这里用 -->
    <div class="my-navbar-item" v-for="item in navBarList" :key=item.id>
      <el-tooltip class="item" effect="dark" :content=item.tip placement="top-start">
        <i :class=item.src @click="showPlugins"></i>
      </el-tooltip>
    </div>
 
    <!-- <div id="a">
      线vx
      <i class="iconfont iconyhhuizhi"></i>
    </div>
    <div id="b">
      面vx
      <i class="iconfont iconyhdrawSpace2"></i>
    </div> -->
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
            //导航菜单
            navBarList:[{
              id:1,
              tip:'测量',
              src:'iconfont iconyhhuizhi'
            },{
               id:2,
              tip:'标注',
              src:'iconfont iconyhdrawSpace2'
            }],


        };
    },
    mounted(){

    },
    methods:{
      showPlugins(){
        this.$router.push({path:'/home/draw'})
      },
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
.my-navbar{
  position: absolute;
  top: 160px;
  left: 20px;
  width: 80px;
  height: 160px;
  background-color: aquamarine;
}

.iconyhhuizhi{
  font-size: 32px;
}
.iconyhdrawSpace2{
  font-size: 32px;
}
</style>
