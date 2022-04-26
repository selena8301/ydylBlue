<template>
  <div class="tracking-index">
    <div class="left-side-box">
      <div class="tree">
        <el-tree
          :indent="30"
          class="filter-tree"
          :data="data"
          node-key="id"
          :props="defaultProps"
          default-expand-all
          ref="tree"
          :default-checked-keys="checkedKey"
          @node-click="clickTree"
        >
        </el-tree>
      </div>
      <div class="bottom-btn"><span class="usual-btn" @click="showAll">全部专题</span></div>
    </div>
    <div
      class="list-page-box"
      v-if="pageType === 'detail'"
    >
      <zhuanti-edit-detail :pageType="pageType" :detailData="detailData" />
    </div>
    <div
      class="list-page-box"
      v-else-if="pageType === 'edit' || pageType === 'add'"
    >
      <zhuanti-add-edit :topicName="topicName" :pageType="pageType" :detailData="detailData" />
    </div>
    <div class="list-page-box" v-else>
      <div class="search-form-box">
        <div class="search-item">
          <span class="label">标题</span>
          <el-input size="mini" v-model="form.titleCn" />
        </div>
        <div class="search-item">
          <span class="label">作者</span>
          <el-input size="mini" v-model="form.author" />
        </div>
        <div class="search-item">
          <span class="label">关键字</span>
          <el-input size="mini" v-model="form.category" />
        </div>
        <div class="search-item">
          <span class="label">发布时间</span>
          <el-date-picker
            v-model="form.publishTime"
            type="datetimerange"
            size="mini"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="search-item">
          <span class="label">语种</span>
          <el-input size="mini" v-model="form.language" />
        </div>
        <div class="search-item">
          <span class="label"> </span>
        </div>
        <div class="search-btn">
          <span class="usual-btn" @click="fetchData(form)">搜索</span>
          <span class="usual-btn" @click="reset">重置</span>
        </div>
      </div>
      <div class="table-btn-box"  v-show="this.topicName"  style="text-align: left">
        <span class="usual-btn" @click="addProject">新增</span>
      </div>
      <div class="grid-box">
        <div class="lists">
          <div class="list-item" v-for="(item, index) in ztList" :key="index">
            <div class="first-line">
              <span class="title" @click="openDetail(item)">{{
                item.titleCn
              }}</span>
              <div class="btn">
                <span class="edit-icon-btn" @click="openEdit(item)"></span>
                <span class="detail-icon-btn" @click="openDetail(item)"></span>
                <span class="delete-icon-btn" @click="deleteItem(item)"></span>
              </div>
            </div>
            <div class="second-line">
              <span class="img"></span>
              <div class="right-side">
                <div class="text">{{ replaceHtml(item.contentCn) }}</div>
                <span
                  class="ztc"
                  v-for="(issue, innerIndex) in item.ztc"
                  :key="innerIndex"
                  >{{ issue }}</span
                >
              </div>
            </div>
            <div class="third-line">
              <div class="left-side">
                <span class="sskw" v-if="item.journalName">所属刊物 ： {{ item.journalName }}</span>
                <span class="country">国别 ： {{ item.country }}</span>
                <span class="country">语种 ： {{ item.language }}</span>
                <!-- <span class="country">情感 ： {{ item.affective }}</span> -->
              </div>
              <div class="right-side">
                <span class="author">作者 ： {{ item.author }}</span>
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
  </div>
</template>

<script>
import zhuantiEditDetail from "./zhuantiEditDetail.vue";
import zhuantiAddEdit from '../projectManagent/zhuantiAddEdit.vue'
import { DbDataLike, DbDataDetail, DbDataDelete } from "./api.js"; 
import { cloneDeep } from "lodash";
export default {
  components: { zhuantiEditDetail, zhuantiAddEdit },
  name: "trackingIndex",
  data() {
    return {
      form: {},
      current: 1,
      pageType: "list",
      detailData: {},
      size: 15,
      total: 0,
      ztList: [],
      // data: treeMenu,
      data: [
          {
              topicName: '南亚地区项目风险及对策'
          }, {
              topicName: '东南亚地区项目风险及对策',
          }, {
              topicName: '美国干扰与对冲',
          }, {
              topicName: '印度干扰与对冲',
          }, {
              topicName: '安全保障',
          }, {
              topicName: '中俄共建',
          }, {
              topicName: '第三方市场合作研究',
          }, {
              topicName: '国际社会反应',
          }, {
              topicName: '国际舆情分析',
          }
      ],
      checkedKey: [],
      topicName: '',
      defaultProps: {
        children: "children",
        label: "topicName",
      },
      filterText: '',
    };
  },
  mounted() {
    this.showAll()
  },
  methods: {
    // 点击新增
    addProject() {
        this.pageType = 'add'
        this.detailData = {}
    },
    //去掉所有的html标记 
    replaceHtml(str) {
      if (str) {
        const str1 = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
        const newStr = str1.replace(/style\s*?=\s*?(['"])[\s\S]*?\1/g)
        return newStr.replace(/<[^>]+>/g,"");
      }
    },
    findFirstChildren(data) {
      if (data.children && data.children.length > 0) {
        this.findFirstChildren(data.children[0])
      } else {
        this.checkedKey = [data.id]
        this.fetchData({topicName: data.topicName})
      }
    },
    // 点击重置
    reset() {
      this.form = {};
      this.fetchData();
    },
    deleteItem(item) {
      DbDataDelete(item.id).then(res => {
        if (res.data.code === 0) {
          this.$message.success('删除成功')
          this.fetchData()
        }
      })
    },
    // 打开专题详情页面
    openDetail(item) {
      this.pageType = "detail";
      DbDataDetail(item.id).then(res => {
        if (res.data && res.data.data) {
          this.detailData = res.data.data;
        }
      })
    },
    // 修改
    openEdit(item) {
      this.pageType = "edit";
      DbDataDetail(item.id).then(res => {
        if (res.data && res.data.data) {
          this.detailData = res.data.data;
        }
      })
    },
    // 请求数据
    fetchData(
      searchform = {},
      size = this.size,
      current = this.current
    ) {
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
        multiCondition: []
      }
      for (const key in tempData) {
        if (tempData[key]) {
          if (key === 'titleCn' || key === 'contentCn') {
            postData.multiCondition.push({
              name: key,
              type: 'LIKE',
              values: [tempData[key]]
            })
          } else {
            postData.multiCondition.push({
              name: key,
              type: 'INCLUDES',
              values: [tempData[key]]
            })
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
        }
      });
    },
    // 数据英 => 中整理
    handlerData(data) {
      data.forEach((item) => {
        item.ztc = item.category? item.category.split(',') : []
      });
      return data;
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
      if (!data.children || data.children.length === 0) {
        this.$set(this, 'topicName', data.topicName)
        this.fetchData({topicName: data.topicName})
        this.pageType = 'list'
      }
    },
    showAll() {
      this.pageType = 'list'
      this.topicName = ''
      this.checkedKey = []
      this.data = cloneDeep(this.data)
      this.fetchData({})
    },
  },
};
</script>

<style lang="scss" scoped>
.tracking-index {
  height: 100%;
  width: 100%;
  display: flex;
  padding: 10px 10px 0;
  background: #e9e9e9 !important;
  overflow: hidden;
  .left-side-box {
    background: #fff !important; //2021-12-22 yjl
    flex-shrink: 0;
    overflow: hidden;
    .bottom-btn{
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .tree {
      height: calc(100% - 60px);
      padding: 20px;
      overflow: auto;
    }
  }
  .list-page-box {
    background: #fff !important; //2021-12-22 yjl
    padding: 10px 40px;
    margin-left: 10px;
    .lists {
      height: calc(100% - 70px);
      margin: 10px 0;
      overflow-y: auto;
      .list-item {
        font-size: 14px;
        padding: 15px 20px 20px 5px;
        border-top: 1px solid #ccc;
        .first-line {
          display: flex;
          justify-content: space-between;
          height: 50px;
          line-height: 50px;
          .title {
            color: #2f67e7;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
          }
          .btn {
            > span {
              display: inline-block;
              height: 15px;
              width: 15px;
              cursor: pointer;
              margin-left: 5px;
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
            color:#000;
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
          }
        }
        .third-line {
          // color: #8c8d8e;
           color:#606366;
          font-size: 12px;
          line-height: 30px;
          display: flex;
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
}
</style>
