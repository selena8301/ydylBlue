<template>
  <div class="research-index">
    <div class="research-index-content">
      <div class="zt-box">
        <div class="title-box">
          <span class="title">南亚地区项目风险及对策</span>
          <span class="more" @click="clickMore('南亚地区项目风险及对策')"
            >MORE+</span
          >
        </div>
        <div class="content-list">
          <div
            class="content-item"
            v-for="(item, index) in ztList"
            :key="index"
          >
            {{ item.titleCn }}
          </div>
        </div>
      </div>
      <div class="zt-box">
        <div class="title-box">
          <span class="title">东南亚地区项目风险及对策</span>
          <span class="more" @click="clickMore('东南亚地区项目风险及对策')"
            >MORE+</span
          >
        </div>
        <div class="content-list">
          <div
            class="content-item"
            v-for="(item, index) in ztList"
            :key="index"
          >
            {{ item.titleCn }}
          </div>
        </div>
      </div>
      <div class="zt-box">
        <div class="title-box">
          <span class="title">美国干扰与对冲</span>
          <span class="more" @click="clickMore('美国干扰与对冲')">MORE+</span>
        </div>
        <div class="content-list">
          <div
            class="content-item"
            v-for="(item, index) in ztList0"
            :key="index"
            @click="openNewPage(item.fromUrl)"
          >
            {{ item.titleCn }}
          </div>
        </div>
      </div>
      <div class="zt-box">
        <div class="title-box">
          <span class="title">印度干扰与对冲</span>
          <span class="more" @click="clickMore('印度干扰与对冲')">MORE+</span>
        </div>
        <div class="content-list">
          <div
            class="content-item"
            v-for="(item, index) in ztList"
            :key="index"
          >
            {{ item.titleCn }}
          </div>
        </div>
      </div>
      <div class="zt-box">
        <div class="title-box">
          <span class="title">安全保障</span>
          <span class="more" @click="clickMore('安全保障')">MORE+</span>
        </div>
        <div class="content-list">
          <div
            class="content-item"
            v-for="(item, index) in ztList"
            :key="index"
          >
            {{ item.titleCn }}
          </div>
        </div>
      </div>
      <div class="zt-box">
        <div class="title-box">
          <span class="title">中俄共建</span>
          <span class="more" @click="clickMore('中俄共建')">MORE+</span>
        </div>
        <div class="content-list">
          <div
            class="content-item"
            v-for="(item, index) in ztList"
            :key="index"
          >
            {{ item.titleCn }}
          </div>
        </div>
      </div>
      <div class="zt-box">
        <div class="title-box">
          <span class="title">第三方市场合作研究</span>
          <span class="more" @click="clickMore('第三方市场合作研究')"
            >MORE+</span
          >
        </div>
        <div class="content-list">
          <div
            class="content-item"
            v-for="(item, index) in ztList"
            :key="index"
          >
            {{ item.titleCn }}
          </div>
        </div>
      </div>
      <div class="zt-box">
        <div class="title-box">
          <span class="title">国际社会反应</span>
          <span class="more" @click="clickMore('国际社会反应')">MORE+</span>
        </div>
        <div class="content-list">
          <div
            class="content-item"
            v-for="(item, index) in ztList"
            :key="index"
          >
            {{ item.titleCn }}
          </div>
        </div>
      </div>
      <div class="zt-box" style="height: 370px">
        <div class="title-box">
          <span class="title">国际舆情分析</span>
          <span class="more" @click="clickMore('国际舆情分析')">MORE+</span>
        </div>
        <div class="content-list">
          <div
            class="content-item"
            v-for="(item, index) in ztList"
            :key="index"
          >
            {{ item.titleCn }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ztList0 from './ztyjData'
export default {
  data() {
    return {
      ztList0: ztList0,
      ztList: [
        {
          titleCn: "“一带一路”软环境建设与中国中东人文外交",
        },
        {
          titleCn: "“一带一路”建设中的宁夏发展战略研究",
        },
        {
          titleCn: "丝绸之路经济带与西部大开发新格局（全5册）",
        },
        {
          titleCn: "丝绸之路经济带发展报告（2021）",
        },
        {
          titleCn: "“一带一路”建设发展报告（2021）",
        },
        {
          titleCn: "“一带一路”与区域经济增长机制的构建、转型和扩容",
        },
        {
          titleCn: "“一带一路”背景下构建我国“走出去”企业社会责任软实力",
        },
      ],
    };
  },
  methods: {
    // 点击更多
    clickMore(type) {
      this.$router.push({path: "/research", query: {
        type: type
      }});
    },
    openNewPage(url) {
      window.open(url)
    }
  },
};
</script>

<style lang="scss" scoped>
.research-index {
  height: calc(100% - 80px);
  width: 100%;
  display: flex;
  padding: 20px;
  background: #fff;
  overflow: auto;
  .research-index-content {
    height: 90%;
    width: 80%;
    margin: 0 10%;
    padding-top: 2%;
    display: flex;
    flex-wrap: wrap;
    .zt-box {
      display: inline-block;
      width: calc(50% - 22px);
      margin: 10px;
      height: 315px;
      background: url(../../assets/image/pics/bg.png) no-repeat;
      background-size: 100% 100%;
      border-radius: 15px;
      .title-box {
        height: 45px;
        line-height: 45px;
        color: #fff;
        background: #0896f0;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        box-shadow: 0 0 7px 0.5px #dadada;
        .title {
          font-weight: bold;
          font-size: 18px;
        }
        .more {
          cursor: pointer;
          &:hover {
            color: aqua;
          }
        }
      }
      .content-list {
        border: 1px solid #dadada;
        box-shadow: 0 0 7px 0.5px #dadada;
        border-top: none;
        padding: 10px 30px;
        height: calc(100% - 45px);
        overflow: auto;
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
        .content-item {
          height: 35px;
          line-height: 35px;
          color: #555;
          cursor: pointer;
          text-decoration: underline;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:hover {
            color: #0095f1;
          }
        }
      }
    }
  }
}
</style>
