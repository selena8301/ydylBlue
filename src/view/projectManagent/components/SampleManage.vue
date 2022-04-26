<template>
  <div class="block-box">
    <div class="search-form-box">
      <div class="search-item">
        <span class="label">样本描述</span>
        <el-input size="mini" v-model="form.sampleDesc" />
      </div>
      <div class="search-item">
        <span class="label">时间范围</span>
        <el-date-picker
          v-model="form.date"
          size="mini"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <div class="search-item">
        <span class="label">样本分类</span>
        <el-cascader
          style="width: 100%;line-height: 38px"
          size="mini"
          :props="addFormCascader"
          :show-all-levels="false"
          v-model="form.sampleTypeOld"
          :options="cascaderOptions"
        ></el-cascader>
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
      <span
        class="usual-btn"
        @click="deleteSample(selectRows)"
        :disabled="selectRows == 0"
        >批量删除</span
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
          <el-table-column show-overflow-tooltip type="selection" width="55">
          </el-table-column>
          <!-- <el-table-column
            show-overflow-tooltip
            prop="fzms"
            label="样本来源"
            width="100"
          >
            <template slot-scope="scope">
              {{ scope.row.dbDataId ? "专题样本" : "自定义样本" }}
            </template>
          </el-table-column> -->
          <el-table-column
            show-overflow-tooltip
            prop="sampleDesc"
            label="样本描述"
            width="200"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sampleType"
            label="样本分类"
            width="200"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sampleContent"
            label="样本内容"
            width="auto"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="createTime"
            label="创建时间"
            width="160"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="createBy"
            label="创建人"
            width="120"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            fixed="right"
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <!-- <el-button type="text" size="small">查看</el-button> -->
              <el-button
                type="text"
                size="small"
                @click="handleClick(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="deleteSample([scope.row])"
                >删除</el-button
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
    <el-dialog :title="pageTitle" :visible.sync="addEditDialog">
      <div class="dialog-form-box">
        <div class="dialog-item long">
          <span class="label">样本描述</span>
          <div class="content">
            <el-input size="mini" v-model="addForm.sampleDesc" />
          </div>
        </div>
        <div class="dialog-item long">
          <span class="label">样本分类</span>
          <div class="content">
            <el-cascader
              style="width: 100%"
              size="mini"
              :props="addFormCascader"
              :show-all-levels="false"
              v-model="addForm.sampleTypeOld"
              :options="cascaderOptions"
            ></el-cascader>
          </div>
        </div>
        <div class="dialog-item long">
          <span class="label">样本内容</span>
          <div class="content">
            <el-input
              size="mini"
              type="textarea"
              :rows="8"
              v-model="addForm.sampleContent"
            />
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
import {
  DbPredictModelSampleAdd,
  DbPredictModelSampleEdit,
  DbPredictModelSampleDelete,
  DbPredictModelSampleList,
} from "./api";
import { mapGetters } from "vuex";
export default {
  name: "SampleManage",
  data() {
    return {
      form: {},
      addForm: {},
      currentPage: 1,
      total: 0,
      pageSize: 15,
      pageTitle: "新增分组",
      pageType: "add",
      addEditDialog: false,
      selectRows: [],
      addFormCascader: {
        value: "dictName",
        label: "dictName",
      },
      ybDics: [
        {
          label: "样本1",
          value: "1",
        },
        {
          label: "样本2",
          value: "2",
        },
        {
          label: "样本3",
          value: "3",
        },
      ],
      tableData: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(["dictData"]),
    cascaderOptions() {
      let tempArr = cloneDeep(this.dictData['文本分析'])
      tempArr.forEach(item => {
        if (item.dictName === "国家") {
          item.children = this.dictData["一带一路国家"] || [];
        } else {
          item.children = this.dictData[item.dictName] || [];
        }
      })
      return tempArr
    },
  },
  methods: {
    // 点击删除
    deleteSample(arr) {
      const ids = arr.map((item) => {
        return item.id;
      });
      DbPredictModelSampleDelete(ids).then((res) => {
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
      this.pageTitle = "编辑样本";
      this.addForm = cloneDeep(row);
    },
    // 点击新增
    addGroup() {
      this.addEditDialog = true;
      this.pageType = "add";
      this.addForm = {};
      this.pageTitle = "新增样本";
    },
    // 弹窗事件
    affirmEdit(flag) {
      if (flag) {
        const postData = cloneDeep(this.addForm);
        postData.sampleType =
          this.addForm.sampleTypeOld[this.addForm.sampleTypeOld.length - 1];
        delete postData.sampleTypeOld;
        if (this.pageType === "add") {
          DbPredictModelSampleAdd(postData).then((res) => {
            if (res.data.code === 0) {
              this.$message.success(res.data.msg);
              this.fetchData({});
              this.addForm = {};
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else if (this.pageType === "edit") {
          DbPredictModelSampleEdit(postData).then((res) => {
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
      if (postData.sampleTypeOld) {
        postData.sampleType =
          postData.sampleTypeOld[postData.sampleTypeOld.length - 1];
        delete postData.sampleTypeOld;
      }
      DbPredictModelSampleList(postData).then((res) => {
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
