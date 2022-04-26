<template>
    <div class="data-managent">
        <div class="btn-line" v-show="$route.meta.showBtns">
            <!-- <div class="default-btn btns" :class="{'active-btn': currentRoute === 'countryIndex'}" @click="linkToTab('countryIndex', '沿线国家安全')">沿线国家安全</div> -->
            <!-- <div class="default-btn btns" :class="{'active-btn': currentRoute === 'bigCountry'}" @click="linkToTab('bigCountry', '大国博弈')">大国博弈</div> -->
            <!-- <div class="default-btn btns" :class="{'active-btn': currentRoute === 'tracking'}" @click="linkToTab('tracking', '发展态势跟踪')">发展态势跟踪</div> -->
            <div class="default-btn btns" :class="{'active-btn': currentRoute === 'dataSourse'}" @click="linkToTab('dataSourse', '数据源管理')">数据源管理</div>
            <div class="default-btn btns" :class="{'active-btn': currentRoute === 'dataIntegration'}" @click="linkToTab('dataIntegration', '数据集成')">数据集成</div>
            <div class="default-btn btns" :class="{'active-btn': currentRoute === 'dataModel'}" @click="linkToTab('dataModel', '数据模型管理')">数据模型管理</div>
            <!-- <div class="default-btn btns" :class="{'active-btn': currentRoute === 'countryDB'}" @click="linkToTab('countryDB', '国家库')">国家库</div> -->
            <!-- <div class="default-btn btns" :class="{'active-btn': currentRoute === 'fullTextSearch'}" @click="linkToTab('fullTextSearch', '全文检索')">全文检索</div> -->
        </div>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dataManagent',
    data () {
        return {
            currentRoute: 'countryIndex'
        }
    },
    watch: {
        $route: {
            handler(newVal) {
                if (newVal.name === 'ProjectList') {
                    if (newVal.params.oldPage === 'countryIndex') {
                        this.currentRoute = 'countryIndex'
                    } else if (newVal.params.oldPage === 'bigCountry') {
                        this.currentRoute = 'bigCountry'
                    }
                } else {
                    this.currentRoute = newVal.name
                }
            },
            immediate: true,
            deep: true
        },
    },
    methods:{
        linkToTab(path, name) {
            this.currentRoute = path
            this.$router.push({name: path})
            this.$store.dispatch('setCurrentZtType', name)
        }
    }
}
</script>

<style scoped lang="scss">
.data-managent{
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
