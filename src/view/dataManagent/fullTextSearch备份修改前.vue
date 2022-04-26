<template>
  <div class="full-text-search">
    <div
      class="list-page-box"
      v-if="pageType === 'edit' || pageType === 'detail'"
    >
      <zhuanti-edit-detail :pageType="pageType" :detailData="detailData" />
    </div>
    <div class="list-page-box big-padding" v-else>
      <div class="content">
        <div class="simple-search">
          <div class="simple-search-inner">
            <div class="text">全文检索</div>
            <div class="search">
              <el-input
                placeholder="输入关键字进行过滤"
                suffix-icon="el-icon-search"
                v-model="form.multiCondition.searchText"
              ></el-input>
              <span class="usual-btn" @click="fetchData(form)">检索</span>
              <span class="usual-btn" @click="searchType = !searchType">{{
                searchType ? "收起" : "高级检索"
              }}</span>
            </div>
          </div>
          <div class="senior-search" v-if="searchType">
            <div class="senior-item">
              <span class="label">专题分类</span>
              <span class="chooses">
                <el-checkbox-group v-model="form.multiCondition.topicName">
                  <el-checkbox label="军事"></el-checkbox>
                  <el-checkbox label="政治"></el-checkbox>
                  <el-checkbox label="经济"></el-checkbox>
                </el-checkbox-group>
              </span>
              <!-- <span class="more" @click="showMore('ztfl')">more</span> -->
            </div>
            <!-- <div class="senior-item">
              <span class="label">情感</span>
              <span class="chooses">
                <el-checkbox-group v-model="form.multiCondition.affective">
                  <el-checkbox label="中立"></el-checkbox>
                  <el-checkbox label="敌对"></el-checkbox>
                  <el-checkbox label="友好"></el-checkbox>
                </el-checkbox-group>
              </span>
            </div> -->
            <div class="senior-item">
              <span class="label">文章类型</span>
              <span class="chooses">
                <el-checkbox-group v-model="form.multiCondition.wzlx">
                  <el-checkbox label="新闻"></el-checkbox>
                  <el-checkbox label="评论"></el-checkbox>
                  <el-checkbox label="报告"></el-checkbox>
                  <el-checkbox label="期刊"></el-checkbox>
                  <el-checkbox label="论文"></el-checkbox>
                </el-checkbox-group>
              </span>
            </div>
            <div class="senior-item">
              <span class="label">语种</span>
              <span class="chooses">
                <el-checkbox-group v-model="form.multiCondition.language">
                  <el-checkbox label="英语"></el-checkbox>
                  <el-checkbox label="中文"></el-checkbox>
                  <el-checkbox label="日语"></el-checkbox>
                </el-checkbox-group>
              </span>
            </div>
            <div class="senior-item">
              <span class="label">国家</span>
              <span class="chooses">
                <el-checkbox-group v-model="form.multiCondition.country">
                  <el-checkbox label="美国"></el-checkbox>
                  <el-checkbox label="中国"></el-checkbox>
                  <el-checkbox label="日本"></el-checkbox>
                  <el-checkbox label="韩国"></el-checkbox>
                  <el-checkbox label="巴基斯坦"></el-checkbox>
                </el-checkbox-group>
              </span>
            </div>
            <div class="senior-item">
              <span class="label">来源类型</span>
              <span class="chooses">
                <el-checkbox-group v-model="form.multiCondition.fromType">
                  <el-checkbox label="智库"></el-checkbox>
                </el-checkbox-group>
              </span>
            </div>
            <div class="senior-item">
              <span class="label">热搜关键字</span>
              <span class="chooses">
                <el-checkbox-group v-model="form.multiCondition.category">
                  <el-checkbox label="中国"></el-checkbox>
                  <el-checkbox label="欧洲"></el-checkbox>
                  <el-checkbox label="美国"></el-checkbox>
                  <el-checkbox label="投资"></el-checkbox>
                  <el-checkbox label="武装冲突"></el-checkbox>
                  <el-checkbox label="军事战略"></el-checkbox>
                  <el-checkbox label="利比亚战争"></el-checkbox>
                </el-checkbox-group>
              </span>
            </div>
          </div>
          <div class="search-form-box" v-if="searchType">
            <div class="search-item">
              <span class="label">标题</span>
              <el-input size="mini" v-model="form.condition.titleCn" />
            </div>
            <div class="search-item">
              <span class="label">作者</span>
              <el-input size="mini" v-model="form.condition.author" />
            </div>
            <div class="search-item">
              <span class="label">关键字</span>
              <el-input size="mini" v-model="form.condition.category" />
            </div>
            <div class="search-item">
              <span class="label">发布时间</span>
              <el-date-picker
                size="mini"
                v-model="form.publishTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="search-item">
              <span class="label"> </span>
            </div>
          </div>
        </div>
        <div class="showList" v-if="showList">
          <div class="grid-box">
            <div class="lists">
              <div
                class="list-item"
                v-for="(item, index) in ztList"
                :key="index"
              >
                <div class="first-line">
                  <span class="title" @click="openDetail(item)">{{
                    item.titleCn
                  }}</span>
                  <div class="btn">
                    <span
                      class="detail-icon-btn"
                      @click="openDetail(item)"
                    ></span>
                    <span class="delete-icon-btn" @click="deleteItem(item)"></span>
                    <!-- <span class="edit-icon-btn"></span> -->
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
                    <span class="sskw" v-if="item.journalName"
                      >所属刊物 ： {{ item.journalName }}</span
                    >
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
    </div>
  </div>
</template>

<script>
import zhuantiEditDetail from "./zhuantiEditDetail.vue";
import { DbDataLike, DbDataDetail, DbDataDelete } from "./api.js";
import { cloneDeep } from "lodash"; 
export default {
  name: "fullTextSearch",
  components: { zhuantiEditDetail },
  data() {
    return {
      searchType: false,
      showList: false,
      pageType: "list",
      detailData: {},
      size: 15,
      total: 0,
      topicDataTree: [],
      form: {
        condition: {},
        multiCondition: {
          topicName: [],
          affective: [],
          wzlx: [],
          language: [],
          country: [],
          fromType: [],
          category: [],
        }
      },
      current: 1,
      ztList: [],
      selectRows: [],
      btnState: {
        新增: true,
        修改: false,
        删除: false,
      },
    };
  },
  mounted() {
    if (this.$route.params.searchValue) {
      this.form.multiCondition.searchText = this.$route.params.searchValue
      this.fetchData(this.form)
    }
    this.topicDataTree = this.$store.getters.topicDataTree
  },
  methods: {
    //去掉所有的html标记 
    replaceHtml(str) {
      if (str) {
        const str1 = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
        const newStr = str1.replace(/style\s*?=\s*?(['"])[\s\S]*?\1/g)
        return newStr.replace(/<[^>]+>/g,"");
      }
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
    deleteItem(item) {
      DbDataDelete(item.id).then(res => {
        if (res.data.code === 0) {
          this.$message.success('删除成功')
          this.fetchData()
        }
      })
    },
    // 点击更多
    showMore(type) {
      if (type === 'ztfl') {
        
      }
    },
    // 请求数据
    fetchData(
      searchform = {},
      size = this.size,
      current = this.current
    ) {
      this.showList = true;
      const tempData = cloneDeep(searchform);
      // if (postData.keyWords) {
      //   postData.category.push(postData.keyWords)
      //   delete postData.keyWords
      // }
      let postData = {
        condition: tempData.condition,
        multiCondition: []
      }
      for (const key in tempData.multiCondition) {
        if (tempData.multiCondition[key]) {
          if (key === 'searchText') {
            postData.multiCondition.push({
              name: 'titleCn',
              type: 'LIKE',
              values: [tempData.multiCondition[key]]
            })
            postData.multiCondition.push({
              name: 'contentCn',
              type: 'LIKE',
              values: [tempData.multiCondition[key]]
            })
          } else {
            postData.multiCondition.push({
              name: key,
              type: 'INCLUDES',
              values: [tempData.multiCondition[key]]
            })
          }
        }
      }
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
  },
};
</script>

<style lang="scss">
.full-text-search {
  height: 100%;
  width: 100%;
  padding: 15px 0;
  background: #fff; //2021-12-22 yjl
  .list-page-box {
    height: 100%;
    &.big-padding {
      padding: 50px !important;
    }
    .content {
      height: 100%;
      width: 100%;
      overflow: auto;
      position: relative;
      .simple-search {
        width: 50%;
        margin-left: calc(25% + 50px);
        margin-top: 15%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .simple-search-inner {
          position: relative;
          .text {
            position: absolute;
            top: -80px;
            width: calc(100% - 180px);
            text-align: center;
            font-size: 2rem;
          }
          .search {
            display: flex;
            .usual-btn {
              height: 40px !important;
              line-height: 40px !important;
              margin-left: 5px;
              width: 120px;
            }
          }
        }
        .senior-search {
          margin-top: 50px;
          position: relative;
          .senior-item {
            display: flex;
            // height: 40px;
            line-height: 40px;
            padding-right: 50px;
            .label {
              margin-right: 30px;
              display: inline-block;
              width: 120px;
            }
            .more{
              position: absolute;
              right: 0;
              cursor: pointer;
              &:hover{
                color: #00f0ff;
                font-weight: bold;
              }
            }
          }
        }
      }
      .showList {
        padding: 0 8%;
        margin-top: 50px;
        .lists {
          height: calc(100% - 70px);
          margin: 10px 0;
          overflow-y: auto;
          .list-item {
            font-size: 14px;
            padding: 15px 20px 20px 5px;
            border-top: 1px solid #c7c7c7;
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
              }
            }
            .third-line {
              color: #555;
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
  }
}
</style>
