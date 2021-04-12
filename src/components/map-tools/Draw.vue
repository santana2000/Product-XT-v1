<template>
  <div id="draw">
      绘制插件
        <i class="iconfont iconyhhuizhi"></i>
        <!-- <i :class=item.src @click="showPlugins"></i> -->
      
  </div>
</template>

<script>
export default {

  name: "Draw",
  data(){
    return {
      data:"aa",

    };
  },
}
</script>

<style>
#draw{
    position: absolute;
    right: 30px;
    top: 30px;
    background-color: cadetblue;
    height: 100px;
    width: 40px;
}
</style>