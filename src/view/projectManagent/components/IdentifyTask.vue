<template>
  <div class="block-box">
    <div class="search-form-box">
      <div class="search-item">
        <span class="label">任务名称</span>
        <el-input size="mini" clearable v-model="form.detectName" />
      </div>
      <div class="search-item">
        <span class="label">识别类型</span>
        <!-- <el-input size="mini" v-model="form.type" /> -->
        <el-select v-model="form.type" filterable clearable size="mini">
          <el-option
            v-for="item in dictData['文本分析']"
            :key="item.dictName"
            :label="item.dictName"
            :value="item.dictName"
          >
          </el-option>
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
                  <!-- <span style="display: inline-block; flex: 1">模型描述</span> -->
                  <!-- <span style="display: inline-block; flex: 1">样本数量</span> -->
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
                  v-for="(item, index) in props.row.modelList"
                  :key="index"
                >
                  <span style="display: inline-block; flex: 1">{{
                    item.modelName
                  }}</span>
                  <!-- <span style="display: inline-block; flex: 1">{{
                    item.modelDesc
                  }}</span> -->
                  <!-- <span style="display: inline-block; flex: 1">{{
                    item.ybsl
                  }}</span> -->
                  <span style="display: inline-block; flex: 1">{{
                    item.createTime
                  }}</span>
                  <span style="display: inline-block; flex: 1">{{
                    item.updateTime
                  }}</span>
                  <span style="display: inline-block; flex: 1">
                    <!-- <el-button
                      @click="deleteModel([item])"
                      type="text"
                      size="small"
                      >删除</el-button
                    > -->
                    <el-button
                      type="text"
                      size="small"
                      @click="openGlybDialog(item)"
                      v-show="!props.row.online && (props.row.state === 'FINISH' || props.row.state === 'STOP')"
                      >样本关联</el-button
                    >
                  </span>
                </div>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="detectName"
            label="任务名称"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="type"
            label="识别类型"
          ></el-table-column>
          <el-table-column show-overflow-tooltip prop="state" label="任务状态">
            <template slot-scope="scope">
              {{ changeState(scope.row.state) }}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="online" label="上线状态">
            <template slot-scope="scope">
              {{scope.row.online? '在线' : '离线'}}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="createTime"
            label="创建时间"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="updateTime"
            label="修改时间"
          ></el-table-column>
          <el-table-column show-overflow-tooltip fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                v-show="!scope.row.online && (scope.row.state === 'FINISH' || scope.row.state === 'STOP')"
                >编辑</el-button
              >
              <el-button
                @click="deleteGroup([scope.row])"
                type="text"
                size="small"
                v-show="!scope.row.online && (scope.row.state === 'FINISH' || scope.row.state === 'STOP')"
                >删除</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="detectTaskCtrl2(scope.row, true)"
                v-show="!scope.row.online && scope.row.state === 'STOP' "
                >上线</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="detectTaskCtrl2(scope.row, false)"
                v-show="scope.row.online && scope.row.state !== 'START' "
                >下线</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="detectTaskCtrl(scope.row, true)"
                v-show="scope.row.online && scope.row.state === 'STOP'"
                >执行</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="detectTaskCtrl(scope.row, false)"
                v-show="scope.row.online && scope.row.state === 'START'"
                >停止</el-button
              >
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
    <el-dialog :title="pageTitle" :visible.sync="addEditDialog" width="500px">
      <div class="dialog-form-box">
        <div class="dialog-item long">
          <span class="label">任务名称</span>
          <div class="content">
            <el-input size="mini" v-model="addForm.detectName" />
          </div>
        </div>
        <div class="dialog-item long">
          <span class="label">识别类型</span>
          <div class="content">
            <el-select
              v-model="addForm.type"
              filterable
              clearable
              :disabled="pageTitle === '编辑识别任务'"
              placeholder="请选择识别类型"
              size="mini"
            >
              <el-option
                v-for="item in dictData['文本分析']"
                :key="item.dictName"
                :label="item.dictName"
                :value="item.dictName"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="bottom-btns">
        <el-button @click="affirmEdit(false)">取消</el-button>
        <el-button @click="affirmEdit(true)" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <glyb-component
      :glybDialog="glybDialog"
      :currentModel="currentModel"
      @close="glybDialog = false"
    />
  </div>
</template>

<script>
import { cloneDeep, groupBy } from "lodash";
import glybComponent from "./glybComponent.vue";
import { mapGetters } from "vuex";
import {
  DbPredictDetectTaskAdd,
  DbPredictDetectTaskEdit,
  DbPredictDetectTaskDelete,
  DbPredictDetectTaskList,
  DbPredictDetectTaskCtrl,
  DbPredictModelDelete,
  DbPredictDetectTaskOnline
} from "./api";
export default {
  name: "ModelManage",
  components: {
    glybComponent,
  },
  computed: {
    ...mapGetters(["dictData"]),
  },
  data() {
    return {
      form: {},
      addForm: {},
      currentPage: 1,
      total: 0,
      pageSize: 15,
      pageTitle: "新增识别任务",
      pageType: "add",
      addEditDialog: false,
      glybDialog: false,
      selectRows: [],
      ybDics: [],
      tableData: [],
      currentModel: {},
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // 点击删除
    deleteGroup(arr) {
      const ids = arr.map(item => {return item.id})
      DbPredictDetectTaskDelete(ids).then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.msg)
          this.fetchData({})
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    changeState(state) {
      switch (state) {
        case 'INIT':
          return '初始化中'
        case 'SWITCHING_ONLINE':
          return '上线中'
        case 'STOP':
          return '停止'
        case 'START':
          return '执行中'
        case 'FINISH':
          return '完成'
        default:
          break;
      }
    },
    // 点击执行停止
    detectTaskCtrl2(item, flag) {
      const postData = {
        detectTaskId: item.id,
        ctrlOnline: flag
      };
      DbPredictDetectTaskOnline(postData).then((res) => {
        if (res.data.code === 0) {
          this.$message.success(res.data.msg);
          this.addForm = {};
        } else {
          this.$message.error(res.data.msg);
        }
        this.fetchData({});
      });
    },
    // 点击上线/下线
    detectTaskCtrl(item, flag) {
      const postData = {
        detectTaskId: item.id,
        ctrl: flag ? "START" : "STOP",
      };
      DbPredictDetectTaskCtrl(postData).then((res) => {
        if (res.data.code === 0) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
        this.fetchData()
      });
    },
    // 弹窗事件
    affirmEdit(flag) {
      if (flag) {
        const postData = cloneDeep(this.addForm);
        if (this.pageType === "add") {
          DbPredictDetectTaskAdd(postData).then((res) => {
            if (res.data.code === 0) {
              this.$message.success(res.data.msg);
              this.fetchData({});
              this.addForm = {};
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else if (this.pageType === "edit") {
          DbPredictDetectTaskEdit(postData).then((res) => {
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
    // 点击关联样本
    openGlybDialog(item) {
      this.currentModel = cloneDeep(item);
      this.glybDialog = true;
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
      this.pageTitle = "编辑识别任务";
      this.addForm = cloneDeep(row);
    },
    // 点击新增
    addModel() {
      this.addEditDialog = true;
      this.pageType = "add";
      this.addForm = {};
      this.pageTitle = "新增识别任务";
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
      DbPredictDetectTaskList(postData).then((res) => {
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
    },
  },
};
</script>
