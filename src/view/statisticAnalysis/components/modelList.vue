<template>
    <div class="model-tree">
       <div class="panel_style tree-container">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @select="handleSelect"
                @close="handleClose"
                background-color="#003742"
                text-color="#fff"
                active-text-color="#ffd04b"
                >
                <el-menu-item index="1">
                   <i class="el-icon-location"></i>
                    <span>全要素战争实力分析模型</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">核心要素战争实力分析</span>
                </el-menu-item>
                <el-menu-item index="3" >
                  <i class="el-icon-document"></i>
                  <span slot="title">军事外交实力分析</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">战争经济支持力分析</span>
                </el-menu-item>
              </el-menu>
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
        }
    },
    
    methods:{
       handleSelect(val){
         this.$emit("chnageMenu",val)
        },
        handleClose(){

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
    background-color: #003742;
}

</style>
