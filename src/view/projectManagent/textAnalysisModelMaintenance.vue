<template>
  <div class="text-analysis-model-maintenance">
    <div class="left-side-box">
      <span
        class="usual-btn"
        :active="currentPage === 'IdentifyTask'"
        @click="changeState('IdentifyTask')"
        >识别任务</span
      >
      <span
        class="usual-btn"
        :active="currentPage === 'SampleManage'"
        @click="changeState('SampleManage')"
        >自定义样本库</span
      >
      <span
        class="usual-btn"
        :active="currentPage === 'IdentifyTheResults'"
        @click="changeState('IdentifyTheResults')"
        >识别结果</span
      >
      <!-- <span class="usual-btn" :active="currentPage === 'GroupManage'" @click="changeState('GroupManage')">分组管理</span> -->
      <!-- <span class="usual-btn" :active="currentPage === 'ModelManage'" @click="changeState('ModelManage')">模型管理</span> -->
      <!-- <span class="usual-btn" :active="currentPage === 'ModelTraining'" @click="changeState('ModelTraining')">模型训练</span> -->
    </div>
    <component class="list-page-box" :is="currentPage"></component>
  </div>
</template>

<script>
import SampleManage from "./components/SampleManage.vue";
import IdentifyTheResults from "./components/IdentifyTheResults.vue";
import IdentifyTask from "./components/IdentifyTask.vue";
// import GroupManage from './components/GroupManage.vue'
// import ModelManage from './components/ModelManage.vue'
// import ModelTraining from './components/ModelTraining.vue'
export default {
  name: "textAnalysisModelMaintenance",
  components: {
    SampleManage,
    IdentifyTheResults,
    IdentifyTask,
    // GroupManage,
    // ModelManage,
    // ModelTraining
  },
  data() {
    return {
      currentPage: "IdentifyTask",
    };
  },
  methods: {
    changeState(type) {
      this.currentPage = type;
    },
  },
};
</script>

<style lang="scss">
.text-analysis-model-maintenance {
  height: 100%;
  width: 100%;
  display: flex;
  padding: 10px 10px 0;
  background: #e9e9e9 !important;
  overflow: hidden;
  .left-side-box {
    width: 160px !important;
    background: #fff !important; //2021-12-22 yjl
    flex-shrink: 0;
    overflow: hidden;
    padding-top: 20px;
    .usual-btn {
      display: block;
      width: calc(100% - 30px);
      margin: 10px 15px;
    }
  }
  .list-page-box {
    background: #fff !important; //2021-12-22 yjl
    padding: 10px 40px;
    margin-left: 10px;
  }
}
</style>
