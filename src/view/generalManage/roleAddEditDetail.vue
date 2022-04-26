<template>
  <div class="user-add-edit-detail">
    <div class="list-page-box">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="描述" prop="description">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="bottom-btn">
        <span class="usual-btn" @click="save" v-show="pageType !== 'detail'"
          >保存</span
        >
        <span
          class="usual-btn"
          @click="resetForm"
          v-show="pageType !== 'detail'"
          >重置</span
        >
        <span class="usual-btn" @click="goBack">返回</span>
      </div>
    </div>
  </div>
</template>

<script>
import { addOrEditRole } from "./api";
import { cloneDeep } from "lodash";
export default {
  name: "proClassification",
  data() {
    return {
      form: {},
      rules: {
        roleName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        description: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ]
      },
      deptList: [],
      roleList: [],
      pageType: "detail",
    };
  },
  created() {
    // getDeptList({ pageSize: 10000, currentPage: 1 }).then((res) => {
    //   this.deptList = res.data.data.records;
    // });
    if (this.$route.params.pageType) {
      this.pageType = this.$route.params.pageType;
      localStorage.setItem("pageType", this.$route.params.pageType);
    } else {
      this.pageType = localStorage.getItem("pageType");
    }

    if (this.pageType !== "add") {
      if (this.$route.params.data) {
        this.data = this.$route.params.data;
        localStorage.setItem("data", JSON.stringify(this.$route.params.data));
      } else {
        this.data = JSON.parse(localStorage.getItem("data"));
      }
      this.form = cloneDeep(this.data) || {};
    }
  },
  methods: {
    save() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.form.status = 1
          addOrEditRole(this.form).then((res) => {
            if (res.data.code === "success") {
              this.$message.success("搞作成功");
              this.goBack();
            }
          });
        } else {
          return false;
        }
      });
    },
    goBack() {
      this.$router.push({ name: "rolesManage" });
      localStorage.removeItem("data");
      localStorage.removeItem("pageType");
      this.form = {};
    },
    resetForm() {
      if (this.pageType === "add") {
        this.form = {};
      } else if (this.pageType === "edit") {
        this.form = cloneDeep(this.data) || {}
      }
      this.$refs["ruleForm"].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.user-add-edit-detail {
  height: 100%;
  width: 100%;
  display: flex;
  padding: 15px 0;
  overflow: hidden;
  .list-page-box {
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
        color: #bad7f0;
        text-align: right;
        margin-right: 20px;
      }
    }
    .bottom-btn {
      position: absolute;
      bottom: 30px;
      right: 60px;
    }
  }
}
</style>
