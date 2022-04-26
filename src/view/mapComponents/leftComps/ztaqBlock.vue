<template>
  <div class="ztaq-block">
    <div class="first-block block">
      <div class="title">全球概况</div>
      <div class="inner-content">
        <dv-scroll-board :config="config" @click="clickRow" />
      </div>
    </div>
    <div class="second-block block">
      <div class="title">趋势分析图</div>
      <div class="inner-content">
        <div ref="chart" class="chart"></div>
      </div>
    </div>
    <div class="third-block block">
      <div class="title">分类安全数据趋势</div>
      <div class="inner-content">
        <div class="inner-btn-box">
          <span class="inner-btn" :class="{ active: currentZtType === '1' }" @click="chooseType('1')">政治安全</span>
          <span class="inner-btn" :class="{ active: currentZtType === '2' }" @click="chooseType('2')">社会安全</span>
          <span class="inner-btn" :class="{ active: currentZtType === '3' }" @click="chooseType('3')">国土安全</span>
          <span class="inner-btn" :class="{ active: currentZtType === '4' }" @click="chooseType('4')">生物安全</span>
        </div>
        <div class="charts">
          <dv-active-ring-chart :config="config1" />
          <dv-active-ring-chart :config="config1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echartsTimeConfig from "./echartConfig";
import { cloneDeep } from "lodash";
export default {
  name: "ztaqBlock",
  data() {
    return {
      currentZtType: "1",
      myChart: null, // 统计图实例
      config: {
        oddRowBGC:'#00f0ff1a',
        evenRowBGC:'#fff',
        rowNum: 5,
        waitTime: 1500,
        data: [
          ["2021-08-23", "大卫王酒店爆炸案"],
          ["2021-08-23", "古巴航空KY-455号班机空难"],
          ["2021-08-23", "12·4马航劫机案"],
          ["2021-08-23", "伊朗雷克斯电影院纵火案"],
          ["2021-08-23", "贝鲁特军营爆炸案"],
          ["2021-08-23", "海湾航空771号班机空难"],
          ["2021-08-23", "印度航空182号航班事故"],
          ["2021-08-23", "洛克比空难"],
          ["2021-08-23", "哥伦比亚航空203号班机空难"],
        ],
      },
      config1: {
        radius: "40%",
        activeRadius: "45%",
        data: [
          {
            name: "中国",
            value: 55,
          },
          {
            name: "美国",
            value: 120,
          },
          {
            name: "日本",
            value: 78,
          },
          {
            name: "俄罗斯",
            value: 66,
          },
          {
            name: "印度",
            value: 80,
          },
        ],
        digitalFlopStyle: {
          fontSize: 13,
        },
        lineWidth: 10
      },
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    clickRow(row) {
      //   debugger
    },
    chooseType(type) {
      this.currentZtType = type;
    },
    // 初始化图表
    initChart(no) {
      let dom = document.getElementsByClassName('second-block')[0]
      dom.style.width = '430px'
      dom.style.height = window.innerHeight*0.91+'px'
      this.myChart = this.$echarts.init(this.$refs.chart);
      const echartsTimeConfigNew = cloneDeep(echartsTimeConfig);
      echartsTimeConfigNew.legend.data = ["中国", "美国", "日本"];
      echartsTimeConfigNew.xAxis.data = [
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
      ];
      echartsTimeConfigNew.series = [
        {
          name: "中国",
          type: "line",
          stack: "总量",
          data: [120, 132, 101, 134, 90],
          smooth: true,
          // itemStyle: {
          //     normal: {
          //         areaStyle: {
          //             type: 'default',
          //             opacity: 0.1
          //         }
          //     }
          // },
          // 区域填充样式
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(255,222,0, 0.5)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(255,222,0, 0)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        {
          name: "美国",
          type: "line",
          stack: "总量",
          data: [123, 111, 223, 414, 121],
          smooth: true,
          // 区域填充样式
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(250,106,6, 0.5)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(250,106,6, 0)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        {
          name: "日本",
          type: "line",
          stack: "总量",
          data: [68, 338, 78, 383, 90, 230],
          smooth: true,
          // 区域填充样式
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(51,136,206, 0.5)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(51,136,206, 0)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ];
      this.myChart.setOption(echartsTimeConfigNew);
    },
  },
};
</script>

<style lang="scss">
.ztaq-block {
  height: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  .block {
    flex: 1;
    .title {
      color: #000;
      padding-left: 30px;
      position: relative;
      font-size: 12px;
      &:before {
        content: "";
        position: absolute;
        left: 12px;
        top: 3px;
        height: 12px;
        width: 4px;
        background: #1b64db;
      }
      &:after {
        content: "";
        position: absolute;
        left: 25px;
        bottom: -10px;
        width: calc(100% - 25px);
        height: 2px;
        background: url("../../../assets/image/ts/title_bg.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .inner-content {
      // background: red;
      height: calc(100% - 50px);
      margin-top: 20px;
    }
  }
  .first-block {
    .inner-content {
      padding-left: 20px;
      .dv-scroll-board {
         color: #333!important;
        .row-item {
          padding: 0 20px;
          cursor: pointer;
        }
      }
    }
  }
  .second-block {
    .chart {
      height: 100%;
      width: 100%;
    }
  }
  .third-block {
      overflow: hidden;
      .dv-active-ring-chart{
        color: #333!important;
        .active-ring-name{
          color: #333!important;
        }
        .dv-digital-flop{
          display: none;
        }
        .active-ring-name{
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    .inner-content {
      .inner-btn-box {
        padding-left: 20px;
        .inner-btn {
          display: inline-block;
          padding: 2px 10px;
          font-size: 12px;
          margin-left: 2px;
          background: rgba(7, 100, 187, 0.2);
          border: 1px solid rgba(7, 100, 187, 0.5);
          // color: rgba(31, 158, 204, 0.8);
          color:#726767;
          cursor: pointer;
          &.active {
            background: rgba(7, 100, 187, 0.3);
            border: 1px solid rgba(7, 100, 187, 0.7);
            color: #000;
          }
        }
      }
      .charts {
        margin-top: 3px;
        height: calc(100% - 20px);
        width: 100%;
        display: flex;
        .dv-active-ring-chart {
          flex: 1;
        }
      }
    }
  }
}
</style>
