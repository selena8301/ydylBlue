<template>
  <div class="zhuanti-edit-detail-simple">
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
      <div class="nr-line" v-show="currentType">
        <span v-html="detailData.contentCn"></span>
      </div>
      <div class="nr-line" v-show="!currentType">


        <div class="nr-line" v-show="currentType">
          <span v-html="detailData.contentCn"></span>
        </div>
        <span v-html="detailData.content"></span>
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
import { DbDataDetail } from './api'
export default {
  data() {
    return {
      currentType: false,
      ztList: [],
      detailData: {}
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
  methods: {
    openNewPage(detailData) {
      window.open(detailData.fromUrl);
    },
  },
};
</script>
<style lang="scss">
.zhuanti-edit-detail-simple {
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background: #efefef;
  .zhuanti-edit-detail-simple-inner{
    background: #fff;
    padding: 20px;
    padding-bottom: 100px;
    overflow: auto;
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
  .nr-line {
    flex: 1;
    overflow: auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    line-height: 25px;
    color: #000;
    .zt-line{
      .zt-item{
        >span{
          text-decoration: underline;
          color: blue;
          cursor: pointer;
          margin-left: 5px;
        }
        .el-icon-close{
          color: red;
          margin: 0 5px;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
    img {
      border-radius: 5px;
      position: relative;
      margin: 20px auto;
      max-width: 60%;
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