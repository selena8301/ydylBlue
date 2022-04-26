<template>
    <div class="project-managent">
        <div class="btn-line" v-show="$route.meta.showBtns">
            <div class="default-btn btns" :class="{'active-btn': currentRoute === 'proHot'}" @click="linkToTab('proHot')">专题热点管理</div>
            <!-- <div class="default-btn btns" :class="{'active-btn': currentRoute === 'proMaintenance'}" @click="linkToTab('proMaintenance')">专题维护</div> -->
            <div class="default-btn btns" :class="{'active-btn': currentRoute === 'textAnalysisModelMaintenance'}" @click="linkToTab('textAnalysisModelMaintenance')">文本分析模型维护</div>
        </div>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'projectManagent',
    data () {
        return {
            currentRoute: 'proClassification'
        }
    },
    watch: {
        $route: {
            handler(newVal) {
                this.currentRoute = newVal.name
            },
            immediate: true,
            deep: true
        },
    },
    methods:{
        linkToTab(name) {
            this.currentRoute = name
            this.$router.push({name: name})
        }
    }
}
</script>

<style scoped lang="scss">
.project-managent{
    // padding: 0 20px;
    display: flex;
    flex-direction: column;
    .content{
        flex: 1;
        overflow: hidden;
        background: #e9e9e9;
    }
}
</style>
