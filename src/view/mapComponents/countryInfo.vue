<template>
  <div class="countryInfo" v-show="countryShow">
    <div class="title">
      <span style="height: 40px; line-height: 40px">国家概况： {{ countryName }}</span>
      <span
        @click="countryShow = false"
        style="
          height: 40px;
          line-height: 40px;
          float: right;
          margin-right: 15px;
          cursor: pointer;
        "
        >X</span
      >
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="政治" name="first">
        <div v-if="countryGMI == 'CHN'">
          中华人民共和国（the People's Republic of
          China），简称“中国”，成立于1949年10月1日 [1]
          ，位于亚洲东部，太平洋西岸 [2]
          ，是工人阶级领导的、以工农联盟为基础的人民民主专政的社会主义国家 [3]
          ，以五星红旗为国旗 [4] 、《义勇军进行曲》为国歌 [5]
          ，国徽内容为国旗、天安门、齿轮和麦稻穗 [6]
          ，通用语言文字是普通话和规范汉字 [7] ，首都北京 [8]
          ，是一个以汉族为主体、56个民族共同组成的统一的多民族国家。
          中国陆地面积约960万平方千米，东部和南部大陆海岸线1.8万多千米，内海和边海的水域面积约470多万平方千米。海域分布有大小岛屿7600多个，其中台湾岛最大，面积35798平方千米
          [2]
          。中国同14国接壤，与8国海上相邻。省级行政区划为23个省、5个自治区、4个直辖市、2个特别行政区。
          [2]
          中国是世界上历史最悠久的国家之一，有着光辉灿烂的文化和光荣的革命传统
          [3] ，世界遗产数量全球领先 [9]
          。1949年新中国成立后，进入社会主义革命和建设时期，1956年实现向社会主义过渡，此后社会主义建设在探索中曲折发展
          [10]
          。“文化大革命”结束后实行改革开放，沿着中国特色社会主义道路，集中力量进行社会主义现代化建设
          [3] 。经过长期努力，中国特色社会主义进入了新时代。 [11]
          中国是世界上人口最多的发展中国家，国土面积居世界第三位，是世界第二大经济体，并持续成为世界经济增长最大的贡献者，2020年经济总量突破100万亿元
          [12-13] [128]
          。中国坚持独立自主的和平外交政策，是联合国安全理事会常任理事国，也是许多国际组织的重要成员，被认为是潜在超级大国之一。
        </div>
        <div v-if="countryGMI == 'MNG'">
          蒙古国（蒙古语：Монголулс，英语：Mongolia），简称蒙古，位于中国和俄罗斯之间，是被两国包围的一个内陆国家。首都及全国最大城市为乌兰巴托。主体民族为喀尔喀蒙古族，约占全国人口的80%，此外还有哈萨克族等少数民族。官方语言为蒙古语。居民主要信奉藏传佛教。
          [1]
          蒙古历史上曾被匈奴、鲜卑、柔然、突厥、契丹等多个游牧民族统治。1206年成吉思汗建立大蒙古国。1271年他的孙子忽必烈建立元朝，灭亡后蒙古人退回蒙古草原，但经常在边境与明朝发生冲突。
          [2]
          16到17世纪起蒙古开始受到藏传佛教影响，17世纪末时蒙古全境被纳入清朝统治范围。
          [2]
          1911年清朝灭亡后，蒙古宣布独立，但未得到国际承认，直到1921年在苏俄的控制下独立，1961年加入联合国开始取得国际社会的认可。
          [2]
          1924年成立的蒙古人民共和国处于苏联势力范围之下，东欧剧变后，蒙古爆发民主革命，并于1992年颁布了一个实行多党制的新宪法，开始向市场经济过渡。
          [2] 蒙古国土面积为156.65万平方千米
          ，是世界上国土面积第19大的国家，也是仅次于哈萨克斯坦的世界第二大内陆国家。
          [2]
          人口约300万人，是世界上人口密度最低的国家。蒙古国可耕地较少，大部分国土被草原覆盖。北部和西部多山脉，南部为戈壁沙漠。约30%的人口从事游牧或半游牧
        </div>
        <div v-if="countryGMI == 'SGP'">
          新加坡共和国（英语：Republic of
          Singapore），简称新加坡，旧称新嘉坡、星洲或星岛，别称为狮城，是东南亚的一个岛国，政治体制实行议会制共和制。
          新加坡北隔柔佛海峡与马来西亚为邻，南隔新加坡海峡与印度尼西亚相望，毗邻马六甲海峡南口，国土除新加坡岛（占全国面积的88.5%）之外，还包括周围63个小岛。
          [1]
          8世纪属室利佛逝；14世纪始属于拜里米苏拉建立的马六甲王朝；18-19世纪属柔佛王国。19世纪初沦为英国殖民地；1942年2月15日，新加坡被日本占领；1963年加入马来西亚；1965年8月9日，马来西亚国会将新加坡驱逐出联邦。隔日，新加坡独立建国，新加坡共和国正式成立。
          [1]
          新加坡是一个发达的资本主义国家，被誉为“亚洲四小龙”之一，同时凭借着地理优势，成为亚洲重要的金融、服务和航运中心之一。其经济模式被称作为“国家资本主义”。根据2018年的全球金融中心指数（GFCI）排名报告，新加坡是继伦敦、纽约、香港之后的第四大国际金融中心
          [2] 。被GaWC评为世界一线城市 [3]
          。新加坡是东南亚国家联盟（ASEAN）成员国之一，也是世界贸易组织（WTO）、英联邦（The
          Commonwealth）以及亚洲太平洋经济合作组织（APEC）成员经济体之一。 [1]
          [4-5] 整个城市在绿化和环境卫生方面效果显著，故有花园城市之美称。
        </div>
        <div v-if="countryGMI == 'MYS'">
          马来西亚（马来语、英语：Malaysia），简称大马，是君主立宪联邦制国家，首都吉隆坡，联邦政府行政中心布城。全国分为13个州和3个联邦直辖区，全国面积共33万平方公里
          [1]
          。马来西亚位于东南亚，国土被南中国海分隔成东、西两部分，即马来半岛（西马）和加里曼丹岛北部（东马）。马来西亚人口3268万，
          [1] 其中马来人69.1%，华人23%。 [1]
          公元初，马来半岛有羯荼、狼牙修等古国。 [1]
          15世纪初以马六甲为中心的满剌加王国统一了马来半岛的大部分。 [1]
          16世纪开始先后被葡萄牙、荷兰、英国占领。 [1]
          20世纪初完全沦为英国殖民地。加里曼丹岛沙捞越、沙巴历史上属文莱，1888年两地沦为英国保护地。
          [1]
          二战中，马来半岛、沙捞越、沙巴被日本占领。战后英国恢复殖民统治。1957年8月31日马来亚联合邦宣布独立。
          [1]
          1963年9月16日，马来亚联合邦同新加坡、沙捞越、沙巴合并组成马来西亚（1965年8月9日新加坡退出）。
          [1]
          马来西亚是个多民族、多元文化国家，官方宗教为伊斯兰教。马来西亚是资本主义国家，其经济在20世纪90年代突飞猛进，为亚洲四小虎之一，已成为亚洲地区引人注目的多元化新兴工业国家和世界新兴市场经济体。国家实施马来族和原住民优先的新经济政策
          [1] 。 2021年3月，朝鲜宣布与马来西亚断交。
        </div>
        <div v-else>
          印度共和国（印地语：भारत गणराज्य，英语：The Republic of
          India，India），简称“印度”，位于南亚，是南亚次大陆最大的国家。东北部同孟加拉国、尼泊尔、不丹和中国接壤，
          [1]
          东部与缅甸为邻，东南与斯里兰卡隔海相望，西北与巴基斯坦交界。东临孟加拉湾，西濒阿拉伯海，海岸线长5560公里。也是一个由100多个民族构成的统一多民族国家，主体民族为印度斯坦族，约占全国总人口的46.3%。
          [2] 古印度是四大文明古国之一，公元前2500年诞生了印度河文明。 [1]
          前1500年左右，中亚的雅利安人进入南亚次大陆，征服当地古印度人，建立了一些奴隶制小国，
          [1]
          并确立种姓制度，吠陀教开始发展为婆罗门教。公元前4世纪，孔雀王朝统一印度，开始推行佛教，并向外传播。约前188年，孔雀帝国灭亡后群雄割据、外族入侵，印度教和伊斯兰教兴起。1600年英国侵入莫卧儿帝国，建立东印度公司，1757年以后逐步沦为英国殖民地。1947年6月，英国颁布《蒙巴顿方案》，实行印巴分治。
          [1]
          同年8月15日成立印度自治领。1950年1月26日宣布成立共和国，同时成为英联邦成员国。
          [1] 印度是世界第二人口大国
          ，也是金砖国家之一，印度经济产业多元化，涵盖农业、手工艺、纺织以至服务业。近年来服务业增长迅速，已成为全球软件、金融等服务业最重要出口国。全球最大的非专利药出口国，侨汇世界第一。
          当地时间2020年6月17日，联合国大会举行投票，选举印度成为2021年至2022年安全理事会非常任理事国。
        </div>
      </el-tab-pane>
      <el-tab-pane label="经济" name="second">
        中国是世界第二大经济体、世界第一大工业国和世界第一大农业国。
        2019年11月22日，国家统计局对2018年GDP初步核算数进行了修订。主要结果为：2018年GDP为919281亿元，比初步核算数增加18972亿元，增幅为2.1%。
        [13] [82]
        2020年12月30日，经最终核实，2019年GDP现价总量为986515亿元，比初步核算数减少了4350亿元；按不变价格计算，比上年增长6.0%，比初步核算数下降0.1个百分点。
        [17]
        2021年2月28日，国家统计局公布数据，经初步核算，2020年全年国内生产总值（GDP）1015986亿元，比上年增长2.3%。其中，第一产业增加值77754亿元，增长3.0%；第二产业增加值384255亿元，增长2.6%；第三产业增加值553977亿元，增长2.1%。第一产业增加值占国内生产总值比重为7.7%，第二产业增加值比重为37.8%，第三产业增加值比重为54.5%。全年最终消费支出拉动国内生产总值下降0.5个百分点，资本形成总额拉动国内生产总值增长2.2个百分点，货物和服务净出口拉动国内生产总值增长0.7个百分点。分季度看，一季度国内生产总值同比下降6.8%，二季度增长3.2%，三季度增长4.9%，四季度增长6.5%。预计全年人均国内生产总值72447元，比上年增长2.0%。国民总收入1009151亿元，比上年增长1.9%。全国万元国内生产总值能耗比上年下降0.1%。预计全员劳动生产率为117746元/人，比上年提高2.5%。
      </el-tab-pane>
      <el-tab-pane label="人口" name="third">
        根据统计法和《全国人口普查条例》，我国以2020年11月1日零时为标准时点开展了第七次全国人口普查，主要目的是全面查清我国人口数量、结构、分布等方面情况，为完善我国人口发展战略和政策体系、制定经济社会发展规划、推动高质量发展提供准确统计信息支持。
        [132] 人口总量
        2021年5月11日上午10时，国家统计局局长宁吉喆在会上通报，全国人口共141178万人，与2010年的133972万人相比，增加了7206万人，增长5.38%；年平均增长率为0.53%，比2000年到2010年的年平均增长率0.57%下降0.04个百分点。数据表明，我国人口10年来继续保持低速增长态势。全国人口中，男性人口为723339956人，占51.24%；女性人口为688438768人，占48.76%。总人口性别比为105.07。
        [65-66]
        注：全国人口是指我国大陆31个省、自治区、直辖市和现役军人的人口，不包括居住在31个省、自治区、直辖市的港澳台居民和外籍人员。
        [132] 民族概况
        中国官方承认的民族有56个，包括蒙古族、回族、藏族、维吾尔族、苗族、彝族、壮族、布依族、朝鲜族、满族、侗族、瑶族、白族、土家族、哈尼族、哈萨克族、傣族、黎族、傈僳族、佤族、畲族、高山族、拉祜族、水族、东乡族、纳西族、景颇族、柯尔克孜族、土族、达斡尔族、仫佬族、羌族、布朗族、撒拉族、毛南族、仡佬族、锡伯族、阿昌族、普米族、塔吉克族、怒族、乌孜别克族、俄罗斯族、鄂温克族、德昂族、保安族、裕固族、京族、塔塔尔族、独龙族、鄂伦春族、赫哲族、门巴族、珞巴族、基诺族和汉族。
        [67]
        在中华民族大家庭中，汉族人口最多，约占全国总人口的90%以上。其他55个民族人口较少，称为少数民族。
        2021年5月11日发布的第七次全国人口普查结果显示，汉族人口为128631万人，占91.11%，各少数民族人口为12547万人，占8.89%。与2010年相比，汉族人口增长4.93%，各少数民族人口增长10.26%，少数民族人口比重上升0.40个百分点。
      </el-tab-pane>
      <el-tab-pane label="教育" name="fourth">
        全国共有各级各类学校253.0万所，比上年增加1.1万所。全国各级各类学历教育在校生2.82亿人，比上年增加660.6万人，增长2.4%；全国各级各类学校专任教师1732.0万人，比上年增加59.2万人，增长3.5%。
        　　全国各级各类学校共拥有校舍建筑面积337.4亿平方米，比上年增加1.6亿平方米，增长4.6%。全国各级各类学校教学、科研仪器设备资产总值为11211.1亿元，比上年增加992.9亿元，增长9.7%。
        　　二、义务教育
        　　适应新型城镇化发展需要，各级政府贯彻落实《国务院关于统筹推进县域内城乡义务教育一体化改革发展的若干意见》要求，不断加强城镇教育资源配置，扩大城镇学校学位供给，缩小县域内城乡教育差距，义务教育阶段城市学校数和在校生规模得到较快增长。
      </el-tab-pane>
      <el-tab-pane label="军事" name="fifth">
        中华人民共和国成立以来，以毛泽东、邓小平、江泽民、胡锦涛同志为核心的党的四代中央领导集体和以习近平同志为核心的党中央，准确把握国际国内全局和发展大势，科学确立国防战略，适时作出一系列重大决策部署，不断赋予军队新的职能使命，推动着中国国防和军队建设事业阔步向前。
        中国奉行防御性的国防政策。中国把捍卫国家主权、安全、领土完整，保障国家发展利益和保护人民利益放在高于一切的位置，努力建设与国家安全和发展利益相适应的巩固国防和强大军队，在全面建设小康社会进程中实现富国和强军的统一。
        新时期中国国防的目标和任务：维护国家主权、安全、发展利益；维护社会和谐稳定；推进国防和军队现代化；维护世界和平稳定。
        根据国家安全需求和经济社会发展水平，中国实施国防和军队现代化建设“三步走”的发展战略，有计划有步骤地推进国防和军队现代化建设。这一战略构想主要包括：推进国防和军队信息化、统筹经济建设和国防建设、深化国防和军队改革、走跨越式发展的道路。
        和平时期中国武装力量的多样化运用：保卫边防、海防、空防安全，维护社会稳定，参加国家建设和抢险救灾，参加联合国维和行动，亚丁湾和索马里海域护航，中外联演联训和国际灾难救援。
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {},
  name: "countryInfo",
  data() {
    return {
      activeName: "first",
      countryName: "",
      countryGMI: "",
      countryShow: false,
    };
  },
  methods: {},
  created() {},
  mounted() {
    let dvs = document.querySelector(".countryInfo");
    let x = 0;
    let y = 0;
    let l = 0;
    let t = 0;
    let isDowns = false;
    dvs.onmousedown = function (e) {
      x = e.clientX;
      y = e.clientY;
      l = dvs.offsetLeft;
      t = dvs.offsetTop;
      isDowns = true;
      dvs.style.cursor = "move";
    };
    dvs.onmousemove = function (e) {
      if (isDowns == false) {
        return;
      }
      let nl = e.clientX - (x - l);
      let nt = e.clientY - (y - t);
      dvs.style.left = nl + "px";
      dvs.style.top = nt + "px";
    };
    dvs.onmouseup = function () {
      isDowns = false;
      dvs.style.cursor = "default";
    };
  },
};
</script>

<style lang="scss">
.countryInfo {
  position: fixed;
  top: 120px;
  right: calc(25% + 30px);
  width: 25%;
  z-index: 9;
  height: calc(100% - 160px);
  overflow: hidden;
  // padding: 20px;
 background: #e9e9e9;
  // background: url("../../assets/image/ts/bg_right.png") no-repeat;
  // background-size: 100% 100%;
  .title {
    padding: 10px 10px 0;
    // color: #abf4ff;
    // background: rgba(0, 240, 255, 0.2);
    padding-left: 20px;
    font-weight: bold;
    color:#000;
    background: #fff;
  }
  .el-tabs {
    padding: 0 10px;
    height: calc(100% - 40px);
    // background: rgba(199, 251, 255, 0.05);
    background: #f7f4f4d1;
    box-shadow: 0px 0px 10px 2px #b1a9a9da inset;
    .el-tabs__content {
      height: calc(100% - 60px);
      overflow: auto;
      color: #746f6f;
      padding:0 10px;
    }
    .el-tabs__item.is-active {
      color: #409eff;
    }
    .el-tabs__item {
      color: #746f6f;
    }
  }
}
</style>
