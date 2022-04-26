<template>
  <div class="user-manage">
    <div class="list-page-box">
      <div class="search-form-box">
        <div class="search-item">
          <span class="label">用户名</span>
          <el-input size="mini" v-model="form.userName" />
        </div>
        <div class="search-item">
          <span class="label">性别</span>
            <el-select size="mini" v-model="form.sex" placeholder="请选择">
              <el-option label="男" value="1"> </el-option>
              <el-option label="女" value="2"> </el-option>
            </el-select>
        </div>
        <div class="search-item">
          <span class="label"> </span>
        </div>
        <div class="search-btn">
          <span class="usual-btn" @click="fetchData(form)">搜索</span>
          <span class="usual-btn" @click="reset">重置</span>
        </div>
      </div>
      <div class="table-btn-box">
        <span class="usual-btn" :disabled="!btnState['新增']" @click="addUser"
          >新增</span
        >
        <span class="usual-btn" :disabled="!btnState['修改']" @click="editUser">修改</span>
        <span class="usual-btn" :disabled="!btnState['设置角色']"
          >设置角色</span
        >
        <span class="usual-btn" :disabled="!btnState['设置部门']"
          >设置部门</span
        >
        <span class="usual-btn" :disabled="!btnState['删除']" @click="deleteUser">删除</span>
      </div>
      <div class="grid-box">
        <template>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="light"
            style="width: 100%"
            height="250"
            stripe
            @selection-change="handleSelectionChange"
          >
            <el-table-column show-overflow-tooltip type="selection" width="55"> </el-table-column>
            <el-table-column show-overflow-tooltip prop="userName" label="用户名"></el-table-column>
            <el-table-column show-overflow-tooltip prop="sexCN" label="性别"></el-table-column>
            <el-table-column show-overflow-tooltip prop="statusCN" label="状态"></el-table-column>
            <el-table-column show-overflow-tooltip prop="email" label="电子邮箱"></el-table-column>
            <el-table-column show-overflow-tooltip prop="photo" label="手机号码"></el-table-column>
            <el-table-column show-overflow-tooltip
              prop="loginCount"
              label="登陆次数"
            ></el-table-column>
            <el-table-column show-overflow-tooltip
              prop="lastLoginIp"
              label="上次登录IP"
            ></el-table-column>
            <el-table-column show-overflow-tooltip prop="deptCN" label="部门"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[15, 30, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getDeptTree, getUserList, userDelete } from "./api";
import { cloneDeep } from "lodash";
export default {
  name: "userManage",
  data() {
    return {
      form: {},
      currentPage: 1,
      total: 0,
      pageSize: 15,
      tableData: [],
      deptList: [],
      selectRows: [],
      btnState: {
        新增: true,
        修改: false,
        设置角色: false,
        设置部门: false,
        删除: false,
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  created() {
    getDeptTree().then((res) => {
      this.deptList = res.data.data;
    });
  },
  methods: {
    // 点击新增
    addUser() {
      this.$router.push({ name: "userAddEditDetail", params: {pageType : 'add'}});
    },
    // 点击修改
    editUser() {
			// this.selectRows[0].gender = this.selectRows[0].sex
			// this.selectRows[0].mobile = this.selectRows[0].phone

      delete this.selectRows[0].sexCN
      delete this.selectRows[0].statusCN
      delete this.selectRows[0].deptCN
      delete this.selectRows[0].createTime
      delete this.selectRows[0].createTime
      delete this.selectRows[0].password
      delete this.selectRows[0].salt
      delete this.selectRows[0].updateTime
      // delete this.selectRows[0].sex
      // delete this.selectRows[0].phone
      delete this.selectRows[0].loginCount
      delete this.selectRows[0].status
      this.$router.push({ name: "userAddEditDetail", params: {pageType : 'edit', data: this.selectRows[0]}});
    },
    // 点击删除
    deleteUser() {
      const ids = this.selectRows.map(item => { return 'userIds=' + item.id + '&' })
      const userIds = ids.join('')
      userDelete(userIds.slice(0, userIds.length - 1)).then(res => {
        if (res.data.code === "200") {
          this.$message.success('删除成功')
          this.fetchData()
        }
      })
    },
    // 点击重置
    reset() {
      this.form = {}
      this.fetchData()
    }, 
    // 请求数据
    fetchData(
      searchform = {},
      pageSize = this.pageSize,
      currentPage = this.currentPage
    ) {
      const postData = cloneDeep(searchform);
      postData.size = pageSize;
      postData.currentPage = currentPage;
      getUserList(postData).then((res) => {
        if (res.data && res.data.data && res.data.data.records) {
          this.tableData = this.handlerData(res.data.data.records);
          this.total = res.data.data.total;
        }
      });
    },
    // 数据英 => 中整理
    handlerData(data) {
      data.forEach((item) => {
        item.sexCN = item.sex === "1" ? "男" : "女";
        item.statusCN = item.status === 1 ? "在线" : "离线";
        item.deptCN = this.deptList.map(issue => {
          if (issue.id === item.deptId) {
            return issue.deptName
          }
        })
      });
      return data;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData(this.form, val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData(this.form, this.pageSize, val);
    },
    // 勾选项变化
    handleSelectionChange(val) {
      this.selectRows = val;
      if (val.length === 0) {
        this.btnState = {
          新增: true,
          修改: false,
          设置角色: false,
          设置部门: false,
          删除: false,
        };
      } else if (val.length === 1) {
        this.btnState = {
          新增: true,
          修改: true,
          设置角色: true,
          设置部门: true,
          删除: true,
        };
      } else if (val.length > 1) {
        this.btnState = {
          新增: true,
          修改: false,
          设置角色: true,
          设置部门: true,
          删除: true,
        };
      }
    },
  },
};
</script>

<style lang="scss">
.user-manage {
  height: 100%;
  width: 100%;
  padding: 15px 0;
   background: #fff; //2021-12-22 yjl
}
</style>
