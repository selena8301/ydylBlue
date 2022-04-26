<template>
  <div class="block-box">
    <div class="search-form-box">
      <div class="search-item">
        <span class="label">分组名称</span>
        <el-input size="mini" v-model="form.groupName" />
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
      <span class="usual-btn" @click="addGroup">新增</span>
      <span class="usual-btn" @click="deleteGroup(selectRows)" :disabled="selectRows == 0 && canDelete">批量删除</span>
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
          <el-table-column show-overflow-tooltip prop="groupName" label="分组名称"></el-table-column>
          <el-table-column show-overflow-tooltip prop="groupDesc" label="分组描述"></el-table-column>
          <el-table-column show-overflow-tooltip prop="online" label="上线状态">
            <template slot-scope="scope">
              {{scope.row.online? '在线' : '离线'}}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="createTime" label="创建时间"></el-table-column>
          <el-table-column show-overflow-tooltip prop="updateTime" label="修改时间"></el-table-column>
          <el-table-column show-overflow-tooltip fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >编辑</el-button
              >
              <el-button @click="deleteGroup([scope.row])" type="text" size="small" v-show="!scope.row.online">删除</el-button>
              <!-- <el-button type="text" size="small" v-show="!scope.row.online">上线</el-button>
              <el-button type="text" size="small" v-show="scope.row.online">下线</el-button> -->
            </template>
          </el-table-column>
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
    <el-dialog :title="pageTitle" :visible.sync="addEditDialog">
      <div class="dialog-form-box">
        <div class="dialog-item long">
          <span class="label">分组名称</span>
          <div class="content">
            <el-input size="mini" v-model="addForm.groupName" />
          </div>
        </div>
        <!-- <div class="dialog-item long" v-if="pageType !== 'add'">
          <span class="label">选择样本</span>
          <div class="content">
            <el-select
            v-model="addForm.ybDic"
            multiple
            filterable
            clearable
            placeholder="请选择样本"
            size="mini"
          >
            <el-option
              v-for="item in ybDics"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          </div>
        </div> -->
        <div class="dialog-item long">
          <span class="label">分组描述</span>
          <div class="content">
            <el-input size="mini" type="textarea" v-model="addForm.groupDesc" />
          </div>
        </div>
      </div>
      <div class="bottom-btns">
        <el-button @click="affirmEdit(false)">取消</el-button>
        <el-button @click="affirmEdit(true)" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import { DbPredictModelGroupAdd, DbPredictModelGroupEdit, DbPredictModelGroupDelete, DbPredictModelGroupList } from './api'
export default {
  name: "GroupManage",
  data() {
    return {
      form: {},
      addForm: {},
      currentPage: 1,
      total: 0,
      pageSize: 15,
      pageTitle: "新增分组",
      pageType: 'add',
      addEditDialog: false,
      canDelete: true,
      selectRows: [],
      ybDics: [
        {
          label: '样本1',
          value: '1'
        }, {
          label: '样本2',
          value: '2'
        }, {
          label: '样本3',
          value: '3'
        }
      ],
      tableData: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // 点击删除
    deleteGroup(arr) {
      const ids = arr.map(item => {return item.id})
      DbPredictModelGroupDelete(ids).then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.msg)
          this.fetchData({})
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 点击编辑
    handleClick(row) {
      this.addEditDialog = true;
      this.pageType = 'edit'
      this.pageTitle = "编辑分组";
      this.addForm = cloneDeep(row)
    },
    // 点击新增
    addGroup() {
      this.addEditDialog = true;
      this.pageType = 'add'
      this.addForm = {}
      this.pageTitle = "新增分组";
    },
    // 弹窗事件
    affirmEdit(flag) {
      if (flag) {
        const postData = cloneDeep(this.addForm)
        if (this.pageType === 'add') {
          DbPredictModelGroupAdd(postData).then(res => {
            if (res.data.code === 0) {
              this.$message.success(res.data.msg)
              this.fetchData({})
              this.addForm = {}
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else if (this.pageType === 'edit') {
          DbPredictModelGroupEdit(postData).then(res => {
            if (res.data.code === 0) {
              this.$message.success(res.data.msg)
              this.fetchData({})
              this.addForm = {}
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      }
      this.addEditDialog = false;
    },
    // 点击重置
    reset() {
      this.form = {};
      this.fetchData();
    },
    // 请求数据
    fetchData(
      searchform = {},
      size = this.pageSize,
      current = this.currentPage
    ) {
      const postData = cloneDeep(searchform);
      postData.size = size;
      postData.current = current;
      DbPredictModelGroupList(postData).then((res) => {
        if (res.data && res.data.data && res.data.data.records) {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        }
      });
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
      this.canDelete = this.selectRows.every(item => !item.online)
    },
  },
};
</script>
