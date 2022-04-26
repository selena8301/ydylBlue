<template>
  <div class="data-integration">
    <div class="list-page-box">
      <div class="search-form-box">
        <div class="search-item">
          <span class="label">任务名称 :</span>
          <el-input size="mini" v-model="form.roleName" />
        </div>
        <div class="search-btn">
          <span class="usual-btn">搜索</span>
          <span class="usual-btn">重置</span>
        </div>
      </div>
      <div class="table-btn-box">
        <span class="usual-btn" :disabled="!btnState['新增']">新增数据同步任务</span>
        <span class="usual-btn" :disabled="!btnState['修改']">修改</span>
        <span class="usual-btn" :disabled="!btnState['审核']"
          >审核</span
        >
        <span class="usual-btn" :disabled="!btnState['删除']">删除</span>
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
            <el-table-column show-overflow-tooltip prop="name" label="任务名称"></el-table-column>
            <el-table-column show-overflow-tooltip prop="state" label="是否同步"></el-table-column>
            <el-table-column show-overflow-tooltip prop="time" label="创建时间"></el-table-column>
            <el-table-column show-overflow-tooltip prop="user" label="创建人"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[15, 30, 50]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="75"
          >
          </el-pagination>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dataIntegration",
  data() {
    return {
      form: {},
      currentPage: 1,
      tableData: [
        {
          name: "任务名称111",
          state: "已同步",
          time: '2021-07-30 09:43:25',
          user: 'admin',
        },
        {
          name: "任务名称122",
          state: "已同步",
          time: '2021-07-30 09:43:25',
          user: 'admin',
        },
        {
          name: "任务名称33",
          state: "已同步",
          time: '2021-07-30 09:43:25',
          user: 'admin',
        },
        {
          name: "任务名称44",
          state: "已同步",
          time: '2021-07-30 09:43:25',
          user: 'admin',
        },

        {
          name: "任务名称55",
          state: "已同步",
          time: '2021-07-30 09:43:25',
          user: 'admin',
        },
        {
          name: "任务名称66",
          state: "已同步",
          time: '2021-07-30 09:43:25',
          user: 'admin',
        }
      ],
      selectRows: [],
      btnState: {
        新增: true,
        修改: false,
        审核: false,
        删除: false,
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.selectRows = val;
      if (val.length === 0) {
        this.btnState = {
          新增: true,
          修改: false,
          审核: false,
          删除: false,
        };
      } else if (val.length === 1) {
        this.btnState = {
          新增: true,
          修改: true,
          审核: true,
          删除: true,
        };
      } else if (val.length > 1) {
        this.btnState = {
          新增: true,
          修改: false,
          审核: true,
          删除: true,
        };
      }
    },
  },
};
</script>

<style lang="scss">
.data-integration {
  height: 100%;
  width: 100%;
  padding: 15px;
  background: #fff; //2021-12-22 yjl
}
</style>
