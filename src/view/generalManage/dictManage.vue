<template>
  <div class="pro-classification">
    <div class="left-side-box">
      <div class="tree">
        <div class="search-box">
          <el-input
            size="mini"
            placeholder="输入关键字进行过滤"
            v-model="filterText"
          >
          </el-input>
        </div>
        <div class="inner-box">
          <el-tree
            :indent="20"
            class="filter-tree"
            :data="dictDataTree"
            :props="defaultProps"
            :filter-node-method="filterNode"
            node-key="id"
            :default-checked-keys="checkedKey"
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
                  v-show="!data.editAble"
                  class="el-icon-edit"
                  @click.stop="editDept(data)"
                ></i>
                <i
                  title="删除"
                  v-show="!data.editAble"
                  class="el-icon-delete"
                  @click.stop="deleteDept(data)"
                ></i>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
      <div class="btns">
        <span class="usual-btn" @click="addFirstLevel">新建一级字典</span>
        <!-- <span class="usual-btn" @click="fetchData">刷新</span> -->
      </div>
    </div>
    <div class="list-page-box" v-if="pageType !== 'detail'">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-col :span="16">
          <el-form-item label="字典名称" prop="dictName">
            <el-input v-model="form.dictName"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="16">
          <el-form-item label="是否锁定" prop="keyWords">
            <el-radio v-model="form.editAble" :label="0">否</el-radio>
            <el-radio v-model="form.editAble" :label="1">是</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="分类规则" prop="rules">
            <el-input v-model="form.rules"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="是否自动" prop="auto">
            <el-radio v-model="form.auto" :label="0">否</el-radio>
            <el-radio v-model="form.auto" :label="1">是</el-radio>
          </el-form-item>
        </el-col> -->
      </el-form>
      <div class="bottom-btn">
        <span class="usual-btn" @click="commit">保存</span>
        <span class="usual-btn">重置</span>
        <span class="usual-btn" @click="goback">取消</span>
      </div>
    </div>
    <div class="list-page-box" v-else>
      <div class="form-item">
        <span class="label">字典名称</span>
        <span class="value">{{ form.dictName }}</span>
      </div>
      <div class="form-item">
        <span class="label">创建时间</span>
        <span class="value">{{ form.createTime }}</span>
      </div>
      <!-- <div class="form-item">
        <span class="label">是否锁定</span>
        <span class="value">{{ form.editAble? '是': '否' }}</span>
      </div>
      <div class="form-item">
        <span class="label">是否自动</span>
        <span class="value">{{ form.auto? '是': '否' }}</span>
      </div>
      <div class="form-item">
        <span class="label">分类规则</span>
        <span class="value">{{ form.rules }}</span>
      </div> -->
      <!-- <div class="form-item">
        <span class="label">关键词</span>
        <span class="value">{{ form.keyWords }}</span>
      </div>
      <div class="form-item">
        <span class="label">专题描述</span>
        <span class="value">{{ form.desc }}</span>
      </div> -->
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import { DbDictEdit, DbDictAdd, DbDictDelete } from "../generalManage/api";
import { mapGetters } from "vuex";
export default {
  name: "countryMenu",
  data() {
    return {
      filterText: "",
      data: [],
      form: {
        editAble: 0,
      },
      checkedKey: [],
      pageType: "detail",
      parentId: "",
      rules: {
        dictName: [
          { required: true, message: "请输入字典名称", trigger: "blur" },
        ],
      },
      defaultProps: {
        children: "children",
        label: "dictName",
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  computed: {
    ...mapGetters(["dictDataTree"]),
  },
  methods: {
    findFirstChildren(data) {
      if (data.children && data.children.length > 0) {
        this.findFirstChildren(data.children[0]);
      } else {
        this.checkedKey = [data.id];
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.checkedKey[0]);
          this.clickNode(data);
        });
      }
    },
    // 点击确认
    commit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.parentId) {
            this.form.parentId = this.parentId;
          }
          if (this.pageType === "add") {
            DbDictAdd(this.form).then((res) => {
              if ((res.data.code = "success")) {
                this.$message.success("操作成功");
                this.fetchData();
                this.parentId = "";
                this.pageType = "detail";
              }
            });
          } else if (this.pageType === "edit") {
            DbDictEdit(this.form).then((res) => {
              if ((res.data.code = "success")) {
                this.$message.success("操作成功");
                this.fetchData();
                this.parentId = "";
                this.pageType = "detail";
              }
            });
          }
        }
      });
    },
    // 点击取消
    goback() {
      this.fetchData();
      this.parentId = "";
      this.pageType = "detail";
    },
    // 点击新建一级字典
    addFirstLevel() {
      this.pageType = "add";
      this.form = {
        editAble: 0,
      };
    },
    // 点击树的一条
    clickNode(data) {
      this.form = cloneDeep(data);
    },
    // 点击新增子菜单
    addChildren(data) {
      this.pageType = "add";
      this.form = {
        editAble: 0,
      };
      this.parentId = data.id;
    },
    // 点击修改
    editDept(data) {
      this.pageType = "edit";
      this.form = cloneDeep(data);
    },
    // 点击删除
    deleteDept(data) {
      this.$confirm("是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        DbDictDelete(data.id).then((res) => {
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
      this.$store.dispatch("getDbDictTree");
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.dictName.indexOf(value) !== -1;
    },
  },
};
</script>

<style scoped lang="scss">
.pro-classification {
  height: 100%;
  width: 100%;
  display: flex;
  // padding: 10px 10px 0;
  background: #e9e9e9;
  overflow: hidden;
  .left-side-box {
    // width: 40% !important;
    padding: 15px 0;
    background: #fff !important; //2021-12-22 yjl
    .tree {
      height: calc(100% - 60px);
      margin-top: 10px;
      padding: 10px 20px;
      overflow: hidden;
      .search-box {
        margin-bottom: 10px;
      }
      .inner-box {
        overflow: auto;
        height: calc(100% - 40px);
      }
    }
    .btns {
      height: 50px;
      width: 100%;
      text-align: center;
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
        color: #606366;
        text-align: right;
        margin-right: 20px;
      }
      .value {
        // color: #eee;
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
        margin-right: 5px;
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
