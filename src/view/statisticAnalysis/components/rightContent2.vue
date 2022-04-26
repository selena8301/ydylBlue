<template>
  <div class="rightContent">
    <div class="chart-block">
      <div class="eCharts-header">
        <span> 常备军力实力 </span>
        <!-- <el-radio-group v-model="radio1" size="mini">
                    <el-radio-button label="常备军实力排名"></el-radio-button>
                    <el-radio-button label="后备力量实力排名"></el-radio-button>
                    <el-radio-button label="常备军占武装力量比例"></el-radio-button>
                    <el-radio-button label="任务部队数量"></el-radio-button>
                    <el-radio-button label="任务部队质量"></el-radio-button>
                </el-radio-group> -->
      </div>
      <div class="eCharts-content">
        <div id="eChartsMap1"></div>
        <div id="eChartsBar1"></div>
      </div>
    </div>

    <div class="chart-block">
      <div class="eCharts-header">
        <span> 常备军力结构 </span>
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="军兵种编制比例"></el-radio-button>
          <el-radio-button label="军兵种部队编制比例"></el-radio-button>
          <el-radio-button label="作战与保障类单位比例"></el-radio-button>
          <el-radio-button label="主要方向与强敌比例"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="eCharts-content">
        <div id="eChartsPie1" class="eChartsPie"></div>
        <div id="eChartsPie2" class="eChartsPie"></div>
        <div id="eChartsPie3" class="eChartsPie"></div>
        <div id="eChartsPie4" class="eChartsPie"></div>
      </div>
    </div>

    <div class="chart-block">
      <div class="eCharts-header">
        <span> 常备军建设质量 </span>
        <el-radio-group v-model="radio2" size="mini">
          <el-radio-button label="保障质量"></el-radio-button>
          <el-radio-button label="人才队伍质量"></el-radio-button>
          <el-radio-button label="政治工作质量"></el-radio-button>
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
            <div style="margin-left:10px">
                <span style="display:inline-block;background:#88AA00;width:15px;height:10px"></span>
                <span style="font-size:12px;color:#000;">台湾</span>
            </div>
    </div>
      <div class="eCharts-content">
        
        <div id="eChartsFunnel1" class="eChartsFunnel"></div>
        <div id="eChartsFunnel2" class="eChartsFunnel"></div>
      </div>
    </div>

    <div class="chart-block">
      <div class="eCharts-header">
        <span> 常备军战备水平 </span>
        <el-radio-group v-model="radio3" size="mini">
          <el-radio-button label="年度战略战役演习数量"></el-radio-button>
          <el-radio-button label="年度训练任务完成率"></el-radio-button>
          <el-radio-button label="年度战备拉动评定"></el-radio-button>
          <el-radio-button label="年度军事训练评定"></el-radio-button>
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
            <div style="margin-left:10px">
                <span style="display:inline-block;background:#88AA00;width:15px;height:10px"></span>
                <span style="font-size:12px;color:#000;">台湾</span>
            </div>
    </div>
      <div class="eCharts-content">
        <div id="eChartsPie5" class="eChartsPie"></div>
        <div id="eChartsPie6" class="eChartsPie"></div>
        <div id="eChartsPie7" class="eChartsPie"></div>
        <div id="eChartsPie8" class="eChartsPie"></div>
      </div>
    </div>
  </div>
</template>

<script>
const myEcharts = {
  map1: "",
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
  echartsMapConfig,
  echartsBarConfig,
  echartsPieConfig,
  echartsFunnelConfig,
} from "../../../assets/echartsConfig";
export default {
  components: {},
  name: "statisticAnalysis",
  data() {
    return {
      radio1: "军兵种编制比例",
      radio2: "人才队伍质量",
      radio3: "年度训练任务完成率",
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
          bottom: "10%",
        },
        /* backgroundColor: '#000',*/
        color: ["#1c6a79", "#009dbb", "#6adbf9", "#88AA00"],
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
          {
            name: "苹果",
            type: "pie",
            clockWise: true,
            hoverAnimation: false,
            radius: [20, 21],
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
                borderColor: "#88AA00",
                /*shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影*/
              },
            },
            data: [
              {
                value: 5,
                name: "30%",
              },
              {
                value: 5,
                name: "",
                itemStyle: placeHolderStyle,
              },
            ],
          },
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
    let echartsMapConfigNew = this.deepCopy(echartsMapConfig);
    let echartsBarConfigNew = this.deepCopy(echartsBarConfig);
    let echartsFunnelConfiggNew1 = this.deepCopy(echartsFunnelConfig);
    let echartsFunnelConfiggNew2 = this.deepCopy(echartsFunnelConfig);

    myEcharts.map1 = this.$echarts.init(document.getElementById("eChartsMap1"));
    myEcharts.map1.setOption(echartsMapConfigNew);

    echartsBarConfigNew.xAxis.type = "value";
    echartsBarConfigNew.yAxis.type = "category";
    echartsBarConfigNew.title.text = "军力指数";
    echartsBarConfigNew.yAxis.data = [
      "美国",
      "俄国",
      "中国",
      "印度",
      "日本",
      "韩国",
      "台湾",
    ];
    echartsBarConfigNew.series[0].data = [
      "0.0606",
      "0.0681",
      "0.0691",
      "0.0953",
      "0.1501",
      "0.1509",
      "0.4008",
    ];
    myEcharts.bar1 = this.$echarts.init(document.getElementById("eChartsBar1"));
    myEcharts.bar1.setOption(echartsBarConfigNew);

    this.initPie(
      "eChartsPie1",
      "pie1",
      [
        "陆军",
        "海军",
        "空军",
        "火箭军",
        "战略支援部队",
        "后勤保障部队",
        "武警警察部队",
      ],
      [
        { value: 10000, name: "陆军" },
        { value: 9000, name: "海军" },
        { value: 123, name: "空军" },
        { value: 5464, name: "火箭军" },
        { value: 45, name: "战略支援部队" },
        { value: 47, name: "后勤保障部队" },
        { value: 878, name: "武警警察部队" },
      ],
      "中国"
    );

    this.initPie(
      "eChartsPie2",
      "pie2",
      ["陆军", "海军", "空军", "海军陆战队", "海岸警卫队"],
      [
        { value: 10000, name: "陆军" },
        { value: 9000, name: "海军" },
        { value: 1235, name: "空军" },
        { value: 7842, name: "海军陆战队" },
        { value: 454, name: "海岸警卫队" },
      ],
      "美国"
    );
    this.initPie(
      "eChartsPie3",
      "pie3",
      ["陆军", "海军", "空军"],
      [
        { value: 10000, name: "陆军" },
        { value: 9000, name: "海军" },
        { value: 1235, name: "空军" },
      ],
      "日本"
    );
    this.initPie(
      "eChartsPie4",
      "pie4",
      ["陆军", "海军", "空军", "后勤支援"],
      [
        { value: 10000, name: "陆军" },
        { value: 9000, name: "海军" },
        { value: 1235, name: "空军" },
        { value: 1235, name: "后勤支援" },
      ],
      "台湾"
    );
    this.initPies("eChartsPie5", "pie5", "战略级");
    this.initPies('eChartsPie6','pie6','战役级')
    this.initPies('eChartsPie7','pie7','战术级')
    this.initPies('eChartsPie8','pie8','其他')

    myEcharts.funnel1 = this.$echarts.init(
      document.getElementById("eChartsFunnel1")
    );
    echartsFunnelConfiggNew1.series[0].data = [
      { value: 80, name: "50%" },
      { value: 60, name: "25%" },
      { value: 40, name: "20%" },
      { value: 20, name: "5%" },
    ];
    echartsFunnelConfiggNew1.title.text = "装备保障质量";
    echartsFunnelConfiggNew1.title.subtext = "（三代以上装备占比）";
    echartsFunnelConfiggNew1.title.bottom = "0";
    echartsFunnelConfiggNew1.title.right = "10%";
    (echartsFunnelConfiggNew1.series[0].funnelAlign = "right"),
      (echartsFunnelConfiggNew1.series[0].label.position = "left");
    echartsFunnelConfiggNew1.series[0].right = 0;
    myEcharts.funnel1.setOption(echartsFunnelConfiggNew1);

    myEcharts.funnel2 = this.$echarts.init(
      document.getElementById("eChartsFunnel2")
    );
    echartsFunnelConfiggNew2.title.text = "后勤保障质量";
    echartsFunnelConfiggNew2.title.subtext = "（保障部队比例）";
    echartsFunnelConfiggNew2.title.bottom = "0";
    echartsFunnelConfiggNew2.title.left = "10%";
    echartsFunnelConfiggNew2.color = ['#88AA00',
        '#6adbf9',
        '#009dbb',
        '#1c6a79',
        '#0c9281',
        '#FF4500',
    ];
    echartsFunnelConfiggNew2.series[0].data = [
      { value: 80, name: "11.76%" },
      { value: 60, name: "3.19%" },
      { value: 40, name: "2%" },
      { value: 20, name: "1%" },
    ];
    echartsFunnelConfiggNew2.series[0].left = 0;

    echartsFunnelConfiggNew2.series[0].funnelAlign = "left";
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
  width: 49%;
  height: 49%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  margin: 0 0.4%;
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
#eChartsMap1,
#eChartsBar1 {
  width: 50%;
  height: 100%;
}
.eChartsPie {
  width: 24%;
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
