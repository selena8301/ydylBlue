<template>
  <div class="linesimple">
    <draggable
      :options="{
        disabled: disabled,
        animation: 150,
        ghostClass: 'blue-background-class',
      }"
      @end="moveEnd"
      class="moveBox"
    >
      <div
        v-for="(linechartItem, linechartIndex) in getParentInfo"
        :key="'lineCharts' + linechartIndex"
        class="chart-block"
        :class="linechartItem.chartClass"
      >
        <div class="chartTit">
          <p>{{ linechartItem.chartTit }}</p>
          <i
            class="el-icon-delete"
            :class="[disabled ? 'offDel' : 'onDel']"
            @click="removeChart(linechartIndex)"
          ></i>
          <i
            class="el-icon-edit"
            :class="[disabled ? 'offDel' : 'onDel']"
            @click="editChart(linechartItem, linechartIndex + 1)"
          ></i>
        </div>
        <div class="charShow"></div>
      </div>
    </draggable>
    <el-dialog title="编辑" :visible.sync="editchartDialog">
      <div class="editName">
        <span class="describe">图表名称:</span>
        <el-input
          v-model="editObj.charTit"
          placeholder="修改图表名称"
          class="selectInfo pintcharname"
        ></el-input>
      </div>
      <div class="funcBtn">
        <el-button @click="affirmEdit(false)">取消</el-button>
        <el-button @click="affirmEdit(true)" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { lineChart, pieChart, barChart } from "./chartview.js";
import result from "./result";
import { cloneDeep } from "lodash";
export default {
  data() {
    return {
      lineChart: {}, //echart初始化对象
      getParentInfo: [], //父组件传来的数据
      sortArr: [], //隐性排序移动顺序
      addChartInfo: false, //数据发生改变的flag
      disabled: true, //默认不可移动
      lineChartArr: [], //折线图arr
      pieChartArr: [], //饼图arr
      barChartArr: [], //柱状图arr
      editChartinfo: {},
      result: result,
      editchartDialog: false,
      editObj: {},
    };
  },
  props: ["addEcharts"],
  components: {
    draggable,
  },
  mounted() {
    this.getFirCharInfo();
  },
  watch: {
    addEcharts: {
      //监听添加的数据
      handler(newValue) {
        this.addChartInfo = true;
        for (var i = 0; i < newValue.length; i++) {
          this.sortArr.push(newValue[i]);
        }
        this.chartView();
      },
      deep: true,
    },
  },
  methods: {
    editdialog(data) {
      this.editchartDialog = !!data;
      this.editChartinfo = data;
    },
    affirmEdit(flag) {
      if (flag) {
        this.editChartinfo.chartTit = this.editObj.charTit;
      }
      this.editchartDialog = false;
      this.editObj.charTit = "";
    },
    getFirCharInfo() {
      this.getParentInfo = cloneDeep(this.result);
      this.sortArr = cloneDeep(this.result);
      this.result.forEach((item) => {
        if (item.chartType === "line") {
          this.lineChartArr.push(item);
        }
        if (item.chartType === "pie") {
          this.pieChartArr.push(item);
        }
        if (item.chartType === "bar") {
          this.barChartArr.push(item);
        }
      });
      this.$nextTick(() => {
        this.chartView();
      });
    },
    editChart(item, index) {
      this.editdialog(item);
    },
    removeChart(index) {
      for (var i = 0; i < this.sortArr.length; i++) {
        if (this.getParentInfo[index].text === this.sortArr[i].text) {
          this.sortArr.splice(i, 1);
        }
      }
      this.addChartInfo = true;
      this.chartView();
    },
    moveEnd(env) {
      //修改移动后的数据顺序
      var moveChart = this.sortArr[env.oldIndex];
      this.sortArr.splice(env.oldIndex, 1);
      this.sortArr.splice(env.newIndex, 0, moveChart);
    },
    chartView() {
      if (this.addChartInfo) {
        this.getParentInfo = [];
        this.getParentInfo = cloneDeep(this.sortArr);
        this.lineChartArr = [];
        this.pieChartArr = [];
        this.barChartArr = [];
        this.$nextTick(() => {
          for (var i = 0; i < this.getParentInfo.length; i++) {
            if (this.getParentInfo[i].chartType === "line") {
              this.lineChartArr.push(this.getParentInfo[i]);
              lineChart(this.lineChartArr);
            }
            if (this.getParentInfo[i].chartType === "pie") {
              this.pieChartArr.push(this.getParentInfo[i]);
              pieChart(this.pieChartArr);
            }
            if (this.getParentInfo[i].chartType === "bar") {
              this.barChartArr.push(this.getParentInfo[i]);
              barChart(this.barChartArr);
            }
          }
        });
      } else {
        lineChart(this.lineChartArr);
        pieChart(this.pieChartArr);
        barChart(this.barChartArr);
      }
    },
    parentInfo(params) {
      //父组件传参控制是否可以移动
      this.disabled = params;
    },
  }
};
</script>
<style lang="scss">
.chart-block {
  display: inline-block;
  margin: 0.4%;
}
.h30 {
  height: 34vh !important;
}
.h20 {
  height: 24vh !important;
}
.h15 {
  height: 19vh !important;
}
.w24 {
  width: 24vw !important;
}
.w49 {
  width: 49vw !important;
}
.w32 {
  width: 32vw !important;
}
.charShow {
  height: calc(100% - 4vh);
  width: 100%;
}
.chartTit {
  top: 0;
  width: 100%;
  height: 4vh;
  font-weight: bold;
  p {
    color: #000;
    display: inline-block;
    margin-top: 1.2vh;
    margin-left: 1vw;
    font-size: 1.5vh;
    font-family: FZZZHONGJW--GB1-0;
    padding-left: 20px;
    position: absolute;
    &:before {
      content: "";
      position: absolute;
      top: 0.3vh;
      left: 5px;
      height: 14px;
      width: 5px;
      background: #1b64db;
    }
  }
  i {
    float: right;
    margin-right: 1vw;
    margin-top: 1vh;
    cursor: pointer;
  }
}
.offDel {
  display: none !important;
}
</style>
