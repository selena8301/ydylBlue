<template>
  <div class="rightContent">
    <div class="chart-block">
      <div class="eCharts-header">
        <span> 总体实力 </span>
        <!-- <el-radio-group v-model="radio1" size="mini">
                    <el-radio-button label="常备军实力排名"></el-radio-button>
                    <el-radio-button label="后备力量实力排名"></el-radio-button>
                    <el-radio-button label="常备军占武装力量比例"></el-radio-button>
                    <el-radio-button label="任务部队数量"></el-radio-button>
                    <el-radio-button label="任务部队质量"></el-radio-button>
                </el-radio-group> -->
      </div>
      <div class="eCharts-content">
        <div id="eChartsBar1"></div>
      </div>
    </div>
    
    <div class="chart-block">
      <div class="eCharts-header">
        <span> 国际维和实力 </span>
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="部署中军事观察员数量"></el-radio-button>
          <el-radio-button label="派员的维和任务区数量"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="display: flex;">
            <div style="margin-left:10px">
                <span style="display:inline-block;background:#1c6a79;width:15px;height:10px"></span>
                <span style="font-size:12px;color:#000;">中国</span>
            </div>
            <div style="margin-left:10px">
                <span style="display:inline-block;background:#009dbb;width:15px;height:10px"></span>
                <span style="font-size:12px;color:#000;">美国</span>
            </div>
            <div style="margin-left:10px">
                <span style="display:inline-block;background:#6adbf9;width:15px;height:10px"></span>
                <span style="font-size:12px;color:#000;">日本</span>
            </div>
    </div>
      <div class="eCharts-content">
        <div id="eChartsFunnel1" class="eChartsFunnel"></div>
        <div id="eChartsFunnel2" class="eChartsFunnel"></div>
      </div>
    </div>

    <div class="chart-block">
      <div class="eCharts-header">
        <span> 教育训练合作能力 </span>
        <el-radio-group v-model="radio2" size="mini">
          <el-radio-button label="年度联合统计"></el-radio-button>
          <el-radio-button label="在华军事统计"></el-radio-button>
          <el-radio-button label="外派军事统计"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="display: flex;">
            <div style="margin-left:10px">
                <span style="display:inline-block;background:#1c6a79;width:15px;height:10px"></span>
                <span style="font-size:12px;color:#000;">中国</span>
            </div>
            <div style="margin-left:10px">
                <span style="display:inline-block;background:#009dbb;width:15px;height:10px"></span>
                <span style="font-size:12px;color:#000;">美国</span>
            </div>
            <div style="margin-left:10px">
                <span style="display:inline-block;background:#6adbf9;width:15px;height:10px"></span>
                <span style="font-size:12px;color:#000;">日本</span>
            </div>
    </div>
      <div class="eCharts-content">
        <div id="eChartsPie5" class="eChartsPie"></div>
        <div id="eChartsPie6" class="eChartsPie"></div>
      </div>
    </div>

    

    <div class="chart-block-big">
      <div class="eCharts-header">
        <span> 军事实力 </span>
        <el-radio-group v-model="radio3" size="mini">
          <el-radio-button label="年度军事活动统计"></el-radio-button>
          <el-radio-button label="境外基地人员实力"></el-radio-button>
          <el-radio-button label="年度军贸出口总金额"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="eCharts-content">
        <div id="eChartsLine" class="eChartsTime"></div>
      </div>
    </div>
  </div>
</template>

<script>
const myEcharts = {
line:'',
  bar1: "",
  funnel1: "",
  funnel2: "",
  bar4: "",
  pie1: "",
  pie2: "",
  pie3: "",
  pie4: "",
  pie5: "",
  pie6: "",
  pie7: "",
  pie8: "",
};
import {
  echartsTimeConfig,
  echartsBarConfig,
  echartsPieConfig,
  echartsFunnelConfig,
} from "../../../assets/echartsConfig";
import { cloneDeep } from 'lodash'
export default {
  components: {},
  name: "statisticAnalysis",
  data() {
    return {
      radio1: "部署中军事观察员数量",
      radio2: "年度联合统计",
      radio3: "年度军事活动统计",
    };
  },
  methods: {
    initPie(id, key, legend, data, title) {
      let echartsPieConfigNew = cloneDeep(echartsPieConfig);
      echartsPieConfigNew.legend.data = legend;
      echartsPieConfigNew.title.text = title;
      echartsPieConfigNew.series[0].data = data;
      (echartsPieConfigNew.series[0].center = ["50%", "30%"]),
        (myEcharts[key] = this.$echarts.init(document.getElementById(id)));
      myEcharts[key].setOption(echartsPieConfigNew);
    },
    initBar(id, key, legend, data, title) {
      let echartsBarConfigNew = cloneDeep(echartsBarConfig);
      echartsBarConfigNew.title.text = title;
      echartsBarConfigNew.xAxis.data = legend;
      echartsBarConfigNew.xAxis.type = "category";
      echartsBarConfigNew.yAxis.type = "value";
      echartsBarConfigNew.series[0].data = data;
      myEcharts[key] = this.$echarts.init(document.getElementById(id));
      myEcharts[key].setOption(echartsBarConfigNew);
    },
    initPies(id, key, title) {
      var BorderWidth = "10";
      //反方向剩下部分的样式
      var placeHolderStyle = {
        normal: {
          label: {
            show: false,
            position: "outside",
          },
          labelLine: {
            show: false,
            length: 100,
            smooth: 0.5,
          },
          /* color: "rgba(0,0,0,0)",
         borderColor: "rgba(0,0,0,0)",*/
          borderWidth: BorderWidth,
          /*shadowBlur: 40,*/
          borderColor: "#BEBEBE",
        },
        emphasis: {
          color: "#dedede",
          borderColor: "#dedede",
          borderWidth: 0,
        },
      };
      var option = {
        title: {
          text: title,
          /*subtext: '纯属虚构',*/
          left: "center",
          top: "10%",
        },
        /* backgroundColor: '#000',*/
        color: ["#53f1f2", "#4ebefd", "#30ed9d", "#faa234"],
        series: [
          {
            name: "葡萄",
            type: "pie",
            clockWise: true, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: [80, 81],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: "outside",
                },
                labelLine: {
                  show: false,
                  length: 100,
                  smooth: 0.5,
                },
                borderWidth: BorderWidth,
                /*shadowBlur: 40,*/
                borderColor: "#1c6a79",
                /*shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影*/
              },
            },
            data: [
              {
                value: 7,
                name: "70%",
              },
              {
                value: 3,
                name: "",
                itemStyle: placeHolderStyle,
              },
            ],
          },
          {
            name: "梨",
            type: "pie",
            clockWise: true,
            hoverAnimation: false,
            radius: [60, 61],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                  length: 100,
                  smooth: 0.5,
                },
                borderWidth: BorderWidth,
                /* shadowBlur: 40,*/
                borderColor: "#009dbb",
                /*  shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影*/
              },
            },
            data: [
              {
                value: 6,
                name: "60%",
              },
              {
                value: 4,
                name: "",
                itemStyle: placeHolderStyle,
              },
            ],
          },
          {
            name: "香蕉",
            type: "pie",
            clockWise: true,
            hoverAnimation: false,
            radius: [40, 41],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                  length: 100,
                  smooth: 0.5,
                },
                borderWidth: BorderWidth,
                /*shadowBlur: 40,*/
                borderColor: "#6adbf9",
                /*shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影*/
              },
            },
            data: [
              {
                value: 5,
                name: "40%",
              },
              {
                value: 5,
                name: "",
                itemStyle: placeHolderStyle,
              },
            ],
          },
        //   {
        //     name: "苹果",
        //     type: "pie",
        //     clockWise: true,
        //     hoverAnimation: false,
        //     radius: [20, 21],
        //     itemStyle: {
        //       normal: {
        //         label: {
        //           show: false,
        //         },
        //         labelLine: {
        //           show: false,
        //           length: 100,
        //           smooth: 0.5,
        //         },
        //         borderWidth: BorderWidth,
        //         /* shadowBlur: 40,*/
        //         borderColor: "#88AA00",
        //         /*shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影*/
        //       },
        //     },
        //     data: [
        //       {
        //         value: 5,
        //         name: "30%",
        //       },
        //       {
        //         value: 5,
        //         name: "",
        //         itemStyle: placeHolderStyle,
        //       },
        //     ],
        //   },
        ],
      };
      myEcharts[key] = this.$echarts.init(document.getElementById(id));
      myEcharts[key].setOption(option);
    },
    deepCopy(data) {
      return JSON.parse(JSON.stringify(data));
    },
  },
  created() {},
  mounted() {
    let echartsTimeConfigNew = this.deepCopy(echartsTimeConfig);
    let echartsBarConfigNew = this.deepCopy(echartsBarConfig);
    let echartsFunnelConfiggNew1 = this.deepCopy(echartsFunnelConfig);
    let echartsFunnelConfiggNew2 = this.deepCopy(echartsFunnelConfig);


    echartsTimeConfigNew.legend.data = ['中国','美国','日本']
    echartsTimeConfigNew.xAxis.data = [
        '出访团组',
        '接访团组',
        '国防部热线电话协议',
        '国际条约签署',
        '国防部记者会',
        '国际防务二轨会议',
        '境外基地',
        '境外部署作战部队',
        '外访舰队批次',
        '亚丁湾护航舰队批次',
        '军援批次',
        '军援对象国',
        '军贸出口装备',
    ]
    echartsTimeConfigNew.series = [
        {
            name: '中国',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210,84,454,41,45,454,111]
        },
        {
            name: '美国',
            type: 'line',
            stack: '总量',
            data: [123, 11, 23,414, 121, 453, 45,84,35,41,444,454,88]
        },
        {
            name: '日本',
            type: 'line',
            stack: '总量',
            data: [68, 338, 78, 383, 90, 230, 210,838,454,41,387,454,78]
        },
    ]
    myEcharts.line = this.$echarts.init(document.getElementById("eChartsLine"));
    myEcharts.line.setOption(echartsTimeConfigNew);



    echartsBarConfigNew.xAxis.type = "value";
    echartsBarConfigNew.yAxis.type = "category";
    echartsBarConfigNew.legend.data = ['中国','美国','日本']
    echartsBarConfigNew.title.text = "总体实力";
    echartsBarConfigNew.yAxis.data = [
      "驻外武官处数量",
      "驻外军事外交人员数量",
      "其他海外部署人员数量",
    ];
    echartsBarConfigNew.series =  [
        {
            name: '中国',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: [320, 302, 301]
        },
        {
            name: '美国',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: [120, 132, 101]
        },
        {
            name: '日本',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: [220, 182, 191]
    }]
    myEcharts.bar1 = this.$echarts.init(document.getElementById("eChartsBar1"));
    myEcharts.bar1.setOption(echartsBarConfigNew);

    this.initPies("eChartsPie5", "pie5", "年度联合军事演习层次比例");
    this.initPies('eChartsPie6','pie6','年度联合军事演习类别比例')

    myEcharts.funnel1 = this.$echarts.init(
      document.getElementById("eChartsFunnel1")
    );
    echartsFunnelConfiggNew1.series[0].data = [
      { value: 60, name: "25%" },
      { value: 40, name: "20%" },
      { value: 20, name: "5%" },
    ];
    echartsFunnelConfiggNew1.title.text = "部队中维和部队实力";
    // echartsFunnelConfiggNew1.title.subtext = "（三代以上装备占比）";
    echartsFunnelConfiggNew1.title.bottom = "8%";
    echartsFunnelConfiggNew1.title.left = "50%";
    // echartsFunnelConfiggNew1.series[0].funnelAlign = "right"
    echartsFunnelConfiggNew1.series[0].label.position = "left"
    echartsFunnelConfiggNew1.series[0].right = 0;
    myEcharts.funnel1.setOption(echartsFunnelConfiggNew1);

    myEcharts.funnel2 = this.$echarts.init(
      document.getElementById("eChartsFunnel2")
    );
    echartsFunnelConfiggNew2.title.text = "待命维和部队实力";
    // echartsFunnelConfiggNew2.title.subtext = "（保障部队比例）";
    echartsFunnelConfiggNew2.title.bottom = "8%";
    echartsFunnelConfiggNew2.title.left = "20%";
    echartsFunnelConfiggNew2.series[0].data = [
      { value: 60, name: "3.19%" },
      { value: 40, name: "2%" },
      { value: 20, name: "1%" },
    ];
    echartsFunnelConfiggNew2.series[0].left = 0;

    // echartsFunnelConfiggNew2.series[0].funnelAlign = "left";
    echartsFunnelConfiggNew2.series[0].label.position = "right";
    myEcharts.funnel2.setOption(echartsFunnelConfiggNew2);
  },
};
</script>

<style scoped>
.rightContent {
  width: 100%;
  height: 100%;
  /* background: red; */
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.chart-block {
  width: 32.5%;
  height: 49%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  margin: 0 0.2%;
}
.chart-block-big{
    width: 100%;
    height: 49%;
    display: flex;
    flex-direction: column;
    margin-right:  1.4%;
}
.eCharts-header >span{
    color: #fff;
}
.eCharts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin:  5px;
}
.eCharts-content {
  flex: 1;
  display: flex;
}
#eChartsLine,
#eChartsBar1 {
  width: 100%;
  height: 100%;
}
.eChartsPie {
  width: 50%;
}
.eChartsBar {
  width: 100%;
}
.eChartsFunnel {
  width: 50%;
}
.progress-big {
  align-items: center;
}
.progress {
  display: flex;
  width: 24%;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
}
</style>
