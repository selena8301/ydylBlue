<template>
  <div class="dep-manage">
    <div class="left-side-box">
      <div class="tree">
        <el-tree
          :indent="30"
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          ref="tree"
        >
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
            @click="clickNode(data)"
          >
            <span>{{ node.label }}</span>
            <span class="tree-btns">
              <i
                title="新增子机构"
                class="el-icon-plus"
                @click.stop="addChildren(data)"
              ></i>
              <i
                title="修改"
                class="el-icon-edit"
                @click.stop="editDept(data)"
              ></i>
              <i
                title="删除"
                class="el-icon-delete"
                @click.stop="deleteDept(data)"
              ></i>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="btns">
        <span class="usual-btn" @click="addFirstLevel">新建一级部门</span>
      </div>
    </div>
    <div class="list-page-box" v-if="pageType !== 'detail'">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-col :span="16">
          <el-form-item label="机构名称" prop="deptName">
            <el-input v-model="form.deptName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="机构描述" prop="description">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="bottom-btn">
        <span class="usual-btn" @click="commit">确认</span>
        <span class="usual-btn">重置</span>
        <span class="usual-btn" @click="goback">取消</span>
      </div>
    </div>
    <div class="list-page-box" v-else>
      <div class="form-item">
        <span class="label">机构名称</span>
        <span class="value">{{ form.deptName }}</span>
      </div>
      <div class="form-item">
        <span class="label">机构描述</span>
        <span class="value">{{ form.description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { addOrEditDept, getDeptTree, deleteDept } from "./api";
import { cloneDeep } from "lodash";
export default {
  name: "trackingIndex",
  data() {
    return {
      form: {},
      data: [
        {
          id: 2,
          deptName: "研发部",
          children: [
            {
              id: 7,
              deptName: "研发一部",
              description: '主要研发内容： XXX, XXXXX'
            },
            {
              id: 8,
              deptName: "研发二部",
            },
            {
              id: 8,
              deptName: "研发三部",
            },
          ],
        },
        {
          id: 2,
          deptName: "产品室",
        },
        {
          id: 2,
          deptName: "设计部",
        },
      ],
      pageType: "detail",
      parentId: "",
      rules: {
        deptName: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
        ],
        description: [{ required: true, message: "请输入机构描述", trigger: "blur" }],
      },
      defaultProps: {
        children: "children",
        label: "deptName",
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // 点击新建一级部门
    addFirstLevel() {
      this.pageType = "add";
      this.form = {};
    },
    // 点击确认
    commit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.form.status = 1;
          if (this.parentId) {
            this.form.parentId = this.parentId;
          }
          addOrEditDept(this.form).then((res) => {
            if ((res.data.code = "success")) {
              this.$message.success("操作成功");
              this.fetchData();
              this.parentId = "";
              this.pageType = "detail";
            }
          });
        }
      });
    },
    // 点击取消
    goback() {
      this.fetchData();
      this.parentId = "";
      this.pageType = "detail";
    },
    // 点击树的一条
    clickNode(data) {
      this.form = cloneDeep(data);
    },
    // 点击新增子菜单
    addChildren(data) {
      this.pageType = "add";
      this.form = {};
      this.parentId = data.id;
    },
    // 点击修改
    editDept(data) {
      this.pageType = "add";
      this.form = cloneDeep(data);
    },
    // 点击删除
    deleteDept(data) {
      this.$confirm("是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteDept(data.id).then((res) => {
          if ((res.data.code = "success")) {
            this.$message.success("操作成功");
            this.fetchData();
            this.parentId = "";
            this.pageType = "detail";
          }
        });
      });
    },
    fetchData() {
      getDeptTree({ pageSize: 10000, currentPage: 1 }).then((res) => {
        this.data = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dep-manage {
  height: 100%;
  width: 100%;
  display: flex;
  // padding: 15px 0;
  overflow: hidden;
  .left-side-box {
    flex-shrink: 0;
    padding: 15px !important;
    background: #fff !important;
    .tree {
      height: calc(100% - 50px);
      overflow: auto;
      padding: 20px;
    }
    .btns {
      height: 50px;
      width: 100%;
      text-align: center;
    }
  }
  .list-page-box {
     background: #fff !important;
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
      .value {
        color: #1e1d1d;
      }
    }
    .bottom-btn {
      position: absolute;
      bottom: 30px;
      right: 60px;
    }
  }
  .custom-tree-node {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .tree-btns {
      display: none;
      i {
        margin-left: 5px;
        cursor: pointer;
      }
      .el-icon-delete {
        color: #f76969;
      }
      .el-icon-edit {
        color: rgb(250, 173, 29);
      }
      .el-icon-plus {
        color: rgb(2, 252, 2);
        // font-weight: bold;
        font-size: 15px;
      }
    }
    &:hover {
      .tree-btns {
        display: inline-block;
      }
    }
  }
}
</style>
