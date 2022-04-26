<template>
  <div class="block-box">
    <div class="search-form-box">
      <div class="search-item">
        <span class="label">识别任务</span>
        <el-select
          v-model="resultsForm.detectTaskId"
          placeholder="请选择识别任务"
          clearable
          filterable
          size="mini"
          @change="changeSbRw"
        >
          <el-option
            v-for="(item, index) in rwTableData"
            :key="index + 'rw'"
            :label="item.detectName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="search-item">
        <span class="label">模型名称</span>
        <el-select
          v-model="resultsForm.classify"
          placeholder="请先选择识别任务"
          :disabled="!resultsForm.detectTaskId"
          clearable
          filterable
          @change="changeSelect(resultsForm, 'classify', resultsForm.classify)"
          size="mini"
        >
          <el-option
            v-for="item in modelTableData"
            :key="item.modelName"
            :label="item.modelName"
            :value="item.modelName"
          >
          </el-option>
        </el-select>
      </div>
      <div class="search-item">
        <span class="label"> </span>
      </div>
      <div class="search-btn">
        <span class="usual-btn" @click="fetchData(resultsForm)">查看</span>
        <!-- <span class="usual-btn" @click="reset">重置</span> -->
      </div>
    </div>
    <div class="grid-box" v-show="tableData && tableData.length > 0">
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
          <el-table-column
            show-overflow-tooltip
            width="150px"
            prop="type"
            label="识别类型"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            width="180px"
            prop="classify"
            label="识别结果"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="classify"
            label="专题名称"
          >
            <template slot-scope="scope">
              <router-link
                tag="a"
                target="_blank"
                :to="{ name: 'ztDetail2', query: { id: scope.row.dbData.id } }"
                >{{
                  scope.row.dbData.titleCn || scope.row.dbData.title
                }}</router-link
              >
            </template>
          </el-table-column>
          <el-table-column v-if="tableData[0].type === '专题分类'"
            show-overflow-tooltip
            prop="topicName"
            label="专题分类"
            width="110px"
          >
            <template slot-scope="scope">
              {{scope.row.dbData.topicName}}
            </template>
          </el-table-column>
          <el-table-column  v-if="tableData[0].type === '国家'"
            show-overflow-tooltip
            prop="country"
            label="国家"
            width="110px"
          >
            <template slot-scope="scope">
              {{scope.row.dbData.country}}
            </template>
          </el-table-column>
          <el-table-column
            width="180px"
            show-overflow-tooltip
            prop="createTime"
            label="创建时间"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            width="180px"
            prop="updateTime"
            label="修改时间"
          ></el-table-column>
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
</template>

<script>
import { cloneDeep } from "lodash";
import { DbPredictResultList, DbPredictDetectTaskList } from "./api";
export default {
  name: "IdentifyTheResults",
  data() {
    return {
      resultsForm: {},
      currentPage: 1,
      total: 0,
      pageSize: 15,
      pageType: "add",
      selectRows: [],
      tableData: [{}],
      rwTableData: [],
      modelTableData: [],
    };
  },
  created() {
    this.getRwData();
  },
  methods: {
    changeSelect(item, key, value) {
      this.$set(item, key, value);
      this.$forceUpdate();
    },
    getRwData() {
      const postData = {};
      postData.size = 9999;
      postData.current = 1;
      DbPredictDetectTaskList(postData).then((res) => {
        if (res.data && res.data.data && res.data.data.records) {
          this.rwTableData = res.data.data.records;
        }
      });
    },
    // 切换识别任务
    changeSbRw(id) {
      let obj = this.rwTableData.find((item) => {
        return item.id === id;
      });
      this.resultsForm.classify = "";
      this.modelTableData = obj.modelList || [];
    },
    // 请求数据
    fetchData(
      searchform = {},
      size = this.pageSize,
      current = this.currentPage
    ) {
      let postData = cloneDeep(searchform);
      postData.size = size;
      postData.current = current;
      for (const key in postData) {
        if (postData[key] == "") {
          delete postData[key];
        }
      }
      DbPredictResultList(postData).then((res) => {
        if (res.data && res.data.data && res.data.data.records) {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData(this.resultsForm, val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData(this.resultsForm, this.pageSize, val);
    },
    // 勾选项变化
    handleSelectionChange(val) {
      this.selectRows = val;
    },
  },
};
</script>
