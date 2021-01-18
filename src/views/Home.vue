<template>
  <div class="home">
    <!-- assets的资源在这里用 -->
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->

    <!-- 在组件中调节样式 -->

    <MapContainer/>
    <TitleBar/>
    <NavBar/>

  </div>
</template>

<script>                      
// @ is an alias to /src
import MapContainer from './page-cesium/MapContainer.vue';
import TitleBar from './page-cesium/TitleBar.vue';
import NavBar from './page-cesium/NavBar.vue';

export default {
  name: 'Home',
  components: {
    MapContainer,
    NavBar,
    TitleBar
  },
    data(){
        return {
            //搜索框输入值
            searchValue:'',

            //存放博文列表的数组
            blogListData:[
                { uuid:1,title:'nodejs 的使用',author:'wang',time:'2020-11-26'},
                { uuid:2,title:'c++ 的使用',author:'wang',time:'2020-10-21'},
                { uuid:3,title:'type js 的使用',author:'wang',time:'2020-08-22'},
                { uuid:4,title:'python 的使用',author:'wang',time:'2020-05-18'},
                { uuid:5,title:'css 的使用',author:'wang',time:'2020-05-08'},
            ],


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
.home{
  height: 90%;
  position: relative;
}

</style>>

