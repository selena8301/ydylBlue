<template>
  <div class="block-box">
    <div class="search-form-box">
      <div class="search-item">
        <span class="label">模型名称</span>
        <el-input size="mini" v-model="form.modelName" />
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
      <span class="usual-btn" @click="addModel">新增</span>
      <!-- <span
        class="usual-btn"
        @click="deleteModel(selectRows)"
        :disabled="selectRows == 0"
        >批量删除</span
      > -->
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
          <el-table-column show-overflow-tooltip type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <div
                  style="
                    width: 100%;
                    display: flex;
                    line-height: 40px;
                    height: 40px;
                    color: #000;
                  "
                >
                  <span style="display: inline-block; flex: 1">模型名称</span>
                  <span style="display: inline-block; flex: 1">模型描述</span>
                  <span style="display: inline-block; flex: 1">样本数量</span>
                  <span style="display: inline-block; flex: 1">创建时间</span>
                  <span style="display: inline-block; flex: 1">修改时间</span>
                  <span style="display: inline-block; flex: 1">操作</span>
                </div>
                <div
                  style="
                    width: 100%;
                    display: flex;
                    line-height: 40px;
                    height: 40px;
                    color: #777;
                  "
                  v-for="(item, index) in props.row.list"
                  :key="index"
                >
                  <span style="display: inline-block; flex: 1">{{
                    item.modelName
                  }}</span>
                  <span style="display: inline-block; flex: 1">{{
                    item.modelDesc
                  }}</span>
                  <span style="display: inline-block; flex: 1">{{
                    item.ybsl
                  }}</span>
                  <span style="display: inline-block; flex: 1">{{
                    item.createTime
                  }}</span>
                  <span style="display: inline-block; flex: 1">{{
                    item.updateTime
                  }}</span>
                  <span style="display: inline-block; flex: 1">
                    <el-button
                      type="text"
                      size="small"
                      @click="handleClick(item)"
                      >编辑</el-button
                    >
                    <el-button
                      @click="deleteModel([item])"
                      type="text"
                      size="small"
                      >删除</el-button
                    >
                    <el-button type="text" size="small" @click="openGlybDialog(item)">样本关联</el-button>
                  </span>
                </div>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="groupName" label="分组名称"></el-table-column>
          <el-table-column show-overflow-tooltip prop="groupDesc" label="分组描述"></el-table-column>
          <el-table-column show-overflow-tooltip prop="online" label="上线状态">
            <template slot-scope="scope">
              {{ scope.row.online ? "在线" : "离线" }}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="createTime" label="创建时间"></el-table-column>
          <el-table-column show-overflow-tooltip prop="updateTime" label="修改时间"></el-table-column>
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
          <span class="label">模型名称</span>
          <div class="content">
            <el-input size="mini" v-model="addForm.modelName" />
          </div>
        </div>
        <div class="dialog-item long">
          <span class="label">选择分组</span>
          <div class="content">
            <el-select
              v-model="addForm.groupId"
              filterable
              clearable
              placeholder="请选择模型"
              size="mini"
            >
              <el-option
                v-for="item in ybDics"
                :key="item.id"
                :label="item.groupName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="dialog-item long">
          <span class="label">模型描述</span>
          <div class="content">
            <el-input size="mini" type="textarea" v-model="addForm.modelDesc" />
          </div>
        </div>
      </div>
      <div class="bottom-btns">
        <el-button @click="affirmEdit(false)">取消</el-button>
        <el-button @click="affirmEdit(true)" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <glyb-component :glybDialog="glybDialog" :currentModel="currentModel" @close="glybDialog=false"/>
  </div>
</template>

<script>
import { cloneDeep, groupBy } from "lodash";
import glybComponent from './glybComponent.vue'
import {
  DbPredictModelAdd,
  DbPredictModelEdit,
  DbPredictModelDelete,
  DbPredictModelList,
  DbPredictModelGroupAll,
} from "./api";
export default {
  name: "ModelManage",
  components: {
    glybComponent
  },
  data() {
    return {
      form: {},
      addForm: {},
      currentPage: 1,
      total: 0,
      pageSize: 15,
      pageTitle: "新增模型",
      pageType: "add",
      addEditDialog: false,
      glybDialog: false,
      selectRows: [],
      ybDics: [],
      tableData: [],
      currentModel: {}
    };
  },
  mounted() {
    this.getFzList();
    this.fetchData();
  },
  methods: {
    // 点击关联样本
    openGlybDialog(item) {
      this.currentModel = cloneDeep(item)
      this.glybDialog = true
    },
    // 获取分组字典值
    getFzList() {
      DbPredictModelGroupAll().then((res) => {
        this.ybDics = res.data.data;
      });
    },
    // 点击删除
    deleteModel(arr) {
      const ids = arr.map((item) => {
        return item.id;
      });
      DbPredictModelDelete(ids).then((res) => {
        if (res.data.code === 0) {
          this.$message.success(res.data.msg);
          this.fetchData({});
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 点击编辑
    handleClick(row) {
      this.addEditDialog = true;
      this.pageType = "edit";
      this.pageTitle = "编辑模型";
      this.addForm = cloneDeep(row);
    },
    // 点击新增
    addModel() {
      this.addEditDialog = true;
      this.pageType = "add";
      this.addForm = {}
      this.pageTitle = "新增模型";
    },
    // 弹窗事件
    affirmEdit(flag) {
      if (flag) {
        const postData = cloneDeep(this.addForm);
        if (this.pageType === "add") {
          DbPredictModelAdd(postData).then((res) => {
            if (res.data.code === 0) {
              this.$message.success(res.data.msg);
              this.fetchData({});
              this.addForm = {};
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else if (this.pageType === "edit") {
          DbPredictModelEdit(postData).then((res) => {
            if (res.data.code === 0) {
              this.$message.success(res.data.msg);
              this.fetchData({});
              this.addForm = {};
            } else {
              this.$message.error(res.data.msg);
            }
          });
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
      DbPredictModelList(postData).then((res) => {
        if (res.data && res.data.data && res.data.data.records) {
          this.tableData = this.handlerData(res.data.data.records);
          this.total = res.data.data.total;
        }
      });
    },
    handlerData(arr) {
      let tempArr = groupBy(arr, "groupId");
      let returnArr = [];
      for (const key in tempArr) {
        let tempObj = this.ybDics.find((item) => item.id === key) || {};
        tempObj.list = tempArr[key];
        returnArr.push(tempObj);
      }
      return returnArr;
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
    },
  },
};
</script>
