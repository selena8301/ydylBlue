<template>
  <div class="multiComps">
    <div class="funcBtn">
      <span class="usual-btn" @click="compileBtnFunc()">编辑</span>
      <span class="usual-btn" @click="saveBtnFunc()" v-show="!disab">保存</span>
      <span class="usual-btn" @click="dialogTableVisible = true">添加</span>
    </div>
    <el-dialog title="添加图表" :visible.sync="dialogTableVisible">
      <div class="content-clock">
        <div class="choseWhichOneChart">
          <span class="describe">选择图表:</span>
          <el-select
            v-model="choseCWhichOne"
            placeholder="请选择图表"
            class="selectInfo"
            @change="seleChart"
            size="mini"
          >
            <el-option
              v-for="Choseitem in choseCharts"
              :key="Choseitem.value"
              :label="Choseitem.label"
              :value="Choseitem.value"
            >
            </el-option>
          </el-select>
          <div class="showCharts">
            <img
              v-for="(whichOneChartsItem, whichOneChartsIndex) in imgArr"
              :key="'imgArr' + whichOneChartsIndex"
              :src="whichOneChartsItem.imgSrc"
              :class="{ clickChart: whichOneChartsIndex === clickChart }"
              @click="clickChoseChart(whichOneChartsItem, whichOneChartsIndex)"
            />
          </div>
        </div>
        <div class="chartcolo">
          <selectColor
            :chartType="choseCWhichOne"
            :definiteChartType="selectChartType"
            v-on:changeColor="changeColo"
          ></selectColor>
        </div>
        <div class="chartTie">
          <span class="describe">图表名称:</span>
          <el-input
            v-model="chartTie"
            placeholder="请输入图表名称"
            class="selectInfo pintcharname"
            size="mini"
          ></el-input>
        </div>
        <div class="chartChoseHW">
          <span class="describe">宽:</span>
          <el-select
            v-model="wChoseWhichOne"
            placeholder="请选择宽度"
            class="selectInfo"
            size="mini"
          >
            <el-option
              v-for="wItem in chartChoseW"
              :key="wItem.value"
              :label="wItem.label"
              :value="wItem.value"
            >
              <span style="float: left">{{ wItem.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                wItem.value
              }}</span>
            </el-option>
          </el-select>
        </div>
        <div class="chartChoseHW">
          <span class="describe">高:</span>
          <el-select
            v-model="HChoseWhichOne"
            placeholder="请选择高度"
            class="selectInfo"
            size="mini"
          >
            <el-option
              v-for="HItem in chartChoseH"
              :key="HItem.value"
              :label="HItem.label"
              :value="HItem.value"
            >
              <span style="float: left">{{ HItem.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                HItem.value
              }}</span>
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="bottom-btns">
        <span class="usual-btn">高级选项</span>
        <span class="usual-btn" @click="getChartInfo">确定</span>
        <span class="usual-btn" @click="dialogTableVisible = false">取消</span>
      </div>
    </el-dialog>
    <LineSimple :addEcharts="addEcharts" ref="lineChartsFunc" :disab="disabled">
    </LineSimple>
  </div>
</template>

<script>
import * as seleData from "./dataInfor.js";
import selectColor from "./selectColor";
import LineSimple from "./LineSimple.vue";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      addEcharts: [],
      disabled: true,
      disab: true,
      isCollapse: true,
      dialogTableVisible: false,
      clickChart: -1,
      choseCharts: seleData.default.choseCharts,
      choseCWhichOne: "", //选择图表
      selectChartType: "", //详细图表
      chartTie: "", //图表名称
      imgArr: [],
      chartChoseW: seleData.default.chartChoseW,
      wChoseWhichOne: "", //选择的宽度
      chartChoseH: seleData.default.chartChoseH,
      HChoseWhichOne: "", //选择的高度
      seleColor: [], //选择的颜色
      colorArr: [], //颜色重新填充
    };
  },
  watch: {
    dialogTableVisible(val) {
      if (!val) {
        this.choseCWhichOne = "";
        this.selectChartType = "";
        this.imgArr = [];
        this.wChoseWhichOne = "";
        this.HChoseWhichOne = "";
        this.clickChart = -1;
        this.chartTie = "";
      }
    },
  },
  methods: {
    selectchart(data) {
      this.addEcharts = [];
      this.addEcharts.push(data);
      this.$nextTick(() => {
        this.addEcharts = [];
      });
    },
    compileBtnFunc() {
      this.$refs.lineChartsFunc.parentInfo(false);
      this.disab = false;
      this.disabled = false;
    },
    saveBtnFunc() {
      this.$refs.lineChartsFunc.parentInfo(true);
      this.disab = true;
      this.disabled = true;
    },
    seleChart() {
      this.imgArr = [];
      for (var i = 0; i < this.choseCharts.length; i++) {
        if (this.choseCharts[i].value === this.choseCWhichOne) {
          this.imgArr = this.choseCharts[i].chartType;
        }
      }
      this.clickChart = -1;
      this.selectChartType = "";
    },
    clickChoseChart(params, index) {
      this.selectChartType = params.type;
      this.clickChart = index;
    },
    changeColo(data) {
      this.seleColor = data;
    },
    getChartInfo() {
      var doubleArr = [];
      if (
        this.choseCWhichOne === "" ||
        this.selectChartType === "" ||
        this.wChoseWhichOne === "" ||
        this.HChoseWhichOne === "" ||
        this.chartTie === "" ||
        this.seleColor.length === 0
      ) {
        this.$message.error("请检查是否有未选或未填项");
        return;
      }
      for (var i = 0; i < this.seleColor.length; i++) {
        this.colorArr.push(this.seleColor[i].colorItem);
      }

      let xData = [];
      let seriesData = [];

      if (
        this.choseCWhichOne === "line" &&
        this.selectChartType === "doubleLine"
      ) {
        (xData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]),
          (seriesData = [
            {
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              data: [220, 182, 191, 234, 290, 330, 310],
            },
          ]);
      }
      if (this.choseCWhichOne === "pie") {
        (xData = ["直接访问", "联盟广告", "视频广告", "搜索引擎"]),
          (seriesData = [
            {
              value: 335,
              name: "直接访问",
            },
            {
              value: 234,
              name: "联盟广告",
            },
            {
              value: 135,
              name: "视频广告",
            },
            {
              value: 99,
              name: "搜索引擎",
            },
          ]);
      }
      if (this.choseCWhichOne === "bar" && this.selectChartType === "rowBar") {
        (xData = ["Mon", "Tue", "Wed", "Thu"]),
          (seriesData = [
            {
              data: [10, 52, 200, 334],
            },
          ]);
      }
      if (
        this.choseCWhichOne === "bar" &&
        this.selectChartType === "columnBar"
      ) {
        (xData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]),
          (seriesData = [
            {
              data: [10, 52, 200, 334, 390, 330, 220],
            },
          ]);
      }
      if (this.selectChartType === "doubleLine") {
        for (var j = 0; j < seriesData.length; j++) {
          for (var x = 0; x < this.colorArr.length; x++) {
            if (j === x) {
              doubleArr.push({
                data: seriesData[j].data,
                color: this.colorArr[x],
              });
            }
          }
        }
        seriesData = doubleArr;
      } else {
        seriesData = seriesData;
      }
      const text = new Date().getTime()
      var inserInfo = {
        chartClass:
          this.HChoseWhichOne + " " + this.wChoseWhichOne + " " + "chartMain" + text,
        chartType: this.choseCWhichOne,
        chartDetailType: this.selectChartType,
        chartTit: this.chartTie,
        text: text,
        chartMainClass: ".chartMain" + text,
        xData: xData,
        chartColor: this.colorArr,
        seriesData: seriesData,
      };
      this.$nextTick(() => {
        this.selectchart(inserInfo);
        this.dialogTableVisible = false;
        this.colorArr = [];
        this.$message({
          message: "添加成功",
          type: "success",
        });
      });
    },
  },
  components: {
    draggable,
    LineSimple,
    selectColor,
  },
};
</script>
<style lang="scss">
.multiComps {
  .color-item {
    border: 1px solid #f1f1f1;
    padding: 10px 5px;
    margin: 5px 0;
    border-radius: 4px;
  }
  height: 100%;
  width: 100%;
  .funcBtn {
    height: 6.5vh;
    padding-top: 0.5vh;
    width: 100%;
    text-align: right;
  }
  .echart1Box,
  .echart2Box,
  .echart3Box {
    height: 100%;
    background: #f0f;
    .chartmain {
      position: relative;
      display: inline-block;
      margin-bottom: 1vh;
      border-radius: 2px 2px 2px 2px;
      box-shadow: 1px 2px 5px #ccc;
      border: 1px solid #ddd;
      min-height: 29vh;
      width: 24vw;
      margin-right: 0.5vw;
    }
  }
  .echart2Box {
    background: #ff0;
  }
  .echart3Box {
    min-height: 38.5vh;
    background: #0ff;
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
  .itemclass {
    background: red;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 400px;
  }
  .el-select, .el-input{
    width: 300px;
  }
  .chartChoseHW,
  .chartTie,
  .chartcolo,
  .choseWhichOneChart,
  .editName {
    text-align: left;
    margin-bottom: 1.5vh;
    position: relative;
    .describe {
      display: inline-block;
      padding-left: 30px;
      width: 100px;
      text-align: center;
    }
    .selectInfo {
      margin-left: 2vw;
    }
    .coloTit {
      margin-right: 2vw;
    }
    .selectcolor {
      display: inline-block;
      margin-right: 1vw;
    }
    .notice {
      font-size: 1.8vh;
      color: #aaa;
      padding-left: 1vw;
    }
  }
  .showCharts {
    width: 100%;
    margin-top: 1vh;
    img {
      height: 20vh;
      display: inline-block;
      cursor: pointer;
      margin-left: 1vw;
      border: 1px solid #fff;
      &:first-child{
        margin-left: calc(2vw + 105px);
      }
    }
    .clickChart {
      border: 1px solid #b3d8ff;
    }
  }
}
</style>
