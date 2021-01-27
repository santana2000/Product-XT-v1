<template>
    <div class="my-navtree">
        <div id="my-tree-el">
            <el-tree :data="treeData" @node-click="changeView" node-key="id">
            </el-tree>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: "NavTree",
    components: {},
    data() {
        return {
            //搜索框输入值
            searchValue: "",
            treeData: [
                {
                    id: 1,
                    label: "VisualTools",
                    children: [
                        {
                            label: "e-chart",
                            children: [
                                {
                                    label: "三级 1-1-1",
                                },
                            ],
                        },
                        {
                            label: "ant-v",
                        },
                    ],
                },
                {
                    id: 2,
                    label: "zzzzz",
                },
                {
                    id: 3,
                    label: "OtherTools",
                },
            ],
        };
    },
    mounted() {},
    methods: {
        //切换路由
        changeView(node) {
            for (var i = 0; i < this.treeData.length; i++) {
                if (this.treeData[i].label == node.label) {
                    //点击外层跳转路由
                    // this.$router.push({path: `/about/${node.label}`})
                    this.$router.push({ name: node.label });

                    //如果有子节点就打印出来子节点的值（备用），实际没必要，只要在点击的时候打印即可
                    if (this.treeData[i].children != undefined) {
                        for (
                            var m = 0;
                            m < this.treeData[i].children.length;
                            m++
                        ) {
                            if (
                                this.treeData[i].children[m].label ==
                                node.children[m].label
                            ) {
                                // console.log(node.children[m].label);
                            }
                        }
                    }
                }
            }
            /* this.$router.push({
                path: "/blog/articles",
                query: { blogID: this.blogListData[index].uuid },
            }); */
        },
    },
};
</script>

<style scoped>
.my-navtree {
    height: 100%;
    float: left;
}
#my-tree-el {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 200px;
    background-color: rgb(68, 179, 114);
}
</style
>>
