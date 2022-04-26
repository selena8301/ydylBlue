<template>
    <div class="general-managent">
        <div class="btn-line" v-show="$route.meta.showBtns">
            <div class="default-btn btns" :class="{'active-btn': currentRoute === 'userManage'}" @click="linkToTab('userManage')">用户管理</div>
            <div class="default-btn btns" :class="{'active-btn': currentRoute === 'rightsManage'}" @click="linkToTab('rightsManage')">权限管理</div>
            <div class="default-btn btns" :class="{'active-btn': currentRoute === 'depManage'}" @click="linkToTab('depManage')">组织机构管理</div>
            <div class="default-btn btns" :class="{'active-btn': currentRoute === 'rolesManage'}" @click="linkToTab('rolesManage')">角色管理</div>
            <div class="default-btn btns" :class="{'active-btn': currentRoute === 'dictManage'}" @click="linkToTab('dictManage')">字典管理</div>
        </div>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'generalManage',
    data () {
        return {
            currentRoute: 'userManage'
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
.general-managent{
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
