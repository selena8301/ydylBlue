<template>
  <div class="pro-hot">
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
    </div>
    <div class="list-page-box">
      <div class="form-item">
        <span class="label">热点名称</span>
        <el-input size="mini" v-model="form.name" />
      </div>
      <div class="form-item">
        <span class="label">关键词</span>
        <el-input size="mini" v-model="form.author" />
      </div>
      <div class="form-item">
        <span class="label">热点描述</span>
        <el-input type="textarea" :rows="5" v-model="form.keyWords" />
      </div>
      <div class="bottom-btn">
        <span class="usual-btn">保存</span>
        <span class="usual-btn">重置</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "proHot",
  data() {
    return {
      form: {},
      data: [
        {
          id: 2,
          label: "数据管理",
          children: [
            {
              id: 7,
              label: "沿线国家安全",
            },
            {
              id: 8,
              label: "大国博弈",
            },
            {
              id: 8,
              label: "发展态势跟踪",
            },
            {
              id: 8,
              label: "数据源管理",
            },
            {
              id: 8,
              label: "数据集成",
            },
            {
              id: 8,
              label: "数据模型管理",
            },
          ],
        },
        {
          id: 3,
          label: "专题管理",
        },
        {
          id: 3,
          label: "综合态势",
        },
        {
          id: 4,
          label: "统计分析",
        },
        {
          id: 5,
          label: "分析报告",
        },
        {
          id: 6,
          label: "分析研判",
        },
        {
          id: 2,
          label: "系统管理",
          children: [
            {
              id: 7,
              label: "用户管理",
            },
            {
              id: 8,
              label: "权限管理",
            },
            {
              id: 8,
              label: "组织机构管理",
            },
            {
              id: 8,
              label: "角色管理",
            },
          ],
        },
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
.pro-hot {
  height: 100%;
  width: 100%;
  display: flex;
  padding: 10px 10px 0;
  background: #e9e9e9 !important;
  overflow: hidden;
  .left-side-box {
    background: #fff !important; //2021-12-22 yjl
    flex-shrink: 0;
    .tree {
      height: 100%;
      padding: 20px;
    }
  }
  .list-page-box {
    background: #fff !important; //2021-12-22 yjl
    padding: 60px 40px !important;
    padding-bottom: 100px !important;
    margin-left: 10px;
    position: relative;
    .form-item {
      display: flex;
      line-height: 45px;
      width: 80%;
      .label {
        width: 120px;
        // color: #bad7f0;
         color:#606366;
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
