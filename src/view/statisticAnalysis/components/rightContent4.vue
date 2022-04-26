<template>
  <div class="rightContent">
    <div class="chart-block">
      <div class="eCharts-header">
        <span> 总体实力 </span>
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="国民生产总值排名"></el-radio-button>
          <el-radio-button label="三大产业比例"></el-radio-button>
          <el-radio-button label="三大产业就业人口比例"></el-radio-button>
          <el-radio-button label="18-45岁劳动力比例"></el-radio-button>
          <el-radio-button label="外贸依存度"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="eCharts-content">
        <div id="eChartsMap1"></div>
        <div id="eChartsBar1"></div>
      </div>
    </div>

    <div class="chart-block">
      <div class="eCharts-header">
        <span> 第一产业可持续性 </span>
        <el-radio-group v-model="radio2" size="mini">
          <el-radio-button label="农作物统计量"></el-radio-button>
          <el-radio-button label="粮油自给率"></el-radio-button>
          <el-radio-button label="人均耕地数量"></el-radio-button>
          <el-radio-button label="泛农业就业人口"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="eCharts-content">
        <div id="eChartsBar2" class="eChartsBar"></div>
      </div>
    </div>

    <div class="chart-block">
      <div class="eCharts-header">
        <span> 第三产业可持续性 </span>
        <el-radio-group v-model="radio3" size="mini">
          <el-radio-button label="交通运输行业可持续性"></el-radio-button>
          <el-radio-button label="医疗卫生行业可持续性"></el-radio-button>
          <el-radio-button label="能源行业可持续性"></el-radio-button>
          <el-radio-button label="信息技术行业可持续性"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="eCharts-content">
        <el-table :data="tableData" stripe style="width: 50%">
          <el-table-column show-overflow-tooltip prop="gj" label="国家"> </el-table-column>
          <el-table-column show-overflow-tooltip prop="mhkj" label="民航客机"> </el-table-column>
          <el-table-column show-overflow-tooltip prop="mhhj" label="民航货机"> </el-table-column>
          <el-table-column show-overflow-tooltip prop="dxgz" label="大型滚装/客滚船">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="yc" label="300T以上渔船"> </el-table-column>
          <el-table-column show-overflow-tooltip prop="tc" label="载重30t以上拖车"> </el-table-column>
          <el-table-column show-overflow-tooltip prop="kc" label="大型厢式客车"> </el-table-column>
        </el-table>
        <div id="eChartsBar4" class="eChartsBars"></div>
      </div>
    </div>

    <div class="chart-block">
      <div class="eCharts-header">
        <span> 第二产业可持续性 </span>
        <el-radio-group v-model="radio4" size="mini">
          <el-radio-button label="产能峰值"></el-radio-button>
          <el-radio-button label="泛军工就业人口"></el-radio-button>
          <el-radio-button label="军工生产线数量"></el-radio-button>
          <el-radio-button label="重工业原材料对外依存度"></el-radio-button>
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
  map1: "",
  line: "",
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
  echartsTimeConfig,
} from "../../../assets/echartsConfig";
import cloneDeep from 'lodash'
export default {
  components: {},
  name: "statisticAnalysis",
  data() {
    return {
      radio1: "国民生产总值排名",
      radio2: "农作物统计量",
      radio3: "交通运输行业可持续性",
      radio4: "产能峰值",
      tableData: [
        {
          gj: "中国",
          mhkj: "9000",
          mhhj: "5000",
          dxgz: "86",
          yc: "44",
          tc: "6000",
          kc: "8000",
        },
        {
          gj: "美国",
          mhkj: "10000",
          mhhj: "6000",
          dxgz: "92",
          yc: "60",
          tc: "4500",
          kc: "4600",
        },
        {
          gj: "日本",
          mhkj: "4000",
          mhhj: "3500",
          dxgz: "44",
          yc: "22",
          tc: "2300",
          kc: "5500",
        },
        {
          gj: "台湾",
          mhkj: "3800",
          mhhj: "3700",
          dxgz: "20",
          yc: "12",
          tc: "1500",
          kc: "2600",
        },
      ],
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
    initBar(id, key, legend, xdata, data, title) {
      let echartsBarConfigNew = this.deepCopy(echartsBarConfig);
      echartsBarConfigNew.title.text = title;
      echartsBarConfigNew.legend.data = legend;
      echartsBarConfigNew.xAxis.data = xdata;
      echartsBarConfigNew.xAxis.type = "category";
      echartsBarConfigNew.yAxis.type = "value";
      echartsBarConfigNew.series = data;
      myEcharts[key] = this.$echarts.init(document.getElementById(id));
      myEcharts[key].setOption(echartsBarConfigNew);
    },
    deepCopy(data) {
      return JSON.parse(JSON.stringify(data));
    },
  },
  created() {},
  mounted() {
    this.initBar(
      "eChartsLine",
      "line",
      ["中国", "美国", "日本", "台湾"],
      ["国防科技工业产值", "军工转产产值", "钢铁产能峰值"],
      [
        {
          name: "中国",
          type: "bar",
          data: [18203, 23489, 29034],
        },
        {
          name: "美国",
          type: "bar",
          data: [19325, 23438, 31000],
        },
        {
          name: "日本",
          type: "bar",
          data: [19325, 23438, 31000],
        },
        {
          name: "台湾",
          type: "bar",
          data: [19325, 23438, 31000],
        },
      ],
      "第二产业行业可持续性"
    );

    let echartsMapConfigNew = cloneDeep(echartsMapConfig);
    let echartsBarConfigNew = cloneDeep(echartsBarConfig);
    let echartsBarConfigNews = cloneDeep(echartsBarConfig);

    myEcharts.map1 = this.$echarts.init(document.getElementById("eChartsMap1"));
    myEcharts.map1.setOption(echartsMapConfigNew);

    echartsBarConfigNew.xAxis.type = "value";
    echartsBarConfigNew.yAxis.type = "category";
    echartsBarConfigNew.title.text = "世界排名";
    echartsBarConfigNew.yAxis.data = ["中国", "美国", "日本", "台湾"];
    echartsBarConfigNew.series[0].data = [
      "2183000",
      "1400000",
      "247160",
      "165000",
    ];
    myEcharts.bar1 = this.$echarts.init(document.getElementById("eChartsBar1"));
    myEcharts.bar1.setOption(echartsBarConfigNew);

    this.initBar(
      "eChartsBar2",
      "bar2",
      ["中国", "美国", "日本", "台湾"],
      ["人均粮食产量", "人均口粮储量", "人均大豆储量"],
      [
        {
          name: "中国",
          type: "bar",
          data: [18203, 23489, 29034],
        },
        {
          name: "美国",
          type: "bar",
          data: [19325, 23438, 31000],
        },
        {
          name: "日本",
          type: "bar",
          data: [19325, 23438, 31000],
        },
        {
          name: "台湾",
          type: "bar",
          data: [19325, 23438, 31000],
        },
      ],
      "第一产业行业可持续性"
    );

    echartsBarConfigNews.xAxis.type = "value";
    echartsBarConfigNews.yAxis.type = "category";
    echartsBarConfigNews.title.text = "总里程（万公里）";
    echartsBarConfigNews.legend.data = ["中国", "美国", "日本", "台湾"];
    echartsBarConfigNews.yAxis.data = ["高铁", "普通铁路", "输油管道"];
    echartsBarConfigNews.series = [
      {
        name: "中国",
        type: "bar",
        stack: "总量",
        label: {
          show: true,
          position: "insideRight",
        },
        data: [320, 302, 301],
      },
      {
        name: "美国",
        type: "bar",
        stack: "总量",
        label: {
          show: true,
          position: "insideRight",
        },
        data: [120, 132, 101],
      },
      {
        name: "日本",
        type: "bar",
        stack: "总量",
        label: {
          show: true,
          position: "insideRight",
        },
        data: [220, 182, 191],
      },
      {
        name: "台湾",
        type: "bar",
        stack: "总量",
        label: {
          show: true,
          position: "insideRight",
        },
        data: [150, 212, 201],
      },
    ];
    myEcharts.bar4 = this.$echarts.init(document.getElementById("eChartsBar4"));
    myEcharts.bar4.setOption(echartsBarConfigNews);
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
.chart-block:nth-of-type(odd) {
  width: 59%;
  height: 49%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  margin: 0 0.4%;
}
.chart-block:nth-of-type(even) {
  width: 39%;
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
  margin: 5px;
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
.eChartsTime {
  width: 100%;
  height: 100%;
}
.eChartsPie {
  width: 24%;
}
.eChartsBar {
  width: 100%;
}
.eChartsBars {
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
