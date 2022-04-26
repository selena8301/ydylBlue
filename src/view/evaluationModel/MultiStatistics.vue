<template>
  <div class="multi-statistics">
    <div class="left-side-box">
      <div class="tree">
        <el-tree :indent="30"
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          ref="tree"
        >
        </el-tree>
      </div>
      <div class="bottom-btn">
        <span class="usual-btn">添加统计模型</span>
      </div>
    </div>
    <div class="list-page-box" style="overflow:auto">
      <right-block></right-block>
    </div>
  </div>
</template>

<script>
import RightBlock from './multiComps/index.vue'
export default {
  name: "MultiStatistics",
  components: {
    RightBlock
  },
  data() {
    return {
      form: {},
      data: [
        {
          id: 3,
          label: "全要素战争实力分析模型",
        },
        {
          id: 3,
          label: "核心要素战争实力分析",
        },
        {
          id: 4,
          label: "军事外交实力分析",
        },
        {
          id: 5,
          label: "战争经济支持力分析",
        }
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.multi-statistics {
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  .left-side-box {
    flex-shrink: 0;
    position: relative;
    overflow: hidden !important;
    padding: 15px !important;
    background: #fff !important;
    .tree {
      height: calc(100% - 60px);
      // padding: 20px;
      width: 100%;
    }
    .bottom-btn{
      width: 100%;
      position: absolute;
      bottom: 15px;
      text-align: center;
    }
  }
  .list-page-box {
    // padding: 60px 40px !important;
    // padding-bottom: 100px !important;
    // margin-left: 10px;
    margin-left: 10px;
    padding: 15px !important;
    background: #fff !important;
    position: relative;
    .form-item {
      display: flex;
      line-height: 45px;
      width: 80%;
      .label {
        width: 120px;
        color: #bad7f0;
        text-align: right;
        margin-right: 20px;
      }
    }
    .bottom-btn{
        position: absolute;
        bottom: 30px;
        right: 60px;
    }
  }
}
</style>
