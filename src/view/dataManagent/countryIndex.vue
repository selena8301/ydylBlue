<template>
  <div class="country-index">
    <div class="top middle-block">
      <ul class="fold_wrap" id="sm">
        <li @click="linkToDetail(item)" :class="{'show': currentIndex === index && currentInterval}" v-for="(item, index) in countrys" :key="index" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">
          <div class="mask_b">
            <h4>{{ item.name }}</h4>
          </div>
          <div class="pic_auto" :class="'pic_auto' + (index + 1)"></div>
          <div class="adv_intro_title">{{ item.name }}</div>
          <div class="adv_intro">
            <span v-for="(value, key, innerIndex) in item.obj" :key="innerIndex"
              >{{ key }}：{{ value }}<br /></span
            >
            <span v-if="item.text">{{ item.text }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="middle little-block">
      <div class="title">总体指数</div>
      <div class="content-box">
        <div class="left">
          <div class="navs" :class="{ active: currentZtType === 'ydyl' }">
            <span class="img"></span>
            <span class="text" @click="chooseType('ydyl')"
              >“一带一路” 安全指数</span
            >
          </div>
          <div class="navs" :class="{ active: currentZtType === 'sczl' }">
            <span class="img"></span>
            <span class="text" @click="chooseType('sczl')"
              >“丝绸之路经济带” 安全指数</span
            >
          </div>
          <div class="navs" :class="{ active: currentZtType === 'hssl' }">
            <span class="img"></span>
            <span class="text" @click="chooseType('hssl')"
              >“21世纪海上丝绸之路” 安全指数</span
            >
          </div>
        </div>
        <div class="center">
          <div ref="chart" class="chart"></div>
        </div>
        <div class="right">
          <div class="gzzd">
            <div class="box" @click="linkToOtherPage('全球情况')">
              <span class="img"></span>
              <div class="text">全球情况</div>
            </div>
          </div>
          <div class="znts">
            <div class="box" @click="linkToOtherPage('风险指数')">
              <span class="img"></span>
              <div class="text">风险指数</div>
            </div>
          </div>
          <div class="search">
            <el-input
              suffix-icon="el-icon-search"
              v-model="searchValue"
              size="mini"
              @keyup.enter.native="searchZt"
              placeholder="专题检索"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom mini-block">
      <div class="title">
        重点国家
        <!-- <span class="show-more" @click="linkToProject()">more</span> -->
      </div>
      <div class="content-box">
        <div class="types" v-for="(item, index) in types" :key="index"  @click="linkToProject(item)">
          <div class="content">
            <span class="name">{{ item.name }}</span>
            <span class="englishName">{{ item.englishName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echartsTimeConfig from "./echartConfig";
import {echartsDataOne, echartsDataTwo, echartsDataThree} from "./data"
import { cloneDeep } from "lodash";
export default {
  name: "countryIndex",
  data() {
    return {
      currentZtType: "ydyl", // 当前选中的总体指数类型
      searchValue: "", // 情报检索
      myChart: null, // 统计图实例
      types: [
        // 情报分类
        {
          name: "巴基斯坦",
          englishName: 'PAKISTAN'
        },
        {
          name: "阿富汗",
          englishName: 'AFGHANISTAN'
        },
        {
          name: "缅甸",
          englishName: 'MYANMAR'
        },
        {
          name: "哈萨克斯坦",
          englishName: 'KAZAKHSTAN'
        },
        {
          name: "吉尔吉斯斯坦",
          englishName: 'KYRGYZSTAN'
        },
        {
          name: "其他",
          englishName: 'OTHER'
        },
      ],
      countrys: [
        {
          name: "南亚地区",
          title: "南亚地区项目风险及对策",
          obj: {
            沿线国家: "巴基斯坦、阿富汗、孟加拉国、斯里兰卡、尼泊尔、不丹、马尔代夫",
            贸易投资合作:
              "南亚地区项目风险及对策",
          },
        },
        {
          name: "东南亚地区",
          title: "东南亚地区项目风险及对策",
          obj: {
            沿线国家: "中亚5国、西亚18国",
            贸易投资合作: "中国和新疆对中国",
          },
        },
        {
          name: "美国干扰与对冲",
          title: "美国干扰与对冲",
          obj: {
            沿线国家: "巴基斯坦",
            贸易投资合作: "中国和新疆对巴基斯坦的贸易和投资情况",
          },
        },
        {
          name: "印度干扰与对冲",
          title: "印度干扰与对冲",
          obj: {
            沿线国家: "蒙古、俄罗斯",
            贸易投资合作: "中国和沿线重点国家对蒙古和俄罗斯的贸易和投资情况",
          },
        },
        {
          name: "安全保障",
          title: "安全保障",
          obj: {
            沿线国家: "越南、老挝、柬埔寨、缅甸、泰国、新加坡、马来西亚",
            贸易投资合作: "中国和沿线重点国家对中国",
          },
        },
        {
          name: "中俄共建",
          title: "中俄共建",
          obj: {
            沿线国家: "印度、孟加拉、缅甸",
            贸易投资合作: "中国和云南对孟中印缅经济带各国的贸易和投资情况",
          },
        },
        {
          name: "第三方市场合作",
          title: "第三方市场合作",
          obj: {
            沿线国家: "东南亚10国、南亚8国",
            贸易投资合作:
              "中国和沿线重点国家对21世纪海上丝绸之路沿线各国的贸易和投资情况",
          },
        },
        {
          name: "国际社会反应",
          title: "国际社会反应",
          text: "涵盖一带一路沿线各国的地理环境、行政规划、国旗国徽、人口、经济、外交、旅游、文化等信息，作为经济统计数据的重要补充，为研究人员更深入了解各国的经济文化背景，进行相关的分析研究和战略规划提供服务与支持。",
        },
        {
          name: "国际舆情分析",
          title: "国际舆情分析",
          text: "涵盖一带一路沿线各国的地理环境、行政规划、国旗国徽、人口、经济、外交、旅游、文化等信息，作为经济统计数据的重要补充，为研究人员更深入了解各国的经济文化背景，进行相关的分析研究和战略规划提供服务与支持。",
        },
      ],
      currentInterval: null,
      currentIndex: -1,
      echartsDataOne:echartsDataOne,
      echartsDataTwo:echartsDataTwo,
      echartsDataThree:echartsDataThree
    };
  },
  mounted() {
    this.initChart(1, this.currentZtType);
    this.currentInterval = setInterval(() => {
      if (this.currentIndex === this.countrys.length - 1) {
        this.currentIndex = 0
      } else if (this.currentIndex < this.countrys.length - 1) {
        this.currentIndex ++
      }
    }, 3000)
  },
  methods: {
    // 点击总体指数类型
    chooseType(type) {
      this.currentZtType = type;
      this.initChart(type)
    },
    // 点击搜索
    searchZt() {
      this.$router.push({
        name: 'fullTextSearch',
        params: {
          searchValue: this.searchValue
        }
      })
    },
    // 初始化图表
    initChart(type) {
      // ***---***
      this.myChart = this.$echarts.init(this.$refs.chart);
      const echartsTimeConfigNew = cloneDeep(echartsTimeConfig);
      echartsTimeConfigNew.legend.data = ["中国", "美国", "日本"];
      echartsTimeConfigNew.xAxis.data = [
        "专家1",
        "专家2",
        "专家3",
        "专家4",
        "专家5",
        "专家6",
        "专家7",
        "专家8",
        "专家9",
        "专家10",
        "专家11",
        "专家12",
        "专家13",
      ];
      if(type == "ydyl"){
        echartsTimeConfigNew.series = this.echartsDataOne
      }else if(type == "sczl"){
        echartsTimeConfigNew.series = this.echartsDataTwo
      }else{
        echartsTimeConfigNew.series = this.echartsDataThree
      }
      
      this.myChart.setOption(echartsTimeConfigNew);
    },
    // 添加事件
    changeActive($event){
        $event.currentTarget.className="show";
        $event.currentTarget.style.width = '25%'
        clearInterval(this.currentInterval)
        // this.currentIndex = -1
        this.currentInterval = null
    },
    removeActive($event){
        $event.currentTarget.className="";
        $event.currentTarget.style.width = "12.5%"
        this.currentInterval = setInterval(() => {
          if (this.currentIndex === this.countrys.length - 1) {
            this.currentIndex = 0
          } else if (this.currentIndex < this.countrys.length - 1) {
            this.currentIndex ++
          }
        }, 3000)
    },
    // 点击跳转国家库
    linkToDetail(item) {
      this.$router.push({path: 'research?type=' + item.title})
      this.$store.dispatch("changeMenu", 9 + "");
    },
    // 跳转到专题列表页面
    linkToProject(data) {
      this.$router.push({name: 'nationalLibrary', params: {
        country: data.name? data.name : ''}})
    },
    // 点击全球情况/BRI进展/专题检索
    linkToOtherPage(type) {
      if (type === '全球情况') {
        this.$router.push({name: 'dynamicTracing'})
        this.$store.dispatch("changeMenu", 7 + "");
      } else if (type === '风险指数') {
        this.$router.push({name: 'safetyRiskIndex'})
        this.$store.dispatch("changeMenu", 10 + "");
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.currentInterval)
  }
};


</script>

<style scoped lang="scss">
/deep/.search .el-input{
  height: 40px;
  line-height: 40px;
  .el-input__inner{
    height: 40px!important;
    line-height: 40px!important;
  }
  ::-webkit-input-placeholder {
      font-size: 17px;
  }
}
.country-index {
  height: calc(100% - 80px);
  width: 100%;
  padding: 25px 0 0 0;
  // background: #fff;
  .top {
    height: calc(40% - 42px);
    margin-bottom: 15px;
    .fold_wrap li.active .mask_b {
      background: none;
    }
    .fold_wrap li .adv_intro {
      width: 100%;
      height: 110px;
      padding: 5px 4%;
      position: absolute;
      left: 0;
      bottom: -120px;
      background: orange;
      color: #fff;
      overflow: hidden;
      filter: alpha(opacity=80);
      -moz-opacity: 0.8;
      opacity: 0.8;
    }
    .fold_wrap li .adv_intro_title {
      width: 100%;
      height: 80px;
      text-align: center;
      position: absolute;
      left: 0;
      top: -90px;
      color: #ff9031;
      text-shadow: 0 1px 0 #fff;
      overflow: hidden;
      font: 30px/30px Microsoft Yahei;
    }
    .adv_intro span {
      font-weight: 600;
      color: #333;
      font-size: 13px;
    }
    li.show{
      width: 25%!important;
        .adv_intro {
          bottom: 0px !important;
          transition: bottom 0.3s linear 0.3s;
          -webkit-transition: bottom 0.3s linear 0.3s;
          -moz-transition: bottom 0.3s linear 0.3s;
          -o-transition: bottom 0.3s linear 0.3s;
        }
        .adv_intro_title {
          top: 30px !important;
          transition: top 0.3s linear 0.3s;
          -webkit-transition: top 0.3s linear 0.3s;
          -moz-transition: top 0.3s linear 0.3s;
          -o-transition: top 0.3s linear 0.3s;
        }
        .mask_b{
            display: none;
        }
    }
    .fold_wrap {
      width: 100%;
      height: 100%;
      padding: 20px 40px;
      overflow: hidden;
      display: flex;
      li {
        width: 12.5%;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        transition:width .5s;
      }
    }
    .fold_wrap li .mask_b {
      position: absolute;
      overflow: hidden;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.3);
      _background: #b2b2b2;
    }
    .fold_wrap li .mask_b h4 {
      color: #fff;
      height: 100%;
      width: 30px;
      margin: 0 auto;
      display: block;
      font: 26px/28px Microsoft Yahei;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .pic_auto {
      width: 100%;
      height: 100%;
      // opacity: 0.1;
    }
    .pic_auto1 {
      background: url("../../assets/image/pics/pic1.jpg") no-repeat center 0;
    }
    .pic_auto2 {
      background: url("../../assets/image/pics/pic2.jpg") no-repeat center 0;
    }
    .pic_auto3 {
      background: url("../../assets/image/pics/pic3.jpg") no-repeat center 0;
    }
    .pic_auto4 {
      background: url("../../assets/image/pics/pic4.jpg") no-repeat center 0;
    }
    .pic_auto5 {
      background: url("../../assets/image/pics/pic5.jpg") no-repeat center 0;
    }
    .pic_auto6 {
      background: url("../../assets/image/pics/pic6.jpg") no-repeat center 0;
    }
    .pic_auto7 {
      background: url("../../assets/image/pics/pic7.jpg") no-repeat center 0;
    }
    .pic_auto8 {
      background: url("../../assets/image/pics/pic8.jpg") no-repeat center 0;
    }
    .pic_auto9 {
      background: url("../../assets/image/pics/pic9.jpg") no-repeat center 0;
    }
  }
  .middle {
    height: calc(35%);
    margin-bottom: 15px;
    padding-right: 15px;
    color: #fff;
    .left {
      padding: 30px 0;
      display: flex;
      flex-direction: column;
      width: 230px;
      .navs {
        flex: 1;
        padding-left: 75px;
        position: relative;
        opacity: 0.5;
        padding-top: 5px;
        .img {
          position: absolute;
          left: 40px;
          top: 7px;
          height: 16px;
          width: 16px;
          display: block;
          background: url("../../assets/image/bg/zhishu.png");
          background-size: 100% 100%;
        }
        .text {
          cursor: pointer;
          color:#000;
          font-size: 16px;
        }
        &.active {
          opacity: 1;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      padding-top: 20px;
      padding-bottom: 20px;
      width: 270px;
      > div {
        flex: 1;
      }
      .box {
        // background: #10284b;
        // border-radius: 1px;
        // margin-bottom: 15px;
        background: url('../../assets/image/pics/boxbg.png') no-repeat;
        background-size: 100% 100%;
        height: calc(100% - 15px);
        position: relative;
        cursor: pointer;
      }
      .img {
        display: inline-block;
        height: 28px;
        width: 28px;
        position: absolute;
        top: calc(50% - 13px);
        left: 25px;
      }
      .text {
        display: inline-block;
        position: absolute;
        top: calc(50% - 11px);
        left: 80px;
        font-size: 16px;
      }
      .gzzd {
        position: relative;
        .img {
          background: url("../../assets/image/bg/zhongdianguanzhu.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }
      .znts {
        position: relative;
        .img {
          background: url("../../assets/image/bg/zhinengtuisong.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .center {
      width: calc(100% - 500px);
      margin-right: 20px;
      margin-bottom: 15px;
      .chart {
        height: 100%;
        width: 100%;
      }
    }
  }
  .bottom {
    height: 25%;
    .content-box {
      padding-top: 20px;
    }
  }
  .title {
    font-size: 16px;
    color: #000;
    font-weight: bold;
    padding-top: 15px;
    padding-left: 60px;
    position: relative;
    &:before {
      content: "";
      height: 15px;
      width: 4px;
      // background: #00deff;
      background: #1b64db;
      position: absolute;
      left: 42px;
      top: 19px;
    }
    .show-more {
      position: absolute;
      right: 20px;
      top: 10px;
      font-size: 13px;
      color: #ccc;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
  .content-box {
    height: calc(100% - 36px);
    padding: 0 20px;
    display: flex;
    .types {
      display: inline-block;
      // height: calc(100% - 30px);
      flex: 1;
      // background: #0f2647;
      margin-left: 15px;
      border-radius: 10px;
      color: #fff;
      .content{
        opacity: .9;
        padding: 20% 12%;
        height: 100%;
        width: 100%;
        background: url('../../assets/image/pics/pic.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        >span{
          display: block;
          width: 100%;
          text-align: right;
          height: 2rem;
        }
        .name{
          color: #00f0ff;
          font-size: 1.3rem;
          text-shadow: -2px -2px 1px #000;
        }
        .englishName{
          color: #86d7ff;
          text-shadow: -1px -2px 1px #111;
        }
        &:hover{
          // animation: all .5s ease-in;
          background: url('../../assets/image/pics/pic.png') no-repeat;
          background-size: 100% 100%;
          opacity: 1;
          .name{
            font-size: 1.5rem;
            height: 2.5rem;
          }
        }
      }
    }
  }
}
</style>
