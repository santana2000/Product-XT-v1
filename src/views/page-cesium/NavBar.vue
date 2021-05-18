<template>
    <!-- 导航按钮     -->
  <div class="my-navbar">
    <!-- assets的资源在这里用 -->
    <div class="my-navbar-item" v-for="item in navBarList" :key=item.id>
      <el-tooltip class="item" effect="dark" :content=item.tip placement="right-start">
        <i :class=item.src @click="showPlugins(item.name)"></i>
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
import yBus from '@/js/common/bus.js'

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
              name:'Measure',
              src:'iconfont iconyhhuizhi'
            },
            {
               id:2,
              tip:'标注',
              name:'Draw',
              src:'iconfont iconyhdrawSpace2'
            },
            {
               id:3,
              tip:'缓冲区',
              name:'Buffer',
              src:'iconfont iconyhdrawSpace2'
            }
            ],


        };
    },
    mounted(){

    },
    methods:{
      //菜单形式1
      /* showPlugins(){
        this.$router.push({path:'/home/draw'})
      }, */
      //菜单形式2
      showPlugins(name){
        //方法一 vuex管理状态
        //提交commit,更改显隐
        this.$store.commit(`active${name}`)


        //方法二 公共组件bus传值
        // yBus.$emit('showMeasureTool',name)
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
  width: 40px;
  height: 160px;
  /* padding: 20px; */
  padding: 5px;
  background-color: aquamarine;
}

.iconyhhuizhi{
  font-size: 32px;
}
.iconyhdrawSpace2{
  font-size: 32px;
}
</style>
