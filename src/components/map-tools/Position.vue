<template>
  <div class="home">
    <!-- assets的资源在这里用 -->
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Position',
  components: {
    HelloWorld
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
