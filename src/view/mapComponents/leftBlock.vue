<template>
  <div class="left-block" v-show="leftBlockShow">
      <!-- <div class="btn-box">
          <span class="active">整体安全</span>
          <span>政治安全</span>
          <span>社会安全</span>
          <span>国土安全</span>
          <span>生物安全</span>
      </div> -->
      <div class="content">
        <ztaqBlock/>
      </div>
  </div>
</template>

<script>
import ztaqBlock from './leftComps/ztaqBlock.vue'
export default {
  components: {
      ztaqBlock
  },
  name: "leftBlock",
  data() {
    return {
      leftBlockShow: true,
    };
  },
  methods: {
  },
  created() {},
  mounted() {
    // var dv = document.querySelector(".left-block");
    // var x = 0;
    // var y = 0;
    // var l = 0;
    // var t = 0;
    // var isDown = false;
    // dv.onmousedown = function (e) {
    //   x = e.clientX;
    //   y = e.clientY;
    //   l = dv.offsetLeft;
    //   t = dv.offsetTop;
    //   isDown = true;
    //   dv.style.cursor = "move";
    // };
    // dv.onmousemove = function (e) {
    //   if (isDown == false) {
    //     return;
    //   }
    //   var nx = e.clientX;
    //   var ny = e.clientY;
    //   var nl = nx - (x - l);
    //   var nt = ny - (y - t);
    //   dv.style.left = nl + "px";
    //   dv.style.top = nt + "px";
    // };
    // dv.onmouseup = function () {
    //   isDown = false;
    //   dv.style.cursor = "default";
    // };
  },
};
</script>

<style lang="scss">
.left-block {
  position: fixed;
  top: 132px;
  left: 18px;
  width: 450px;
  z-index: 9;
  height: calc(100% - 154px);
  overflow: hidden;
  background: #fff;
  // padding: 20px;
  // padding-bottom: 0;
  // background: url("../../assets/image/ts/bg_left.png") no-repeat;
  // background-size: 100% 100%;
  // .btn-box{
  //     display: flex;
  //     padding:10px 10px 0px;
  //     justify-content: space-around;
  //     // padding: 0 10px;
  //   >span{
  //       width: 20%;
  //       height: 40px;
  //       // background: url('../../assets/image/ts/btn_dark.png') no-repeat;
  //       // background-size: 100% 100%;
  //       display: inline-block;
  //       text-align: center;
  //       padding: 6px 0;
  //       font-size: 14px;
  //       color: #5a5959;
        
  //       &.active{
  //           // background: url('../../assets/image/ts/btn_light.png') no-repeat;
  //           // background-size: 100% 100%;
  //           color: #000;
  //           border-bottom: 2px solid #085bc1;
  //           font-weight: bold;
  //       }
  //   }
  // }
  .content{
      height: 100%;
      // height: calc(100% - 50px);
      overflow: auto;
      padding: 0 10px;
      background: #f7f4f4d1;
      box-shadow: 0px 0px 10px 2px #b1a9a9da inset;
  }
}
</style>
