<template>
  <div class="user-add-edit-detail">
    <div class="list-page-box">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="昵称">
              <el-input v-model="form.nickName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="sex">
              <!-- <el-select v-model="form.sex" placeholder="请选择"> -->
              <el-radio v-model="form.sex" label="1">男</el-radio>
              <el-radio v-model="form.sex" label="2">女</el-radio>
              <!-- </el-select> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="密码" prop="passWord">
              <el-input v-model="form.passWord"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门" prop="deptId">
              <!-- <el-select v-model="form.deptId" placeholder="请选择">
                <el-option
                  v-for="item in deptList"
                  :key="item.id"
                  :label="item.deptName"
                  :value="item.id"
                >
                </el-option>
              </el-select> -->
              <el-cascader
                style="width: 100%; line-height: 38px"
                size="mini"
                :props="addFormCascader"
                :show-all-levels="false"
                v-model="form.deptId"
                :options="deptList"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="角色" prop="roleIds">
              <el-select v-model="form.roleIds" multiple placeholder="请选择">
                <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码" prop="mobile">
              <el-input type="tel" v-model="form.mobile"></el-input>
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
import { getDeptTree, userAdd, userEdit, getRoleList } from "./api";
import { isEmail } from "@/assets/utils";
import { cloneDeep } from "lodash";
export default {
  name: "proClassification",
  data() {
    let validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    };
    let validateMobild = (rule, value, callback) => {
      if (!/^1\d{10}$/.test(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    return {
      form: {
        sex: "1",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: ["blur", "change"] },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: validateMobild, trigger: ["blur", "change"] },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: ["blur"] }],
        deptId: [{ required: true, message: "请选择部门", trigger: ["blur"] }],
        roleIds: [{ required: true, message: "请选择角色", trigger: ["blur"] }],
        // date1: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择日期",
        //     trigger: "change",
        //   },
        // ],
      },
      addFormCascader: {
        value: "id",
        label: "deptName",
      },
      deptList: [],
      roleList: [],
      pageType: "detail",
    };
  },
  computed: {},
  created() {
    getDeptTree({ pageSize: 10000, currentPage: 1 }).then((res) => {
      this.deptList = res.data.data;
    });
    getRoleList({ pageSize: 10000, currentPage: 1 }).then((res) => {
      const str = JSON.parse(res.data.data);
      this.roleList = str.data.records;
    });
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
      this.form = cloneDeep(this.data) || { sex: "1" };
    }
  },
  methods: {
    save() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.pageType === "add") {
            this.form.status = 1;
            userAdd(this.form).then((res) => {
              if (res.data.code === "200") {
                this.$message.success("保存成功");
                this.goBack();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else if (this.pageType === "edit") {
            userEdit(this.form).then((res) => {
              if (res.data.code === "200") {
                this.$message.success("修改成功");
                this.goBack();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    goBack() {
      this.$router.push({ name: "userManage" });
      localStorage.removeItem("data");
      localStorage.removeItem("pageType");
      this.form = {
        sex: "1",
      };
    },
    resetForm() {
      if (this.pageType === "add") {
        this.form = {
          sex: "1",
        };
      } else if (this.pageType === "edit") {
        this.form = cloneDeep(this.data) || {
          sex: "1",
        };
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
