<template>
  <div class="mapTableDiv" v-show="mapTableShow">
    <div class="mapTable">
      <el-table
        :data="tableData"
        @row-click="rowClick"
        stripe
        @selection-change="selectionChange"
        height="500"
        style="width: 100%"
      >
        <el-table-column show-overflow-tooltip type="selection" width="55"> </el-table-column>
        <el-table-column show-overflow-tooltip label="国旗"  width="60">
          <template slot-scope="scope">
            <img style="width: 24px; height: 12px" :src="scope.row.image" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="name" label="国家名称"  width="100"> </el-table-column>
        <el-table-column show-overflow-tooltip label="国家风险等级" width="auto">
          <template slot-scope="scope">
            <el-progress
              :show-text="false"
              :stroke-width="15"
              :percentage="Number(scope.row.value)"
              :status="getStatus(scope.row.value)"
            ></el-progress>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "mapTable",
  data() {
    return {
      tableData: tb_data_country,
      mapTableShow: true,
    };
  },
  methods: {
    getStatus(value) {
      if (value <= 25) {
        return "exception";
      } else if (25 < value && value <= 50) {
        return "warning";
      } else if (50 < value && value <= 75) {
        return "success";
      } else {
        return;
      }
    },
    rowClick(row, column) {
      console.log(row, column);
      this.$emit("row", row);
    },
    selectionChange(selection) {
      let gmiArr = selection.map((e) => {
        return e.GMI;
      });
      console.log(gmiArr);
    },
  },
  created() {},
  mounted() {
    var dv = document.querySelector(".mapTableDiv");
    var x = 0;
    var y = 0;
    var l = 0;
    var t = 0;
    var isDown = false;
    dv.onmousedown = function (e) {
      x = e.clientX;
      y = e.clientY;
      l = dv.offsetLeft;
      t = dv.offsetTop;
      isDown = true;
      dv.style.cursor = "move";
    };
    dv.onmousemove = function (e) {
      if (isDown == false) {
        return;
      }
      var nx = e.clientX;
      var ny = e.clientY;
      var nl = nx - (x - l);
      var nt = ny - (y - t);
      dv.style.left = nl + "px";
      dv.style.top = nt + "px";
    };
    dv.onmouseup = function () {
      isDown = false;
      dv.style.cursor = "default";
    };
  },
};
</script>

<style lang="scss">
.mapTableDiv {
  position: fixed;
  top: 120px;
  right: 15px;
  width: 25%;
  z-index: 9;
  height: calc(100% - 160px);
  overflow: hidden;
  // padding: 20px 10px;
  // background: url("../../assets/image/ts/bg_right.png") no-repeat;
  // background-size: 100% 100%;
  background: #e9e9e9;
  .mapTable {
    height: 100%;
    overflow: hidden;
    background: #fff;
    // border: 1px solid rgba(0,240,255,0.2);
    border:1px solid #bbbcbdf5;
    .el-table{
        font-size: 12px!important;
    }
    .el-table td, .el-table th{
        padding: 5px 0;
    }
    .el-table thead{
        // background: rgba(0,240,255,0.2)!important;
        background: #b6d7efb8 !important;
        color: #919293!important;
        font-size: 12px;
    }
    .el-table--striped .el-table__body tr.el-table__row--striped td{
        background-color: rgba(0,240,255,0.1)!important;
        background: rgba(0,240,255,0.1)!important;
    }
  }
}
</style>
