<template>
  <div class="rightContent">
    <div class="chart-block">
      <div class="eCharts-header">
        <span> 武装力量规模 </span>
        <el-radio-group v-model="radio1" @change="checkedRadio" size="mini">
          <el-radio-button
            v-for="item in redioListOne"
            :key="item.label"
            :label="item.label"
          ></el-radio-button>
        </el-radio-group>
      </div>
      <div class="eCharts-content">
        <div id="eChartsMap1"></div>
        <div id="eChartsBar1"></div>
      </div>
    </div>

    <div class="chart-block">
      <div class="eCharts-header">
        <span> 常备军力结构 </span>
        <el-radio-group v-model="radio2" size="mini">
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
        <span> 武装力量布局 </span>
        <el-radio-group v-model="radio3" size="mini">
          <el-radio-button label="军兵种编制比例"></el-radio-button>
          <el-radio-button label="军兵种部队编制比例"></el-radio-button>
          <el-radio-button label="作战与保障类单位比例"></el-radio-button>
          <el-radio-button label="主要方向与强敌比例"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="eCharts-content">
        <div id="eChartsBar2" class="eChartsBar"></div>
      </div>
    </div>

    <div class="chart-block">
      <div class="eCharts-header">
        <span> 武装力量建设质量 </span>
        <el-radio-group v-model="radio4" size="mini">
          <el-radio-button label="人才队伍质量"></el-radio-button>
          <el-radio-button label="装备保障质量"></el-radio-button>
          <el-radio-button label="作战与保障类单位比例"></el-radio-button>
          <el-radio-button label="政治工作质量"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="eCharts-content">
        <div id="eChartsBar3" class="eChartsBar"></div>
      </div>
    </div>

    <div class="chart-block">
      <div class="eCharts-header">
        <span> 武装力量战备水平 </span>
        <el-radio-group v-model="radio5" size="mini">
          <el-radio-button label="军兵种编制比例"></el-radio-button>
          <el-radio-button label="军兵种部队编制比例"></el-radio-button>
          <el-radio-button label="作战与保障类单位比例"></el-radio-button>
          <el-radio-button label="主要方向与强敌比例"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="eCharts-content progress-big">
        <div class="progress">
          <el-progress
            type="circle"
            color="#1c6a79"
            :percentage="93"
          ></el-progress>
          <span>中国</span>
        </div>
        <div class="progress">
          <el-progress
            type="circle"
            color="#1c6a79"
            :percentage="86"
          ></el-progress>
          <span>美国</span>
        </div>
        <div class="progress">
          <el-progress
            type="circle"
            color="#1c6a79"
            :percentage="75"
          ></el-progress>
          <span>日本</span>
        </div>
        <div class="progress">
          <el-progress
            type="circle"
            color="#1c6a79"
            :percentage="65"
          ></el-progress>
          <span>台湾</span>
        </div>
      </div>
    </div>

    <div class="chart-block">
      <div class="eCharts-header">
        <span> 武装力量布局 </span>
        <el-radio-group v-model="radio6" size="mini">
          <el-radio-button label="军兵种编制比例"></el-radio-button>
          <el-radio-button label="军兵种部队编制比例"></el-radio-button>
          <el-radio-button label="作战与保障类单位比例"></el-radio-button>
          <el-radio-button label="主要方向与强敌比例"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="eCharts-content">
        <div id="eChartsBar4" class="eChartsBar"></div>
      </div>
    </div>
  </div>
</template>

<script>
const myEcharts = {
  map1: "",
  bar1: "",
  bar2: "",
  bar3: "",
  bar4: "",
  pie1: "",
  pie2: "",
  pie3: "",
  pie4: "",
};
import {
  echartsMapConfig,
  echartsBarConfig,
  echartsPieConfig,
} from "../../../assets/echartsConfig";
import { chartOne } from "./data";
import { cloneDeep } from 'lodash'
export default {
  components: {},
  name: "statisticAnalysis",
  data() {
    return {
      radio1: "常备军实力排名",
      radio2: "军兵种编制比例",
      radio3: "军兵种编制比例",
      radio4: "人才队伍质量",
      radio5: "军兵种编制比例",
      radio6: "军兵种编制比例",
      redioListOne: [
        {
          label: "常备军实力排名",
        },
        {
          label: "后备力量实力排名",
        },
        {
          label: "常备军占武装力量比例",
        },
        {
          label: "任务部队数量",
        },
        {
          label: "任务部队质量",
        },
      ],

      chartOne: chartOne,
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
    checkedRadio(data) {
      console.log(data);
    },
  },
  created() {},
  mounted() {
    let echartsMapConfigNew = cloneDeep(echartsMapConfig);
    let echartsBarConfigNew = cloneDeep(echartsBarConfig);

    myEcharts.map1 = this.$echarts.init(document.getElementById("eChartsMap1"));
    myEcharts.map1.setOption(echartsMapConfigNew);

    echartsBarConfigNew.xAxis.type = "value";
    echartsBarConfigNew.yAxis.type = "category";
    echartsBarConfigNew.title.text = "世界排名";
    echartsBarConfigNew.yAxis.data = ["中国", "美国", "日本", "台湾"];
    echartsBarConfigNew.series[0].data = this.chartOne;
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
        // "战略支援部队",
        // "后勤保障部队",
        // "武警警察部队",
      ],
      [
        { value: 10000, name: "陆军" },
        { value: 9000, name: "海军" },
        { value: 123, name: "空军" },
        { value: 5464, name: "火箭军" },
        // { value: 45, name: "战略支援部队" },
        // { value: 47, name: "后勤保障部队" },
        // { value: 878, name: "武警警察部队" },
      ],
      "中国"
    );

    this.initPie(
      "eChartsPie2",
      "pie2",
      ["陆军", "海军", "空军",
      //  "海军陆战队", "海岸警卫队"
       ],
      [
        { value: 10000, name: "陆军" },
        { value: 9000, name: "海军" },
        { value: 1235, name: "空军" },
        // { value: 7842, name: "海军陆战队" },
        // { value: 454, name: "海岸警卫队" },
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

    this.initBar(
      "eChartsBar2",
      "bar2",
      ["中国", "美国", "日本", "台湾"],
      [4000, 4500, 680, 0],
      "历史人数"
    );

    this.initBar(
      "eChartsBar3",
      "bar3",
      ["中国", "美国", "日本", "台湾"],
      [25, 20, 20, 20],
      "本科学历人数（万）"
    );

    this.initBar(
      "eChartsBar4",
      "bar4",
      ["中国", "美国", "日本", "台湾"],
      [14.36, 21.43, 5.264, 4.21],
      "万亿美元"
    );
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
  height: 33%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  margin: 0 0.4%;
}
.eCharts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
}
.eCharts-header > span {
  color: #fff;
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
.progress > span {
  font-size: 12px;
  display: inline-block;
  margin-top: 20px;
}
</style>
