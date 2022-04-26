<template>
  <div class="zhuanti-detail-simple2">
    <div class="zhuanti-edit-detail-simple-inner">
      <div class="title">
        <div class="country" v-show="currentType">{{ detailData.titleCn }}</div>
        <div class="country" v-show="!currentType">{{ detailData.title }}</div>
        <div class="change-language" v-show="detailData.content">
          <el-switch
            v-model="currentType"
            inactive-color="#13ce66"
            active-color="#ff4949"
            active-text="中"
            inactive-text="外"
          >
          </el-switch>
        </div>
      </div>
      <div class="top-line" v-show="currentType">
        <div class="left-side">
          <span class="sskw" v-if="detailData.journalName"
            >所属刊物 ： {{ detailData.journalName }}</span
          >
          <span class="country">国别 ： {{ detailData.country }}</span>
          <span class="country">语种 ： {{ detailData.language }}</span>
          <!-- <span class="country">情感 ： {{ detailData.affective }}</span> -->
          <span class="country">专题名称 ： {{ detailData.topicName }}</span>
        </div>
        <div class="right-side">
          <span class="author"
            >作者 ：
            {{
              detailData.authorCn ? detailData.authorCn : detailData.author
            }}</span
          >
          <span class="time">发布时间 ： {{ detailData.publishTime }}</span>
        </div>
      </div>
      <div class="top-line" v-show="!currentType">
        <div class="left-side">
          <span class="sskw" v-if="detailData.journalName"
            >Its publication ： {{ detailData.journalName }}</span
          >
          <span class="country">国别 ： {{ detailData.country }}</span>
          <span class="country">语种 ： {{ detailData.language }}</span>
          <!-- <span class="country">情感 ： {{ detailData.affective }}</span> -->
          <span class="country">专题名称 ： {{ detailData.topicName }}</span>
        </div>
        <div class="right-side">
          <span class="author">作者 ： {{ detailData.author }}</span>
          <span class="time">发布时间 ： {{ detailData.publishTime }}</span>
        </div>
      </div>
      <div class="content-box">
        <div class="open-close" @click="openClose = !openClose">
          {{ openClose ? "收起" : "展开" }}
        </div>
        <div class="choose-box">
          <span>国家</span>
          <el-select
            v-model="detailData.country"
            size="mini"
            filterable
            placeholder="请选择"
            @change="setFl(item)"
          >
            <el-option
              v-for="item in dictData['国家']"
              :key="item.dictName"
              :label="item.dictName"
              :value="item.dictName"
            >
            </el-option>
          </el-select>
          <span>分类</span>
          <el-select
            v-model="detailData.topicName"
            size="mini"
            filterable
            placeholder="请选择"
            @change="setFl(item)"
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
        <div
          class="predictResultList"
          :style="{ height: openClose ? 'unset' : '125px' }"
        >
          <div class="predictResultList-item fltitle">
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
            <span class="btn" @click="setFl(item)">采用</span>
          </div>
        </div>
        <div
          class="predictResultList"
          :style="{ height: openClose ? 'unset' : '125px' }"
        >
          <div class="predictResultList-item fltitle">
            <span class="num"></span>
            <span class="key">语种</span>
            <span class="val">得分</span>
            <span class="btn">操作</span>
          </div>
          <div
            class="predictResultList-item"
            v-for="(item, index) in langResultList"
            :key="index"
          >
            <span class="num">{{ index + 1 }}</span>
            <span class="key">{{ item.lang }}</span>
            <span class="val">{{ (item.score * 100).toFixed(3) }}</span>
            <span class="btn" @click="setLanguage(item)">采用</span>
          </div>
        </div>
        <div
          class="nr-line"
          v-show="currentType"
          v-html="detailData.contentCn"
        ></div>
        <div
          class="nr-line"
          v-show="!currentType"
          v-html="detailData.content"
        ></div>
      </div>
      <div class="bottom-line">
        <div class="nr-line" style="width: 50%">
          原始网址：<span
            style="
              width: 50%;
              text-decoration: underline;
              color: blue;
              cursor: pointer;
              z-index: 10000;
              overflow: hidden;
            "
            @click="openNewPage(detailData)"
            >{{ detailData.fromUrl }}</span
          >
        </div>
        <div class="right-side" v-if="detailData.category">
          <!-- <div class="text">{{ detailData.nr }}</div> -->
          <span
            class="ztc"
            v-for="(issue, innerIndex) in detailData.category.split(',')"
            :key="innerIndex"
            >{{ issue }}</span
          >
        </div>
        <div class="right-side" v-else></div>
      </div>
    </div>
  </div>
</template>
<script>
import { orderBy, cloneDeep } from "lodash";
import { DbDataEdit } from "./api";
import { mapGetters } from "vuex";
import moment from "moment";
import { DbDataDetail } from "./api";
export default {
  data() {
    return {
      currentType: true,
      openClose: false,
      detailData: {},
    };
  },
  created() {
    DbDataDetail(this.$route.query.id).then((res) => {
      if (res.data && res.data.data) {
        this.detailData = res.data.data;
        if (!this.detailData.content) {
          this.currentType = true;
        }
        this.detailData.publishTime = this.detailData.publishTime
          ? this.detailData.publishTime.slice(0, 19)
          : "";
      }
    });
  },
  computed: {
    ...mapGetters(["classArr", "dictData", "topicDataTree"]),
    predictResultList() {
      const predictResultList = [];
      const tempObj = this.detailData.predictResultList[0].predict;
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
          predictResultList.push(item);
        }
      });

      if (predictResultList.length === 0) {
        resultList.forEach((item, index) => {
          let num = (item.value * 100).toFixed(3);
          if (index < 3) {
            item.value = num;
            predictResultList.push(item);
          }
        });
      }
      return predictResultList || [];
    },
    langResultList() {
      const langResultList = this.detailData.langDetect
      return langResultList || [];
    },
  },
  mounted() {
    if (!this.detailData.content) {
      this.currentType = true;
    }
  },
  methods: {
    // 点击采用
    setFl(item) {
      let postData = {};
      if (item) {
        this.detailData.topicName = item.name;
        postData = cloneDeep(this.detailData);
      } else {
        postData = cloneDeep(this.detailData);
      }
      if (postData.publishTime) {
        postData.publishTime =
          moment(postData.publishTime).format("yyyy-MM-DD HH:mm:ss") + " 000";
      }
      if (postData.category) {
        postData.category = postData.category
          .split(";")
          .join(",")
          .split("，")
          .join(",");
      }
      DbDataEdit(postData).then((res) => {
        if (res.data.code === 0) {
          this.$message.success("设置成功！");
          this.$parent.fetchData({ topicName: "未分类" });
          this.$parent.currentIndex -= 1;
        }
      });
    },
    // 点击采用
    setLanguage(item) {
      let postData = {};
      if (item) {
        this.detailData.language = item.lang;
        postData = cloneDeep(this.detailData);
      } else {
        postData = cloneDeep(this.detailData);
      }
      if (postData.publishTime) {
        postData.publishTime =
          moment(postData.publishTime).format("yyyy-MM-DD HH:mm:ss") + " 000";
      }
      if (postData.category) {
        postData.category = postData.category
          .split(";")
          .join(",")
          .split("，")
          .join(",");
      }
      DbDataEdit(postData).then((res) => {
        if (res.data.code === 0) {
          this.$message.success("设置成功！");
          this.$parent.fetchData({ topicName: "未分类" });
          this.$parent.currentIndex -= 1;
        }
      });
    },
    openNewPage(detailData) {
      window.open(detailData.fromUrl);
    },
  },
};
</script>
<style lang="scss">
.zhuanti-detail-simple2 {
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background: #efefef;
  .zhuanti-edit-detail-simple-inner {
    height: 100%;
    background: #fff;
    padding: 20px;
    padding-bottom: 100px;
    overflow: auto;
  }
  .predictResultList {
    width: calc(33% - 28px);
    display: inline-block;
    padding: 15px 0;
    margin-bottom: 15px;
    margin-left: 20px;
    background: #eee;
    font-size: 12px;
    color: #000;
    overflow: hidden;
    .predictResultList-item {
      height: 25px;
      line-height: 25px;
      display: flex;
      padding: 0 30px;
      &:hover {
        background: rgba(0, 221, 255, 0.1);
      }
      > span {
        display: inline-block;
      }
      .key,
      .val {
        flex: 1;
      }
      .num {
        width: 40px;
      }
      &.fltitle {
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
  .title {
    position: relative;
    min-height: 65px;
    .country {
      font-size: 28px;
      width: calc(100% - 300px);
      color: #00deff;
      text-align: center;
      min-height: 40px;
      line-height: 40px;
      margin: 10px 0 20px 0;
    }
    .change-language {
      position: absolute;
      right: 0;
      top: 25px;
    }
    .btn-box {
      position: absolute;
      bottom: 0;
    }
  }
  .content-box {
    flex: 1;
    overflow: auto;
    position: relative;
    .open-close {
      padding-left: 25px;
      padding-bottom: 35px;
      cursor: pointer;
      height: 28px;
      line-height: 28px;
    }
    .choose-box {
      position: absolute;
      top: 0;
      left: 130px;
      > span {
        display: inline-block;
        width: 100px;
        text-align: right;
        padding-right: 20px;
        color: #000;
      }
    }
    .nr-line {
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      line-height: 25px;
      color: #000;
      img {
        border-radius: 5px;
        position: relative;
        margin: 20px auto;
        max-width: 60%;
      }
    }
  }
  .bottom-line {
    margin: 1.5rem 0;
    display: flex;
    justify-content: space-between;
    .ztc {
      color: #cf861f;
      margin-right: 20px;
      height: 25px;
      line-height: 25px;
      text-decoration: underline;
      font-size: 1rem;
    }
  }
  .top-line {
    margin: 0 0 1rem 0;
    padding: 0 20px;
    // color: #eee;
    color: #606366;
    font-size: 1rem;
    // display: flex;
    justify-content: space-between;
    .left-side,
    .right-side {
      line-height: 30px;
      display: flex;
      > span {
        flex: 1;
      }
    }
    // .right-side {
    //   > span {
    //     margin-left: 20px;
    //   }
    // }
  }
  .obj {
    font-size: 12px;
    height: calc(100% - 80px);
    padding: 30px 0;
    overflow-y: auto;
    .obj-item {
      padding-bottom: 30px;
      padding-right: 40px;
      .objTitle {
        color: #fa781b;
        display: block;
        padding-bottom: 15px;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        position: relative;
        > span {
          display: inline-block;
        }
        .text {
          margin-right: 12px;
        }
        .line {
          flex: 1;
          height: 1px;
          background: #135b81;
          position: relative;
          top: 9px;
        }
      }
      .objText {
        color: #ddd;
        display: inline-block;
      }
      .text-box {
        display: flex;
        .img-box {
          width: 25%;
          margin-left: 20px;
          padding: 10px;
          background: url("../../assets/image/bg/img_box.png") no-repeat;
          background-size: 100% 100%;
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>