<template>
  <div class="user-manage">
    <div class="list-page-box">
      <div class="search-form-box">
        <div class="search-item">
          <span class="label">角色名称 :</span>
          <el-input size="mini" v-model="form.roleName" />
        </div>
        <div class="search-item">
          <span class="label">描述 :</span>
          <el-input size="mini" v-model="form.description" />
        </div>
        <div class="search-item"></div>
        <div class="search-btn">
          <span class="usual-btn" @click="fetchData(form)">搜索</span>
          <span class="usual-btn" @click="reset">重置</span>
        </div>
      </div>
      <div class="table-btn-box">
        <span class="usual-btn" :disabled="!btnState['新增']" @click="addUser"
          >新增</span
        >
        <span class="usual-btn" :disabled="!btnState['修改']" @click="editUser"
          >修改</span
        >
        <span class="usual-btn" :disabled="!btnState['权限配置']"
          >权限配置</span
        >
        <span
          class="usual-btn"
          :disabled="!btnState['删除']"
          @click="deleteUser"
          >删除</span
        >
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
            <el-table-column show-overflow-tooltip prop="roleName" label="角色名称"></el-table-column>
            <el-table-column show-overflow-tooltip prop="description" label="描述"></el-table-column>
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
import { getRoleList, deleteRole } from "./api";
import { cloneDeep } from "lodash";
export default {
  name: "roleManage",
  data() {
    return {
      form: {},
      currentPage: 1,
      total: 0,
      pageSize: 15,
      tableData: [
        {
          roleName: "超级管理员",
          description: "拥有项目各模块全部权限",
        },
        {
          roleName: "普通用户",
          description: "拥有部分权限",
        },
      ],
      selectRows: [],
      btnState: {
        新增: true,
        修改: false,
        权限配置: false,
        删除: false,
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // 点击新增
    addUser() {
      this.$router.push({
        name: "roleAddEditDetail",
        params: { pageType: "add" },
      });
    },
    // 点击修改
    editUser() {
      delete this.selectRows[0].statusCN;
      this.$router.push({
        name: "roleAddEditDetail",
        params: { pageType: "edit", data: this.selectRows[0] },
      });
    },
    // 点击删除
    deleteUser() {
      // const ids = this.selectRows.map(item => { return item.id + ',' })
      // const roleIds = 'id=' + ids.join('')
      // deleteRole(roleIds.slice(0, roleIds.length - 1)).then(res => {
      //   if (res.data.code === "success") {
      //     this.$message.success('删除成功')
      //     this.fetchData()
      //   }
      // })
      this.selectRows.map((item) =>
        deleteRole("id=" + item.id).then((res) => {
          })
      );
      setTimeout(() => {
        this.$message.success("删除成功");
        this.fetchData();
      }, this.selectRows.legnth * 1000)
    },
    // 点击重置
    reset() {
      this.form = {};
      this.fetchData();
    },
    // 请求数据
    fetchData(
      searchform = {},
      pageSize = this.pageSize,
      currentPage = this.currentPage
    ) {
      const postData = cloneDeep(searchform);
      postData.pageSize = pageSize;
      postData.currentPage = currentPage;
      getRoleList(postData).then((res) => {
        if (res.data && res.data.data) {
          this.tableData = this.handlerData(res.data.data.records);
          this.total = res.data.data.total;
        }
      });
    },
    // 数据英 => 中整理
    handlerData(data) {
      data.forEach((item) => {
        // item.statusCN = item.status === 1 ? "启用" : "未启用";
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
  padding: 15px;
   background: #fff; //2021-12-22 yjl
}
</style>
