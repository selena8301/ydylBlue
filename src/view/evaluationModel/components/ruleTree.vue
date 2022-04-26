<template>
  <div class="model-tree">
    <div class="panel_style tree-container">
      <el-tree :indent="30"
        class="tree filter-tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="clickTree"
        ref="tree"
      >
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "modelTree",
  data() {
    return {
      data: [
        {
          id: 1,
          label: "战争经济支持力分析",
          children: [
            {
              id: 5,
              label: "第一产业可持续性",
              children: [],
            },
            {
              id: 6,
              label: "第二产业可持续性",
              children: [],
            },
            {
              id: 7,
              label: "第三产业可持续性",
              children: [],
            },
            {
              id: 8,
              label: "总实力分析模型",
              children: [],
            },
          ],
        },
        {
          id: 2,
          label: "核心要数战争实力分析",
          children: [
            {
              id: 9,
              label: "常备军规模实力",
              children: [],
            },
            {
              id: 10,
              label: "常备军力量结构",
              children: [],
            },
            {
              id: 11,
              label: "常备军建设质量",
              children: [],
            },
            {
              id: 12,
              label: "常备军战备水平",
              children: [],
            },
          ],
        },
        {
          id: 3,
          label: "军事外交实力分析",
          children: [
            {
              id: 13,
              label: "国际维和实力",
              children: [],
            },
            {
              id: 14,
              label: "教训训练合作能力",
              children: [],
            },
            {
              id: 15,
              label: "军事实力",
              children: [],
            },
          ],
        },
        {
          id: 4,
          label: "武装力量规模",
          children: [
            {
              id: 16,
              label: "国际维和实力",
              children: [],
            },
            {
              id: 17,
              label: "武装力量结构",
              children: [],
            },
            {
              id: 18,
              label: "武装力量布局",
              children: [],
            },
            {
              id: 19,
              label: "武装力量建设质量",
              children: [],
            },
            {
              id: 20,
              label: "武装力量装备水平",
              children: [],
            },
            {
              id: 21,
              label: "武装力量运用基础",
              children: [],
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
  methods: {
    clickTree(a, b, c, d) {
      this.$emit("treeId", a.id);
    },
    filterNode() {},
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>
.model-tree{
  height: 100%;
  overflow: auto;
}
</style>
