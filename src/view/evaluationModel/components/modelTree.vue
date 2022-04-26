<template>
    <div class="model-tree">
       <div class="panel_style tree-container">
            <el-tree :indent="30"
                class="tree filter-tree"
                :data="data"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="filterNode"
                @node-click="clickTree"
                @node-drag-end="handleDragEnd"
                draggable
                ref="tree">
            </el-tree>
        </div>
    </div>
</template>

<script>

export default {
    components:{
        
    },
    name: 'modelTree',
    data () {
        return {
            data: 
            [
             {id:1,label:'层次分析法',children:[]},
            {id:2,label:'模糊综合评估法',children:[]},
            {id:3,label:'灰色白化权函数聚类',children:[]},
            {id:4,label:'TOPSIIS法',children:[]},
            {id:5,label:'趋势面分析',children:[]},
            {id:6,label:'数据包络法',children:[]},
            {id:7,label:'极差分析',children:[]},
            {id:8,label:'方差分析',children:[]},
            {id:9,label:'组成分析',children:[]},
            {id:10,label:'因子分析',children:[]},
            {id:11,label:'支持向量机',children:[]},
            {id:12,label:'环比系数法',children:[]},
            {id:13,label:'SEA法',children:[]},
            {id:14,label:'ADC法',children:[]},
            {id:15,label:'数据一致性分析',children:[]},
            {id:16,label:'平滑滤波法',children:[]},
            {id:17,label:'窗谱分析法',children:[]},
            {id:18,label:'最大熵谱法',children:[]},
            {id:19,label:'一元拟合法',children:[]},
            {id:20,label:'点估计',children:[]},
            {id:21,label:'单总体区间估计',children:[]},
            {id:22,label:'两个总体区间估计',children:[]},
            {id:23,label:'单总计假设检验法',children:[]},
            {id:24,label:'两个总体假设检验法',children:[]},
            {id:25,label:'正太性检验',children:[]},
            {id:26,label:'奇异值过滤',children:[]},
            ],
            // [
            //   {
            //     id: 1,
            //     label: '层次分析',
            //     children: [{
            //         id: 1.1,
            //         label: '方差分析',
            //     }]
            //     }, {
            //       id: 2,
            //       label: '因子分析',
            //     }, 
            //     {
            //       id: 3,
            //       label: '主成分分析',
            //       children: [{
            //           id: 3.1,
            //           label: '点估计'
            //       },{
            //           id: 3.3,
            //           label: '一元拟合法'
            //       }]
            //     },
            //     {
            //       id: 4,
            //       label: '环比系数法',
            //     },
            //     {
            //       id: 5,
            //       label: '奇异值过滤',
            //     },
            // ],


            defaultProps: {
                children: 'children',
                label: 'label'
            },
        }
    },
    methods:{
      clickTree(a,b,c,d){
        console.log(a,b,c,d)
      },
      handleDragEnd(draggingNode, dropNode, dropType, event) {
        this.$emit("drop",{id:draggingNode.data.id,name:draggingNode.label,x:event.pageX,y:event.pageY})
      },
       filterNode(){
            
        }
    },
    created(){
        
    },
    mounted (){
       
    }
}
</script>

<style scoped>
.panel_style{
}
</style>
