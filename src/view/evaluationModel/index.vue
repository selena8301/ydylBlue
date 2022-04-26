<template>
    <div class="evaluation-model">
        <div class="btn-line" v-show="$route.meta.showBtns">
            <div class="default-btn btns" :class="{'active-btn': currentRoute === 'processChoreographer'}" @click="linkToTab('processChoreographer')">分析流程编排</div>
            <div class="default-btn btns" :class="{'active-btn': currentRoute === 'multiStatistics'}" @click="linkToTab('multiStatistics')">多维统计</div>
            <div class="default-btn btns" :class="{'active-btn': currentRoute === 'analysisReport'}" @click="linkToTab('analysisReport')">分析报告</div>
        </div>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'evaluationModel',
    data () {
        return {
            currentRoute: 'processChoreographer'
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
.evaluation-model{
    // padding: 0 20px;
    display: flex;
    flex-direction: column;
    .content{
        flex: 1;
        overflow: hidden;
        background: #e9e9e9;
        padding: 10px 10px 0;
        border-top: 2px solid #ccc;
    }
}
</style>
