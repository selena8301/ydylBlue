<template>
  <div class="dynamic-tracing">
    <el-tabs type="border-card" v-model="currentTabs">
      <el-tab-pane>
        <span slot="label">全球情况</span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">BRI进展</span>
        <div class="list-box">
          <div class="row" v-for="(item, index) in listData" :key="index">
            <span class="name" @click="openDetail(item)">{{ item.name }}</span>
            <span class="text" @click="openDetail(item)">{{ item.text }}</span>
            <span class="date">{{ item.date }}</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">安全事件</span>
        <div class="list-box">
          <div class="row" v-for="(item, index) in listData1" :key="index">
            <span class="name">{{ item.name }}</span>
            <span class="text">{{ item.text }}</span>
            <span class="date">{{ item.date }}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-drawer
      :title="detailData.name"
      :visible.sync="showDetail"
      direction="rtl"
      :before-close="handleClose"
    >
      <div class="content">
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-drawer>
    <Map v-show="currentTabs == 0" style="height: calc(100% - 70px); width: calc(100% - 32px);position:absolute;top:55px;left:16px"/>
  </div>
</template>

<script>
import Map from '../mapComponents/Map.vue'
export default {
  name: "dynamic-tracing",
  components: {
    Map
  },
  data() {
    return {
      currentTabs: 0,
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
      listData1: [
        {
          name: "刚果（金）沉船事故",
          text: "2月14日夜间，一艘客船从刚果（金）首都金沙萨前往赤道省的行驶途中，由于货物及人员超载、夜间航行等多重原因，在马伊恩东贝省境内的刚果河流域发生了沉船事故。据2月17日上午报道，事故遇难人数为76人、300多人失踪。10月5日深夜，刚果（金）又发生一起沉船事故，造成51人死亡、70多人失踪。",
          date: "2021-02-14",
        },
        {
          name: "塞拉利昂油罐车爆炸事故",
          text: "11月5日晚，塞拉利昂首都弗里敦东部一辆油罐车在高速公路上与一辆载有花岗岩的卡车相撞发生漏油，引发附近居民哄抢石油。在哄抢过程中，现场发生爆炸并引发大火，导致115人死亡、多人受伤（有报道称144人死亡）。这是一起由交通事故引发的次生危化品爆炸事故",
          date: "2021-11-05",
        },
        {
          name: "美国迈阿密公寓倒塌事故",
          text: "6月24日凌晨，美国佛罗里达州迈阿密—戴德县瑟夫赛德镇发生一起住宅楼局部倒塌事故，房屋安全维护不及时和设计因素是发生倒塌的主要原因。事故楼房共有12层136套住房，其中55套在倒塌中损毁。7月23日，当地消防救援部门宣布结束对遇难者遗体的搜寻行动，事件最终导致98人遇难。",
          date: "2021-06-24",
        },
        {
          name: "伊拉克医院氧气罐爆炸事故",
          text: "7月12日，伊拉克南部济加尔省的侯赛因教学医院由于新冠患者病房内的氧气罐爆炸引发大火，造成92人死亡、50人受伤。接线故障产生的火花蔓延到氧气罐引起爆炸，而且事发建筑缺少基本的消防措施，导致灭火不及时。4月24日，伊拉克首都巴格达东南部的伊本•哈提布医院因氧气罐爆炸引发火灾事故，造成82人死亡、上百人受伤。",
          date: "2021-07-12",
        },
        {
          name: "海地油罐车爆炸事故",
          text: "12月13日晚，海地第二大城市海地角一行驶油罐车为避让一辆摩托车在转向时失控翻倒。事故发生后，附近居民不顾司机警告冲向油罐车用各种容器收集溢出的汽油，随后车辆发生爆炸造成90人死亡、数十人受伤，周边房屋、车辆损毁严重。",
          date: "2021-12-13",
        },
        {
          name: "巴基斯坦列车相撞事故",
          text: "6月7日，巴基斯坦两列客运列车由于铁路轨道和信号系统出现故障，发生相撞事故，造成65人死亡、逾百人受伤。据悉，事故发生前该条线路上已有列车发生脱轨事故，由于事发时间为早上，先前涉险列车乘客未能及时下车，该列车与后方列车相撞，造成了严重的事故后果。",
          date: "2021-06-07",
        },
        {
          name: "印尼客机航空事故",
          text: "1月9日下午2时左右，印尼一架由雅加达飞往加里曼丹岛坤甸市的斯里维加亚航空公司飞机坠毁（航班代码SJY182），造成机上62人全部遇难。遇难飞机为波音737-500机型，是波音公司生产的双发（动机）中短程运输机，事故直接原因是自动油门故障。",
          date: "2021-01-09",
        },
      ],
      showDetail: false,
      detailData: {},
      reverse: true,
      activities: [
        {
          content: "接受任务，具体任务分发，领受",
          timestamp: "2021-04-15",
        },
        {
          content: "根据计划下发任务",
          timestamp: "2021-04-15",
        },
        {
          content: "新建计划",
          timestamp: "2021-04-15",
        },
        {
          content: "项目前期筹备工作完成，按期开始",
          timestamp: "2021-04-15",
        },
        {
          content: "通过审核",
          timestamp: "2021-04-13",
        },
        {
          content: "项目提交评审",
          timestamp: "2021-04-13",
        },
        {
          content: "项目创建，双方签约成功",
          timestamp: "2021-04-11",
        },
        {
          content: "项目预案，确认需求",
          timestamp: "2021-04-11",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    handleClose(done) {
      done();
    },
    openDetail(item) {
      this.detailData = item;
      this.showDetail = true;
    },
  },
};
</script>
<style scoped lang="scss">
.dynamic-tracing {
  height: calc(100% - 80px);
  width: 100%;
  padding: 10px;
  .content{
      padding: 0 50px;
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
  .el-drawer{
      width: 200px!important;
  }
}
</style>