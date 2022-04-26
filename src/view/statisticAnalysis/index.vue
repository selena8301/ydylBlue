<template>
    <div class="SAnalysis">
        <div class="SAnalysis-box">
            <div class="left-side-box">
                <div class="line-btn" :class="{'active': menuType === index}" @click="chooseMx(item, index)" v-for="(item, index) in fxmxs" :key="index"><i class="el-icon-s-data"/>{{item.name}}</div>
            </div>
            <div class="right-side-box">
                <!-- <el-aside>
                    <model-list @chnageMenu='chnageMenu'></model-list>
                </el-aside> -->
                <el-main>
                    <right-content1 v-if='menuType == 0'></right-content1>
                    <right-content2 v-if='menuType == 1'></right-content2>
                    <right-content3 v-if='menuType == 2'></right-content3>
                    <right-content4 v-if='menuType == 3'></right-content4>
                </el-main>
            </div>
        </div>
    </div>
</template>

<script>
import modelList from "./components/modelList";
import rightContent1 from "./components/rightContent1";
import rightContent2 from "./components/rightContent2";
import rightContent3 from "./components/rightContent3";
import rightContent4 from "./components/rightContent4";
export default {
    components:{
        modelList,
        rightContent1,
        rightContent2,
        rightContent3,
        rightContent4
    },
    name: 'statisticAnalysis',
    data () {
        return {
            menuType: 0,
            fxmxs: [{
                name: '全要素战争实力分析模型'
            }, {
                name: '核心要素战争实力分析'
            }, {
                name: '军事外交实力分析'
            }, {
                name: '战争经济支持力分析'
            }]
        }
    },
    methods:{
       chooseMx(type, index){
           this.menuType = index
       }
    },
    created(){
        
    },
    mounted (){
       
    }
}
</script>

<style lang="scss">
.SAnalysis{
    background: #e9e9e9;
    padding: 10px 10px 0;
    .SAnalysis-box{
        height: 100%;
        width: 100%;
        display: flex;
        // padding-bottom: 15px;
        overflow: hidden;
       
        .left-side-box{
            // padding: 30px 0 20px 30px;
            padding: 15px !important;
            background: #fff !important;
            margin-right: 15px !important;
            .menu-btn{
                color: #fff;
                height: 40px;
                line-height: 40px;
            }
        }
    }
    .el-main{
        height: 100%;
    }
}
</style>
