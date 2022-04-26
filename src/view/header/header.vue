<template>
  <el-header class="nav" style="height: 75px">
    <div class="header-box-left">
      <div class="title"><img src="../../assets/image/logo.png">“一带一路” 专题数据库</div>
    </div>
    <div class="header-box-right">
      <div class="btn-box">
        <div class="header-btns default-btnH" :title="item.name" :class="{'active-btn': activeIndex === (index + '')}" v-for="(item, index) in navTitle" @click="linkTo(item.path, index)" :index="index + ''" :key="index">{{ item.name }}</div>
      </div>
      <div class="time-box">
        <div class="time">{{currrentTime}}</div>
        <div class="img-box">
          <img src="../../assets/image/bg/line.png" class="line"/>
          <!-- <img src="../../assets/image/bg/setting.png" @click="handlerData" class="setting"/> -->
          <img src="../../assets/image/bg/logout.png" @click="logout" class="logout"/>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script>
import { mapGetters } from "vuex";
import { logout } from '@/assets/api/common.js'
import navTitle from "../../assets/js/navTitle";
export default {
  data() {
    return {
      navTitle: navTitle,
      currrentTime: ''
    };
  },
  computed: {
    ...mapGetters(["activeIndex"]),
  },
  mounted() {
    setInterval(() => {
      this.currrentTime = this.getCurrentDate(true)
    }, 1000)
  },
  methods: {
    handlerData() {
      // this.$router.push('/GeneralManagement')
    },
    linkTo(type, index) {
      this.$router.push("/" + type);
      this.$store.dispatch("changeMenu", index + "");
    },
    getCurrentDate(fulldate = false, separator = ['-', ':']) {
      let currentTimeObj = new Date();

      let year = currentTimeObj.getFullYear();
      let month = (currentTimeObj.getMonth() + 1);
      month = month >= 10 ? month : '0' + month;
      let day = currentTimeObj.getDate();
      day = day >= 10 ? day : '0' + day;
      let hour = currentTimeObj.getHours();
      hour = hour >= 10 ? hour : '0' + hour;
      let minute = currentTimeObj.getMinutes();
      minute = minute >= 10 ? minute : '0' + minute;
      let second = currentTimeObj.getSeconds();
      second = second >= 10 ? second : '0' + second;
      
      if (fulldate) {
          let ymd = [year, month, day];
          let his = [hour, minute, second];
          return ymd.join(separator[0]) + ' ' + his.join(separator[1]);
      } else {
          let ymd = [year, month, day];
          return ymd.join(separator[0]);
      }
    },
    // 退出登录
    logout() {
      this.$confirm("确认退出系统？", "提示")
        .then(() => {
          logout()
            .then(res => {
              this.$store.dispatch('logout')
            })
            .catch(error => {
              this.$store.dispatch('logout')
            });
        })
        .catch(() => {});
    },
  },
  created() {
    // 刷新之后重新获取数据
    this.$store.dispatch("refresh");
  },
};
</script>
<style lang="scss" scoped>
.nav {
  width: 100%;
  padding: 0;
  margin: 0;
  z-index: 1;
  background: url("../../assets/image/bg/header2.png") no-repeat;
  background-size: 100% 100%;
  // background: #00f0ff;
  color: #fff;
  display: flex;
  .header-box {
    &-left {
      width: 400px;
      padding-left: 30px;
      padding-top: 5px;
      .title {
        img{
          margin-right: 20px;
          position: relative;
          top: 7px;
          height: 35px;
          width: 35px;
        }
        overflow: hidden;
        display: inline-block;
        font-size: 1.75rem;
        line-height: 70px;
        letter-spacing:3px;
		    font-weight: bold;
        width:100%;
        white-space: nowrap;
        text-align: left;
      }
    }
    &-right {
      flex: 1;
      position: relative;
      .btn-box{
        position: absolute;
        bottom: 12px;
        left: 10px;
        line-height: 48px;
        height: 48px;
        overflow: hidden;
        display: flex;
        width: 100%;
        padding-right: 300px;
        padding-left: 50px;
        .header-btns{
          flex: 1;
          font-size: 18px!important;
          display: inline-block;
          text-align: center;
          margin: 0 10px;
          cursor: pointer;
          &:not(:first-child) {
            // margin-left: -30px!important;
          }
          &.default-btn{
            // background: url('../../assets/image/bg/btn-black.png') no-repeat!important;
            // background-size: cover!important;
          }
          &.active-btn{
            // background: url('../../assets/image/bg/btn-blue.png') no-repeat!important;
            // background-size: cover!important;
            color: #fff;
            font-weight: bold;
          }
        }
      }
      .time-box{
        position: absolute;
        right: 20px;
        color: #fff;
        height: 75px;
        line-height: 77px;
        .img-box{
          display: inline-block;
          >img{
            height: 16px;
            margin-left: 8px;
          }
          .setting, .logout{
            cursor: pointer;
          }
        }
        .time{
          display: inline-block;
          font-size: 16px;
        }
      }
    }
  }
}
</style>