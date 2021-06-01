<template>
    <div id="layer-tree">
        <!-- 图层树组件 -->
        <!-- 加入卷帘对比 -->
        <!-- <el-tree
            :data="treeData"
            :props="defaultProps"
            show-checkbox
            @check-change="handleCheckChange"
        >
        </el-tree> -->
        <div class="layer-group">
            BOXMAP<br>
             
            <el-switch
                v-model="BOXimg"
                inactive-text="影像"
                @change="swicthChange('BOXimg',BOXimg)"
            >
            </el-switch>
            <el-switch
                v-model="BOXimglabel"
                inactive-text="注记"
                @change="swicthChange('BOXimglabel',BOXimglabel)"
            >
            </el-switch>
            <el-switch
                v-model="BOXterrain"
                inactive-text="地形"
                @change="swicthChange('BOXterrain',BOXterrain)"
            >
            </el-switch>
        </div>
        <div class="layer-group">
            GDMAP<br>

            <el-switch
                v-model="GDimg"
                inactive-text="影像"
                :change="swicthChange('GDimg',GDimg)"
            >
            </el-switch>
            <el-switch
                v-model="GDimglabel"
                inactive-text="注记"
                :change="swicthChange('GDimglabel',GDimglabel)"
            >
            </el-switch>
        </div>
    </div>
</template>

<script>
import * as changeMaplayer from "./tool-maplayer.js";
export default {
    name: "LayerTree",
    data() {
        return {
            BOXimg:false,
            BOXimglabel:false,
            BOXterrain:false,

            GDimg:false,
            GDimglabel:false,
        };
    },
    mounted() {
        //先等待视图加载完成
        // this.PolyGenerator = new MeasureTools.PolylineGenerator();
    },
    methods: {
        swicthChange(type,status) {
            switch (type) {
                case 'BOXimg':
                    changeMaplayer.add_DATABOX_Img(status);

                    break;
                case 'BOXimglabel':
                    changeMaplayer.add_DATABOX_ImgLabel(status);

                    break;
                case 'BOXterrain':   
                    changeMaplayer.add_DATABOX_Terrain(status);
                    break;
                case 'GDimg':   
                    // changeMaplayer.add_DATABOX_Terrain(status);
                    break;
                case 'GDimglabel':   
                    // changeMaplayer.add_DATABOX_Terrain(status);
                    break;                                        
                default:
                    break;
            }
        },

        handleCheckChange() {
            //0. 默认加载高德底图，当没有其他底图被勾选时，该底图不可取消勾选
            //1. 判断当前勾选的图层类型，如果是影像就删除旧涂层，如果是地形就直接叠加，如果是注记先删除旧的（其实也可以叠加）
            //2. 移除  添加
            //3. 卷帘对比
        },
    },
};
</script>

<style scoped>

#layer-tree {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.layer-group{
    padding: 10px;

     display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.iconfont {
    font-size: 25px !important;
    margin-bottom: 20px;
}
.el-switch{
    margin-top: 10px;
}
</style>