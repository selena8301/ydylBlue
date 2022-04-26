<template>
  <div class="bigCountryIndex">
    <div class="bigCountry-box">
      <div class="bigCountry-item" @click="chooseItem('中美博弈')">
        <div class="types">
          <div class="content">
            <span class="name">中美博弈</span>
            <span class="englishName">The game between China and America</span>
          </div>
        </div>
      </div>
      <div class="bigCountry-item" @click="chooseItem('中俄博弈')">
        <div class="types">
          <div class="content">
            <span class="name">中俄博弈</span>
            <span class="englishName">The game between China and Russia</span>
          </div>
        </div>
      </div>
      <div class="bigCountry-item" @click="chooseItem('中日博弈')">
        <div class="types">
          <div class="content">
            <span class="name">中日博弈</span>
            <span class="englishName">The game between China and Japan</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bigCountryIndex",
  data() {
    return {};
  },
  methods: {
    chooseItem(type) {
      this.$router.push({
        name: "ProjectList",
        params: {
          ztType: type,
          oldPage: 'bigCountry'
        },
      });
    },
  },
};
</script>

<style lang="scss">
.bigCountryIndex {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  .bigCountry-box {
    // height: 35%;
    height: 40%;
    width: 100%;
    padding-bottom: 5%;
    display: flex;
    justify-content: center;

    .types {
      display: inline-block;
      width: 100%;
      height: 100%;
      flex: 1;
      // background: #0f2647;
      margin-left: 15px;
      border-radius: 10px;
      // border: 1px solid #0d375a;
      color: #fff;
      .content {
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
          height: 3rem;
          line-height: 3rem;
        }
        .name {
          color: #00f0ff;
          font-size: 1.8rem;
          text-shadow: -2px -3px 1px #000;
          padding-right: 1rem;
        }
        .englishName {
          color: #888;
          font-size: 1rem;
          text-shadow: -1px -2px 1px #000;
        }
        &:hover {
          animation: all 0.5s ease-in;
        //   padding: 10%;
          background: url("../../assets/image/pics/pic.png") no-repeat;
          background-size: 100% 100%;
          .name {
            font-size: 2.3rem;
            // height: 4rem;
          }
        }
      }
    }

    .bigCountry-item {
      display: flex;
      width: 25%;
      height: 100%;
      overflow: hidden;
      margin: 0 20px;
      // background: rgba(44, 85, 129, 0.3);
      // box-shadow: 0 0 3px 1px rgba(76, 100, 134, 0.5);
      padding: 10px;
      border-radius: 5px;
      padding: auto 0;
      cursor: pointer;
      .left-side {
        height: 100%;
        width: 24%;
        .text {
          color: #00f0ff;
          font-weight: bold;
          font-size: 18px;
          height: 25%;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }
        .img {
          height: 75%;
        }
      }
      .right-side {
        flex: 1;
        margin-left: 10px;
        height: 100%;
        // background: url('../../assets/image/bg/right_side_bg.png');
        background-size: 100% 100%;
      }
      &:hover {
        width: 27%;
        height: 110%;
        position: relative;
        top: -10%;
        transition: all 0.3s;
      }
    }
  }
}
</style>
