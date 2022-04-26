<template>
  <el-dialog
    width="70%"
    :title="$parent.pageTitle"
    :visible.sync="addEditDialog"
    @close="closeDialog"
  >
    <div class="dialog-form-box">
      <div class="dialog-item">
        <span class="label">任务名称</span>
        <div class="content">
          <el-input size="mini" v-model="addForm.modelName" />
        </div>
      </div>
      <div class="dialog-item">
        <span class="label">识别类型</span>
        <div class="content">
          <el-select
            v-model="addForm.groupId"
            filterable
            clearable
            placeholder="请选择识别类型"
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
      <div class="dialog-item">
        <span class="label">选择样本</span>
        <div class="content">
          <span class="usual-btn" @click="addSampleRelation('zt')"
            >新增专题样本</span
          >
          <span class="usual-btn" @click="addSampleRelation('zdy')"
            >新增自定义样本</span
          >
          <span
            class="usual-btn"
            @click="deleteSample(selectRows)"
            :disabled="selectRows == 0"
            >批量解除</span
          >
        </div>
      </div>
      <div style="height: 450px; width: 100%">
        <template v-if="currentType == ''">
          <div class="grid-box" style="height: calc(100%)">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="light"
              style="width: 100%"
              height="400"
              stripe
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                show-overflow-tooltip
                type="selection"
                width="55"
              >
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="fzms"
                label="样本来源"
                width="100"
              >
                <template slot-scope="scope">
                  {{ scope.row.dbDataId ? "专题样本" : "自定义样本" }}
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="sampleContent"
                label="样本内容"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                fixed="right"
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="deleteSample([scope.row])"
                    >解除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 30, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </template>
        <template v-else-if="currentType === 'zdy'">
          <div class="grid-box" style="height: calc(100%)">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="light"
              style="width: 100%"
              height="400"
              stripe
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                show-overflow-tooltip
                type="selection"
                width="55"
              >
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="id"
                label="样本id"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="fzms"
                label="样本来源"
              >
                <template slot-scope="scope">
                  {{ scope.row.dbDataId ? "专题样本" : "自定义样本" }}
                </template></el-table-column
              >
              <el-table-column
                show-overflow-tooltip
                prop="sampleDesc"
                label="样本描述"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="sampleContent"
                label="样本内容"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="createTime"
                label="创建时间"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="createBy"
                label="创建人"
              ></el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 30, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
          <span
            class="usual-btn"
            style="position: absolute; bottom: 40px; left: 40px"
            @click="saveSampleRelation"
            >保存</span
          >
          <span
            class="usual-btn"
            style="position: absolute; bottom: 40px; left: 120px"
            @click="cancel"
            >取消</span
          >
        </template>
        <template v-else-if="currentType === 'zt'">
          <div class="grid-box" style="height: calc(100%)">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="light"
              style="width: 100%"
              height="400"
              stripe
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                show-overflow-tooltip
                type="selection"
                width="55"
              >
              </el-table-column>
              <el-table-column
                prop="titleCn"
                label="专题名称（中）"
              ></el-table-column>
              <el-table-column
                prop="title"
                label="专题名称（外）"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="contentCn"
                label="正文（中）"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="content"
                label="正文（外）"
              ></el-table-column>
              <el-table-column
                prop="authorCn"
                label="作者（中）"
                width="90"
              ></el-table-column>
              <el-table-column
                prop="author"
                label="作者（外）"
                width="90"
              ></el-table-column>
              <!-- <el-table-column
                show-overflow-tooltip
                prop="affective"
                label="情感"
                width="60"
              ></el-table-column> -->
              <el-table-column
                prop="publishTime"
                label="发布时间"
                width="150"
              ></el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 30, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
          <span
            class="usual-btn"
            style="position: absolute; bottom: 40px; left: 40px"
            @click="saveSampleRelation"
            >保存</span
          >
          <span
            class="usual-btn"
            style="position: absolute; bottom: 40px; left: 120px"
            @click="cancel"
            >取消</span
          >
        </template>
      </div>
      <div class="bottom-btns">
        <el-button @click="affirmEdit(false)">取消</el-button>
        <el-button @click="affirmEdit(true)" type="primary">确定</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { cloneDeep } from "lodash";
import {
  DbPredictModelSampleRelationList,
  DbPredictModelSampleRelationDelete,
  DbPredictModelSampleList,
  DbPredictModelSampleRelationAdd,
} from "./api";
import { DbDataLike } from "../../dataManagent/api.js";
export default {
  name: "ModelManage",
  props: ["addEditDialog", "addForm"],
  data() {
    return {
      currentPage: 1,
      total: 0,
      pageSize: 10,
      selectRows: [],
      tableData: [],
      currentType: "",
    };
  },
  watch: {
    addEditDialog: {
      handler(newVal) {
        if (newVal) {
          this.fetchData();
        }
      },
    },
  },
  methods: {
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
    //   关闭弹窗
    closeDialog() {
      this.$emit("close");
    },
    // 点击新增专题样本/新增自定义样本
    addSampleRelation(type) {
      this.currentType = type;
      this.currentPage = 1;
      this.total = 0;
      this.pageSize = 10;
      this.selectRows = [];
      if (type === "zt") {
        // 专题样本
        this.fetchData({});
      } else if (type === "zdy") {
        // 自定义样本
        this.fetchData({});
      }
    },
    // 点击保存
    saveSampleRelation() {
      const postData = cloneDeep(this.selectRows);
      postData.forEach((item) => {
        item.modelId = this.addForm.id;
        if (this.currentType === "zdy") {
          item.sampleId = item.id;
        } else if (this.currentType === "zt") {
          item.dbDataId = item.id;
        }
        delete item.id;
      });
      DbPredictModelSampleRelationAdd(postData).then((res) => {
        if (res.data.code === 0) {
          this.$message.success("关联成功！");
          this.currentType = "";
          this.selectRows = [];
          this.fetchData({});
        }
      });
    },
    // 点击取消
    cancel() {
      this.currentType = "";
      this.selectRows = [];
      this.fetchData({});
    },
    // 点击删除
    deleteSample(arr) {
      const ids = arr.map((item) => {
        return item.id;
      });
      DbPredictModelSampleRelationDelete(ids).then((res) => {
        if (res.data.code === 0) {
          this.$message.success(res.data.msg);
          this.fetchData({});
        } else {
          this.$message.error(res.data.msg);
        }
      });
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
      postData.modelId = this.addForm.id;
      if (this.currentType === "") {
        DbPredictModelSampleRelationList(postData).then((res) => {
          if (res.data && res.data.data && res.data.data.records) {
            this.tableData = res.data.data.records;
            this.total = res.data.data.total;
          }
        });
      } else if (this.currentType === "zdy") {
        DbPredictModelSampleList(postData).then((res) => {
          if (res.data && res.data.data && res.data.data.records) {
            this.tableData = res.data.data.records;
            this.total = res.data.data.total;
          }
        });
      } else if (this.currentType === "zt") {
        DbDataLike({}, size, current).then((res) => {
          if (res.data && res.data.data && res.data.data.records) {
            this.tableData = res.data.data.records;
            this.total = res.data.data.total;
          }
        });
      }
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