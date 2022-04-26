<template>
  <div class="tracking-index">
    <div
      class="left-side-box"
      v-show="pageType !== 'unclassified' && oldPageType !== 'unclassified'"
    >
      <div class="tree">
        <div class="search-box">
          <el-input
            size="mini"
            placeholder="输入关键字进行过滤"
            v-model="filterText"
          >
          </el-input>
          <el-popover
            placement="right-start"
            width="600"
            class="proMain-pop"
            trigger="click"
          >
            <div class="out-box">
              <!-- <div class="left">国家</div> -->
              <div class="right">
                <div
                  class="right-box"
                  v-for="(issue, outerIndex) in dictData['一带一路国家']"
                  :key="outerIndex"
                >
                  <div class="title">{{ issue.dictName }}</div>
                  <span
                    v-for="(item, index) in issue.children"
                    @click="chooseCountry(item)"
                    :key="index"
                    :class="item.dictName === filterText ? 'active' : ''"
                    >{{ item.dictName }}</span
                  >
                </div>
              </div>
            </div>
            <span slot="reference" class="usual-btn" style="padding: 0 10px"
              >筛选</span
            >
          </el-popover>
          <span
            class="usual-btn"
            style="padding: 0 10px"
            @click="filterText = ''"
            >清除</span
          >
        </div>
        <el-tree
          :indent="30"
          class="filter-tree"
          :data="data"
          node-key="id"
          :props="defaultProps"
          ref="tree"
          :default-expanded-keys="expandedKeys"
          :filter-node-method="filterNode"
          :default-checked-keys="checkedKey"
          @node-click="clickTree"
        >
        </el-tree>
      </div>
      <div class="bottom-btn">
        <span class="usual-btn" @click="showAll">全部专题</span>
        <span class="usual-btn" @click="showUnclassified">未分类专题</span>
      </div>
    </div>
    <div
      class="caret-right"
      v-show="pageType === 'unclassified' || oldPageType == 'unclassified'"
    >
      <i
        class="el-icon-caret-right"
        @click="(pageType = 'list'), (oldPageType = '')"
      ></i>
    </div>
    <div class="list-page-box" v-if="pageType === 'detail'">
      <zhuanti-edit-detail
        v-if="pageType !== 'unclassified' && oldPageType !== 'unclassified'"
        :isChinese="isChinese"
        :pageType="pageType"
        :detailData="detailData"
        ref="zhuantiEditDetail"
      />
      <zhuanti-edit-detail-unclassified
        v-else
        @lastArticle="lastArticle"
        @nextArticle="nextArticle"
        :isChinese="isChinese"
        :pageType="pageType"
        :detailData="detailData"
        ref="zhuantiEditDetailUnclassified"
      />
    </div>
    <div
      class="list-page-box"
      v-else-if="pageType === 'edit' || pageType === 'add'"
    >
      <zhuanti-add-edit
        :topicName="form.topicName"
        :country="form.country"
        :pageType="pageType"
        :detailData="detailData"
      />
    </div>
    <div class="list-page-box" v-else-if="pageType === 'countryDetail'">
      <countryDb></countryDb>
    </div>
    <div class="list-page-box" v-else>
      <div class="search-form-box" v-show="showSearchBox">
        <div class="search-item">
          <span class="label">标题</span>
          <el-input size="mini" clearable v-model="form.titleCn" />
        </div>
        <div class="search-item">
          <span class="label">作者</span>
          <el-input size="mini" clearable v-model="form.author" />
        </div>
        <div class="search-item">
          <span class="label">关键字</span>
          <el-input size="mini" clearable v-model="form.category" />
        </div>
        <div class="search-item">
          <span class="label">发布时间</span>
          <el-date-picker
            v-model="form.publishTime"
            type="datetimerange"
            size="mini"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <div class="search-item">
          <span class="label">语种</span>
          <!-- <el-input size="mini" v-model="form.language" /> -->
          <el-select
            v-model="form.language"
            filterable
            clearable
            size="mini"
            placeholder="请选择"
            @change="changeSelect(form, 'language', form.language)"
          >
            <el-option
              v-for="item in dictData['语种']"
              :key="item.dictName"
              :label="item.dictName"
              :value="item.dictName"
            >
            </el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span class="label">国家</span>
          <!-- <el-input size="mini" v-model="form.country" /> -->
          <el-select
            v-model="form.country"
            filterable
            clearable
            size="mini"
            placeholder="请选择"
            @change="changeSelect(form, 'country', form.country)"
          >
            <el-option
              v-for="item in dictData['国家']"
              :key="item.dictName"
              :label="item.dictName"
              :value="item.dictName"
            >
            </el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span class="label">分类</span>
          <!-- <el-input size="mini" v-model="form.topicName" /> -->
          <el-select
            v-model="form.topicName"
            filterable
            clearable
            size="mini"
            placeholder="请选择"
            @change="changeSelect(form, 'topicName', form.topicName)"
          >
            <el-option
              v-for="item in classArr"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="search-btn">
          <span class="usual-btn" @click="fetchData(form)">搜索</span>
          <span class="usual-btn" @click="reset">重置</span>
        </div>
      </div>
      <div class="table-btn-box" style="text-align: left">
        <span class="usual-btn" @click="changeLanguage">语言转换</span>
        <span
          class="usual-btn"
          v-show="
            form.topicName &&
            pageType !== 'unclassified' &&
            oldPageType !== 'unclassified'
          "
          @click="addProject"
          >新增</span
        >
        <span class="usual-btn" @click="showSearchBox = !showSearchBox">{{
          showSearchBox ? "收起搜索栏" : "展开搜索栏"
        }}</span>
      </div>
      <div class="grid-box">
        <div class="lists" id="listsBox">
          <div class="list-item" v-for="(item, index) in ztList" :key="index">
            <div class="first-line">
              <span
                class="title"
                :class="{ top: item.orderNumber === 1 }"
                @click="openDetail(item, index)"
              >
                <span class="title-text">{{
                  isChinese
                    ? item.titleCn
                    : item.title
                    ? item.title
                    : item.titleCn
                }}</span>
                <span
                  v-show="item.repeatDocs"
                  class="orange-text"
                  title="存在内容相似的专题，请在详情中查看"
                  >&nbsp;&nbsp;(重)</span
                ></span
              >
              <div class="btn">
                <i
                  class="el-icon-connection"
                  title="设置分类"
                  style="font-size: 19px; color: #41c3ff; cursor: pointer"
                  @click="associative(item)"
                ></i>
                <i
                  v-if="item.orderNumber === 1"
                  class="el-icon-bottom"
                  title="取消置顶"
                  style="font-size: 19px; color: #41c3ff; cursor: pointer"
                  @click="unstick(item)"
                ></i>
                <i
                  v-else
                  class="el-icon-top"
                  title="置顶"
                  style="font-size: 19px; color: #41c3ff; cursor: pointer"
                  @click="stick(item)"
                ></i>
                <span
                  class="edit-icon-btn"
                  title="编辑"
                  @click="openEdit(item)"
                ></span>
                <span
                  class="detail-icon-btn"
                  title="详情"
                  @click="openDetail(item, index)"
                ></span>
                <span
                  class="delete-icon-btn"
                  title="删除"
                  @click="deleteItem(item)"
                ></span>
                <!-- <span title="转换语言" style="position: relative;top: -2px;" @click="changeLanguage(item)">{{item.isChinese? '外' : '中'}}</span> -->
              </div>
            </div>
            <div class="second-line">
              <span class="img"></span>
              <div class="right-side">
                <div class="text">
                  {{
                    isChinese
                      ? item.contentCn
                      : item.content
                      ? item.content
                      : item.contentCn
                  }}
                </div>
                <span
                  class="ztc"
                  v-for="(issue, innerIndex) in item.ztc"
                  :key="innerIndex"
                  @click="chooseZtc(issue)"
                  >{{ issue }}</span
                >
              </div>
            </div>
            <div class="third-line">
              <div class="left-side">
                <span class="sskw" v-if="item.journalName"
                  >所属刊物 ： {{ item.journalName }}</span
                >
                <span class="country">国别 ： {{ item.country }}</span>
                <span class="country">语种 ： {{ item.language }}</span>
                <!-- <span class="country">情感 ： {{ item.affective }}</span> -->
              </div>
              <div class="right-side">
                <span class="author"
                  >作者 ：
                  {{
                    isChinese
                      ? item.authorCn
                      : item.author
                      ? item.author
                      : item.authorCn
                  }}</span
                >
                <span class="time">发布时间 ： {{ item.publishTime }}</span>
              </div>
            </div>
          </div>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[15, 30, 50]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="设置分类" :visible.sync="associativeDialog">
      <el-form :model="dialogForm" ref="ruleForm" label-width="70px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="国家" prop="deptName">
              <el-select
                v-model="dialogForm.country"
                filterable
                placeholder="请选择"
                @change="
                  changeSelect(dialogForm, 'country', dialogForm.country)
                "
              >
                <el-option
                  v-for="item in dictData['国家']"
                  :key="item.dictName"
                  :label="item.dictName"
                  :value="item.dictName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分类" prop="deptName">
              <el-select
                v-model="dialogForm.topicName"
                filterable
                placeholder="请选择"
                @change="
                  changeSelect(dialogForm, 'topicName', dialogForm.topicName)
                "
              >
                <el-option
                  v-for="item in classArr"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="predictResultList">
            <div class="predictResultList-item title">
              <span class="num"></span>
              <span class="key">分类名称</span>
              <span class="val">得分</span>
              <span class="btn">操作</span>
            </div>
            <div
              class="predictResultList-item"
              v-for="(item, index) in predictResultList"
              :key="index"
            >
              <span class="num">{{ index + 1 }}</span>
              <span class="key">{{ item.name }}</span>
              <span class="val">{{ item.value }}</span>
              <span class="btn" @click="dialogForm.topicName = item.name"
                >采用</span
              >
            </div>
          </div>
          <div
          class="predictResultList"
        >
          <div class="predictResultList-item fltitle">
            <span class="num"></span>
            <span class="key">语种</span>
            <span class="val">得分</span>
            <span class="btn">操作</span>
          </div>
          <div
            class="predictResultList-item"
            v-for="(item, index) in dialogForm.langDetect"
            :key="index"
          >
            <span class="num">{{ index + 1 }}</span>
            <span class="key">{{ item.lang }}</span>
            <span class="val">{{ (item.score * 100).toFixed(3) }}</span>
            <span class="btn" @click="dialogForm.language = item.lang">采用</span>
          </div>
        </div>
        </el-row>
      </el-form>
      <div class="funcBtn" style="text-align: right">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveClass">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import zhuantiEditDetail from "../dataManagent/zhuantiEditDetail.vue";
import zhuantiEditDetailUnclassified from "../dataManagent/zhuantiEditDetailUnclassified.vue";
import zhuantiAddEdit from "./zhuantiAddEdit.vue";
import { DbDataLike, DbDataDetail, DbDataDelete } from "../dataManagent/api.js";
import { cloneDeep, orderBy } from "lodash";
import * as pinyin from "./pinyin";
import countryDb from "../dataManagent/countryDB.vue";
import { mapGetters } from "vuex";
import { DbDataEdit } from "../dataManagent/api";
export default {
  components: {
    zhuantiEditDetail,
    zhuantiAddEdit,
    countryDb,
    zhuantiEditDetailUnclassified,
  },
  name: "trackingIndex",
  data() {
    return {
      form: {},
      current: 1,
      pageType: "list",
      oldPageType: "",
      detailData: {},
      size: 15,
      total: 0,
      ztList: [],
      filterText: "",
      data: [],
      checkedKey: [],
      dictName: "",
      defaultProps: {
        children: "children",
        label: "dictName",
      },
      currentIndex: 0,
      associativeDialog: false,
      dialogForm: {},
      predictResultList: [],
      isChinese: false,
      showSearchBox: true,
    };
  },
  created() {
    this.data = cloneDeep(this.topicDataTree);
    if(this.$route.params.country && this.$route.params.country !== '其他') {
      this.filterText = this.$route.params.country
      this.form.country = this.$route.params.country
      this.fetchData(this.form)
    } else {
      this.showAll();
    }
  },
  computed: {
    ...mapGetters(["classArr", "dictData", "topicDataTree"]),
    expandedKeys() {
      return this.topicDataTree.map((item) => {
        return item.id;
      });
    },
  },
  watch: {
    filterText(val) {
      this.parentIds = [];
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    // 上一篇
    lastArticle() {
      this.currentIndex -= 1;
      this.detailData = this.ztList[this.currentIndex];
    },
    // 下一篇
    nextArticle() {
      this.currentIndex += 1;
      if (this.currentIndex < this.size - 1) {
        this.detailData = this.ztList[this.currentIndex];
      } else {
        this.current += 1;
        const postData = {
          condition: {},
          multiCondition: [
            {
              type: "ORDER_BY_DESC",
              values: ["predict_topic_score IS NOT NULL"],
            },
            {
              type: "ORDER_BY_DESC",
              values: ["order_number IS NOT NULL"],
            },
            {
              type: "ORDER_BY_DESC",
              values: ["order_number"],
            },
            {
              type: "ORDER_BY_DESC",
              values: ["predict_topic_score"],
            },
            {
              name: "topicName",
              type: "INCLUDES",
              values: ["未分类"],
            },
          ],
        };
        DbDataLike(postData, this.size, this.current).then((res) => {
          if (res.data && res.data.data && res.data.data.records) {
            this.ztList = this.handlerData(res.data.data.records);
            this.total = res.data.data.total;
            this.currentIndex = 0;
            this.detailData = this.ztList[this.currentIndex];
          }
        });
      }
    },
    // 选中一个主题词
    chooseZtc(value) {
      this.form.category = value;
      this.fetchData(this.form);
    },
    // 点击置顶
    stick(item) {
      const postData = item;
      postData.orderNumber = 1;
      postData.publishTime = postData.publishTime + " 000";
      DbDataEdit(postData).then((res) => {
        if (res.data.code === 0) {
          this.$message.success("置顶成功！");
          this.fetchData(this.form);
        }
      });
    },
    // 点击取消置顶
    unstick(item) {
      const postData = item;
      postData.orderNumber = 0;
      postData.publishTime = postData.publishTime + " 000";
      DbDataEdit(postData).then((res) => {
        if (res.data.code === 0) {
          this.$message.success("取消置顶成功！");
          this.fetchData(this.form);
        }
      });
    },
    changeSelect(item, key, value) {
      this.$set(item, key, value);
      this.$forceUpdate();
    },
    chooseCountry(item) {
      this.filterText = item.dictName;
      // this.$set(this, "filterText", item.dictName);
      // // this.TreeFilter()
      // this.$forceUpdate();
    },
    // TreeFilter() {
    //   this.$refs.tree.filter(this.filterText);
    // },
    changeLanguage() {
      // this.$set(item, 'isChinese', !item.isChinese)
      this.$set(this, "isChinese", !this.isChinese);
    },
    cancel() {
      this.dialogForm = {};
      this.associativeDialog = false;
    },
    saveClass() {
      const postData = cloneDeep(this.dialogForm);
      if (postData.publishTime) {
        postData.publishTime = postData.publishTime + " 000";
      }
      DbDataEdit(postData).then((res) => {
        if (res.data.code === 0) {
          this.$message.success("修改成功！");
          this.fetchData(this.form);
          this.associativeDialog = false;
        }
      });
    },
    filterNode(value, data, node) {
      if (!value) return true;
      // if (data.dictName.indexOf(value) > -1) {
      //   this.parentIds.push(data.id)
      //   return true
      // } else if (this.parentIds.indexOf(data.parentId) > -1) {
      //   return true
      // } else if (pinyin.query(data.dictName).indexOf(value) > -1) {
      //   this.parentIds.push(data.id)
      //   return true
      // }
      // return ;
      let val = value.toLowerCase();
      return this.chooseNode(val, data, node);
    },
    chooseNode(value, data, node) {
      if (
        data.dictName.indexOf(value) !== -1 ||
        pinyin.query(data.dictName).indexOf(value) !== -1
      ) {
        return true;
      }
      const level = node.level;
      // 如果传入的节点本身就是一级节点就不用校验了
      if (level === 1) {
        return false;
      }
      // 先取当前节点的父节点
      let parentData = node.parent;
      // 遍历当前节点的父节点
      let index = 0;
      while (index < level - 1) {
        if (
          parentData.data.dictName.indexOf(value) !== -1 ||
          pinyin.query(parentData.data.dictName).indexOf(value) !== -1
        ) {
          return true;
        }
        // 否则的话再往上一层做匹配
        parentData = parentData.parent;
        index++;
      }
      // 没匹配到返回false
      return false;
    },
    // 点击新增
    addProject() {
      this.pageType = "add";
      // this.detailData = {};
    },
    //去掉所有的html标记
    replaceHtml(str) {
      if (str) {
        const str1 = str.replace(/<style>[\s\S]*?<\/style>/gi, "");
        const newStr = str1.replace(/style\s*?=\s*?(['"])[\s\S]*?\1/g);
        return newStr.replace(/<[^>]+>/g, "");
      }
    },
    findFirstChildren(data) {
      if (data.children && data.children.length > 0) {
        this.findFirstChildren(data.children[0]);
      } else {
        this.checkedKey = [data.id];
        this.fetchData({ dictName: data.dictName });
      }
    },
    // 点击重置
    reset() {
      this.form = {};
      this.filterText = "";
      this.fetchData();
    },
    deleteItem(item) {
      DbDataDelete(item.id).then((res) => {
        if (res.data.code === 0) {
          this.$message.success("删除成功");
          this.fetchData(this.form);
        }
      });
    },
    // 打开专题详情页面
    openDetail(item, index) {
      this.pageType = "detail";
      this.detailData = item;
      this.currentIndex = index;

      // DbDataDetail(item.id).then((res) => {
      //   if (res.data && res.data.data) {
      //     this.detailData = res.data.data;
      //     this.detailData.publishTime = this.detailData.publishTime
      //       ? this.detailData.publishTime.slice(0, 19)
      //       : "";
      //   }
      // });
    },
    // 修改
    openEdit(item) {
      this.pageType = "edit";
      this.detailData = item;
      // DbDataDetail(item.id).then((res) => {
      //   if (res.data && res.data.data) {
      //     this.detailData = res.data.data;
      //     this.detailData.publishTime = this.detailData.publishTime
      //       ? this.detailData.publishTime.slice(0, 19)
      //       : "";
      //   }
      // });
    },
    // 关联分类
    associative(item) {
      this.associativeDialog = true;
      this.dialogForm = item;
      this.predictResultList = [];
      const tempObj = item.predictResultList[0].predict;
      const tempArr = [];
      for (const key in tempObj) {
        tempArr.push({
          name: key,
          value: tempObj[key],
        });
      }

      let resultList = orderBy(tempArr, "value", "desc");
      resultList.forEach((item) => {
        let num = (item.value * 100).toFixed(3);
        if (num > 0.001) {
          item.value = num;
          this.predictResultList.push(item);
        }
      });

      if (this.predictResultList.length === 0) {
        resultList.forEach((item, index) => {
          let num = (item.value * 100).toFixed(3);
          if (index < 3) {
            item.value = num;
            this.predictResultList.push(item);
          }
        });
      } else if (this.predictResultList.length > 15) {
        this.predictResultList.length = 15;
      }
    },
    // 请求数据
    fetchData(searchform = {}, size = this.size, current = this.current) {
      // const postData = cloneDeep(searchform);
      // if (postData.publishTime) {
      //   postData.publishTime = moment(postData.publishTime).format('YYYY-MM-DD')
      // }
      // postData.size = size;
      // postData.current = current;
      const tempData = cloneDeep(searchform);
      // if (postData.keyWords) {
      //   postData.category.push(postData.keyWords)
      //   delete postData.keyWords
      // }
      let postData = {
        condition: {},
        multiCondition: [
          {
            type: "ORDER_BY_DESC",
            values: ["publish_time IS NOT NULL"],
          },
          {
            type: "ORDER_BY_DESC",
            values: ["order_number IS NOT NULL"],
          },
          {
            type: "ORDER_BY_DESC",
            values: ["order_number"],
          },
          {
            type: "ORDER_BY_DESC",
            values: ["publish_time"],
          },
        ],
      };
      if (searchform.topicName === "未分类") {
        postData = {
          condition: {},
          multiCondition: [
            {
              type: "ORDER_BY_DESC",
              values: ["predict_topic_score IS NOT NULL"],
            },
            {
              type: "ORDER_BY_DESC",
              values: ["order_number IS NOT NULL"],
            },
            {
              type: "ORDER_BY_DESC",
              values: ["order_number"],
            },
            {
              type: "ORDER_BY_DESC",
              values: ["predict_topic_score"],
            },
          ],
        };
      }
      for (const key in tempData) {
        if (tempData[key]) {
          if (key === "titleCn" || key === "contentCn" || key === "category") {
            postData.multiCondition.push({
              name: key,
              type: "LIKE",
              values: [tempData[key]],
            });
          } else {
            postData.multiCondition.push({
              name: key,
              type: "INCLUDES",
              values: [tempData[key]],
            });
          }
        }
      }
      // delete tempData.titleCn
      // delete tempData.contentCn

      // postData.condition = tempData
      DbDataLike(postData, size, current).then((res) => {
        if (res.data && res.data.data && res.data.data.records) {
          this.ztList = this.handlerData(res.data.data.records);
          this.total = res.data.data.total;
          this.$nextTick(() => {
            document.getElementById("listsBox").scrollTop = 0;
          });
        }
      });
    },
    // 数据英 => 中整理
    handlerData(data) {
      data.forEach((item) => {
        item.ztc = item.category
          ? item.category.split("、").join(",").split("，").join(",").split(",")
          : [];
        item.publishTime = item.publishTime
          ? item.publishTime.slice(0, 19)
          : "";
        if (item.content) {
          item.content = this.HTMLEncode(this.replaceHtml(item.content));
        }
        if (item.contentCn) {
          item.contentCn = this.HTMLEncode(this.replaceHtml(item.contentCn));
        }
      });
      return data;
    },
    HTMLEncode(txt) {
      let div = document.createElement("div");
      div.innerHTML = txt;
      return div.innerText;
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchData(this.form, val);
    },
    handleCurrentChange(val) {
      this.current = val;
      this.fetchData(this.form, this.size, val);
    },
    // 点击左侧树
    clickTree(data, node) {
      this.current = 1;
      this.detailData = {};
      if (!data.children || data.children.length === 0) {
        this.getCountry(node, data.dictName);
      }
    },
    getCountry(node, dictName) {
      if (node.level > 2) {
        this.getCountry(node.parent, dictName);
      } else if (node.level === 2) {
        this.form = {};
        this.form.topicName = dictName;
        this.form.country = node.data.dictName;
        this.fetchData(this.form);
        this.pageType = "list";
        this.oldPageType = "";
      }
    },
    showAll() {
      this.pageType = "list";
      this.form = {};
      this.checkedKey = [];
      this.data = cloneDeep(this.topicDataTree);
      this.fetchData({});
    },
    // 展示未分类专题
    showUnclassified() {
      this.pageType = "unclassified";
      this.oldPageType = "unclassified";
      this.form.topicName = "未分类";
      this.checkedKey = [];
      this.data = cloneDeep(this.topicDataTree);
      this.fetchData({ topicName: "未分类" });
    },
  },
};
</script>

<style lang="scss" scoped>
.tracking-index {
  height: 100%;
  width: 100%;
  display: flex;
  padding: 20px 20px 0;
  background: #e9e9e9 !important;
  overflow: hidden;
  .caret-right {
    position: absolute;
    left: -11px;
    top: calc(50% - 15px);
    font-size: 30px;
    i {
      cursor: pointer;
    }
  }
  .left-side-box {
    background: #fff !important; //2021-12-22 yjl
    flex-shrink: 0;
    overflow: hidden;
    .bottom-btn {
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .tree {
      height: calc(100% - 60px);
      padding: 20px;
      overflow: auto;
      .search-box {
        > div {
          width: calc(100% - 96px);
          display: inline-block;
        }
      }
    }
  }
  .list-page-box {
    background: #fff !important; //2021-12-22 yjl
    padding: 10px 40px;
    margin-left: 10px;
    width: calc(100% - 350px) !important;
    .lists {
      height: calc(100% - 70px);
      margin: 10px 0;
      overflow-y: auto;
      .list-item {
        font-size: 14px;
        padding: 15px 20px 20px 5px;
        border-top: 1px solid #ccc;
        .first-line {
          height: 50px;
          line-height: 50px;
          display: flex;
          .title {
            color: #2f67e7;
            font-size: 16px;
            font-weight: bold;
            width: calc(100% - 120px);
            cursor: pointer;
            position: relative;
            display: flex;
            &.top {
              color: red;
            }
            > span {
            }
            .title-text {
              max-width: calc(100% - 100px);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .orange-text {
              color: orange;
            }
          }
          .btn {
            position: relative;
            width: 120px;
            > span {
              display: inline-block;
              height: 15px;
              width: 15px;
              cursor: pointer;
              margin-left: 5px;
              color: #6fccf7;
            }
            .detail-icon-btn {
              background: url("../../assets/image/bg/detail.png") no-repeat;
              background-size: 100% 100%;
            }
            .delete-icon-btn {
              background: url("../../assets/image/bg/delete.png") no-repeat;
              background-size: 100% 100%;
            }
            .edit-icon-btn {
              background: url("../../assets/image/bg/edit.png") no-repeat;
              background-size: 100% 100%;
            }
          }
        }
        .second-line {
          .text {
            // color: #d6e6ff;
            color: #000;
            text-overflow: -o-ellipsis-lastline;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
          .ztc {
            color: #cf861f;
            margin-right: 20px;
            height: 25px;
            line-height: 25px;
            text-decoration: underline;
            font-size: 12px;
            cursor: pointer;
          }
        }
        .third-line {
          // color: #8c8d8e;
          color: #606366;
          font-size: 12px;
          display: flex;
          line-height: 30px;
          justify-content: space-between;
          .left-side {
            > span {
              margin-right: 20px;
            }
          }
          .right-side {
            > span {
              margin-left: 20px;
            }
          }
        }
      }
    }
  }
  .predictResultList {
    padding: 20px 50px;
    margin-bottom: 15px;
    margin-left: 25px;
    background: #eee;
    font-size: 12px;
    .predictResultList-item {
      height: 25px;
      line-height: 25px;
      > span {
        display: inline-block;
      }
      .key {
        width: 180px;
      }
      .num {
        width: 30px;
      }
      .val {
        width: calc(50% - 180px);
      }
      &.title {
        font-weight: bold;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
      }
      &:nth-child(2) {
        color: red;
      }
      &:nth-child(3) {
        color: rgb(255, 153, 0);
      }
      &:nth-child(4) {
        color: rgb(179, 131, 0);
      }
      .btn {
        color: #000;
        cursor: pointer;
        &:hover {
          color: #2f67e7;
        }
      }
    }
  }
}
</style>
