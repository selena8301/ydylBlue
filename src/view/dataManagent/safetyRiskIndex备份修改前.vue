<template>
  <div class="safetyRiskIndex">
    <el-tabs v-model="currentTab" type="border-card" @tab-click="tabClick">
      <el-tab-pane>
        <span slot="label">一带</span>
        <div class="mapTable">
          <el-table :data="tableData" stripe height="500" style="width: 100%">
            <el-table-column show-overflow-tooltip type="selection" width="55"> </el-table-column>
            <el-table-column show-overflow-tooltip label="国旗" width="60">
              <template slot-scope="scope">
                <img style="width: 24px; height: 12px" :src="scope.row.image" />
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="国家名称" width="100">
            </el-table-column>
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
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">一路</span>
        <div class="mapTable">
          <el-table :data="tableData" stripe height="500" style="width: 100%">
            <el-table-column show-overflow-tooltip type="selection" width="55"> </el-table-column>
            <el-table-column show-overflow-tooltip label="国旗" width="60">
              <template slot-scope="scope">
                <img style="width: 24px; height: 12px" :src="scope.row.image" />
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="国家名称" width="100">
            </el-table-column>
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
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">全部国家</span>
        <div class="mapTable">
          <el-table :data="tableData" stripe height="500" style="width: 100%">
            <el-table-column show-overflow-tooltip type="selection" width="55"> </el-table-column>
            <el-table-column show-overflow-tooltip label="国旗" width="60">
              <template slot-scope="scope">
                <img style="width: 24px; height: 12px" :src="scope.row.image" />
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="国家名称" width="100">
            </el-table-column>
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
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">大国博弈</span>
        <div class="big-country">
          <div class="big-country-box">
            <div class="title">
              中美博弈
              <span class="title-level2"
                >The game between China and America</span
              >
            </div>
            <div class="content-box">
                <div class="list-box">
                    <div class="row" v-for="(item, index) in listData.slice(0, 5)" :key="index">
                        <span class="name" @click="openDetail(item)">{{ item.name }}</span>
                        <span class="text" @click="openDetail(item)">{{ item.text }}</span>
                        <span class="date">{{ item.date }}</span>
                    </div>
                </div>
            </div>
          </div>
          <!-- <div class="big-country-box">
            <div class="title">
              中俄博弈
              <span class="title-level2"
                >The game between China and Russia</span
              >
            </div>
            <div class="content-box">
                <div class="list-box">
                    <div class="row" v-for="(item, index) in listData.slice(3, 7)" :key="index">
                        <span class="name" @click="openDetail(item)">{{ item.name }}</span>
                        <span class="text" @click="openDetail(item)">{{ item.text }}</span>
                        <span class="date">{{ item.date }}</span>
                    </div>
                </div>
            </div>
          </div>
          <div class="big-country-box">
            <div class="title">
              中日博弈
              <span class="title-level2">The game between China and Japan</span>
            </div>
            <div class="content-box">
                <div class="list-box">
                    <div class="row" v-for="(item, index) in listData.slice(2, 5)" :key="index">
                        <span class="name" @click="openDetail(item)">{{ item.name }}</span>
                        <span class="text" @click="openDetail(item)">{{ item.text }}</span>
                        <span class="date">{{ item.date }}</span>
                    </div>
                </div>
            </div>
          </div> -->
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">恐怖主义</span>
        <div class="list-box">
          <div class="row" v-for="(item, index) in listData" :key="index">
            <span class="name" @click="openDetail(item)">{{ item.name }}</span>
            <span class="text" @click="openDetail(item)">{{ item.text }}</span>
            <span class="date">{{ item.date }}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {},
  name: "mapTable",
  data() {
    return {
      tableData: tb_data_country_yd,
      currentTab: "0",
      listData: [
        {
          name: "雅万高铁成功铺设首块无砟轨道板",
          text: "印度尼西亚雅加达至万隆高速铁路CRTSⅢ型无砟轨道板首铺仪式29日在2号特大桥DK32举行，这标志着雅万高铁工程建设正式进入无砟轨道铺设阶段。",
          date: "2022-01-05 15:43:25",
        },
        {
          name: "中企承建的柬埔寨国防部办公楼正式投入使用",
          text: "柬埔寨国防部办公楼项目29日正式交接投入使用，项目由中国铁建旗下的中铁城建集团承建。",
          date: "2022-01-05 15:43:25",
        },
        {
          name: "通讯：中老铁路投运“满月” 客货运输红利初显",
          text: "1月3日，连接中国昆明和老挝首都万象的中老铁路全线开通运营“满月”。一个月来，中老铁路客运服务极大方便了当地人员交通出行，货运则为促进双边经贸往来提供便利。客货两旺，中老铁路客货运输红利初显。",
          date: "2022-01-05 15:43:25",
        },
        {
          name: "中巴经济走廊项目27名优秀巴基斯坦员工获奖",
          text: "中巴经济走廊项目优秀巴基斯坦员工颁奖仪式29日在巴首都伊斯兰堡举行，来自瓜达尔港、能源、基础设施建设、产业合作等领域项目的27名巴方员工获奖。",
          date: "2022-01-05 15:43:25",
        },
        {
          name: "中国援柬中柬友谊医疗大楼项目竣工验收",
          text: "中柬友谊医疗大楼项目位于柬埔寨首都金边市中心，是一座以外科为主包括门诊、急诊、医技及住院、后勤等功能在内的400床位综合教学医院医疗大楼，项目于2018年10月开工建设，建设用地面积约1.5万平方米，总建筑面积3.3万平方米。",
          date: "2022-01-05 15:43:25",
        },
        {
          name: "通讯：一座从海上崛起的“未来之城”",
          text: "斯里兰卡是古代海上丝绸之路的重要一站，曾有无数载着中国香料和茶叶的船只在这里停靠，之后再驶向欧洲进行交易。眼下，这里兴建的是中国港湾和斯里兰卡政府合作开展的大型投资项目科伦坡港口城，被称为两国共建“一带一路”的合作典范。",
          date: "2022-01-05 15:43:25",
        },
        {
          name: "地方参与共建“一带一路”实践之一：上海积极推进“一带一路”桥头堡建设",
          text: "上海市立足城市功能优势，高举和平发展、合作共赢旗帜，积极参与共建“一带一路”，务实推进国际交流合作，在“五通”领域取得丰硕成果。",
          date: "2022-01-05 15:43:25",
        },
      ],
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
    tabClick(tab) {
      if (this.currentTab === "1") {
        this.tableData = tb_data_country_yl;
      } else if (this.currentTab === "2") {
        this.tableData = tb_data_country;
      } else if (this.currentTab === "0") {
        this.tableData = tb_data_country_yd;
      }
    },
  },
};
</script>

<style lang="scss">
.safetyRiskIndex {
  height: calc(100% - 70px);
  width: 100%;
  overflow: hidden;
  padding: 10px 10px 0;
  background: #e9e9e9 !important;
  .big-country {
    overflow: auto;
    height: 100%;
    .big-country-box {
      min-height: 33%;
      .title {
        font-size: 16px;
        color: #000;
        font-weight: bold;
        padding-top: 15px;
        padding-left: 60px;
        position: relative;
        .title-level2 {
          font-size: 12px;
          margin-left: 15px;
          color: #aaa;
        }
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
          height: calc(100% - 30px);
          flex: 1;
          // background: #0f2647;
          margin-left: 15px;
          border-radius: 10px;
          color: #fff;
          .content {
            opacity: 0.9;
            padding: 12%;
            height: 100%;
            width: 100%;
            background: url("../../assets/image/pics/pic.png") no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
            > span {
              display: block;
              width: 100%;
              text-align: right;
              height: 2rem;
            }
            .name {
              color: #00f0ff;
              font-size: 1.3rem;
              text-shadow: -2px -2px 1px #000;
            }
            .englishName {
              color: #86d7ff;
              text-shadow: -1px -2px 1px #111;
            }
            &:hover {
              animation: all 0.5s ease-in;
              padding: 10%;
              background: url("../../assets/image/pics/pic.png") no-repeat;
              background-size: 100% 100%;
              opacity: 1;
              .name {
                font-size: 1.5rem;
                height: 2.5rem;
              }
            }
          }
        }
      }
    }
  }
  .list-box {
    padding: 20px;
    height: 100%;
    overflow: auto;
    .row {
      line-height: 30px;
      padding: 20px 40px;
      &:nth-child(odd) {
        background: #eff9fd;
        position: relative;
        &:before {
          content: "";
          height: 100%;
          width: 2px;
          position: absolute;
          top: 0;
          left: 0;
          background: #7cd6fa;
        }
      }
      > span {
        display: inline-block;
      }
      .name {
        display: block;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
      }
      .text {
        color: #333;
        width: calc(100% - 300px);
        cursor: pointer;
      }
      .date {
        color: #777;
        width: 200px;
        text-align: right;
      }
    }
  }
  .mapTable {
    height: 100%;
    overflow: hidden;
    background: #fff;
    // border: 1px solid rgba(0,240,255,0.2);
    border: 1px solid #bbbcbdf5;
    .el-table {
      font-size: 12px !important;
    }
    .el-table td,
    .el-table th {
      padding: 5px 0;
    }
    .el-table thead {
      // background: rgba(0,240,255,0.2)!important;
      background: #b6d7efb8 !important;
      color: #919293 !important;
      font-size: 12px;
    }
    .el-table--striped .el-table__body tr.el-table__row--striped td {
      background-color: rgba(0, 240, 255, 0.1) !important;
      background: rgba(0, 240, 255, 0.1) !important;
    }
  }
}
</style>
