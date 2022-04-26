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
        <span class="usual-btn">添加报告模板</span>
      </div>
    </div>
    <div class="list-page-box">
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiStatistics",
  data() {
    return {
      form: {},
      data: [
        {
          id: 3,
          label: "通报模板",
        },
        {
          id: 3,
          label: "XXXX分析报告模板",
        },
        {
          id: 4,
          label: "XXXXXXXXX分析模板",
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
  // padding: 15px 0;
  overflow: hidden;
  .left-side-box {
    flex-shrink: 0;
    position: relative;
    padding: 15px !important;
    background: #fff !important;
    .tree {
      height: calc(100% - 60px);
      padding: 20px;
    }
    .bottom-btn{
      width: 100%;
      position: absolute;
      bottom: 15px;
      text-align: center;
    }
  }
  .list-page-box {
    padding: 60px 40px !important;
    background: #fff !important;
    padding-bottom: 100px !important;
    margin-left: 10px;
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
