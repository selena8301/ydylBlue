<template>
  <div class="reportIndex">
    <div class="report-box">
      <div class="report-boxn">
        <div class="report-item">
          <div class="types">
            <div class="content">
              <div class="top">
                <span class="name">通用模板</span>
                <span class="btn-name">进入模板</span>
              </div>

              <div class="about">
                <div class="left">
                  <div class="parallelogram">
                    <div>使用次数</div>
                  </div>
                  <div class="parallelogram">
                    <div>模板简介</div>
                  </div>
                </div>

                <div class="right">
                  <div class="count">20</div>
                  <div class="text">
                    <span
                      >用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。用于日常报用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。用于日常报用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。用于日常报用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。用于日常报用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。123</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="report-item">
          <div class="types">
            <div class="content">
              <div class="top">
                <span class="name">通用模板</span>
                <span class="btn-name">进入模板</span>
              </div>

              <div class="about">
                <div class="left">
                  <div class="parallelogram">
                    <div>使用次数</div>
                  </div>
                  <div class="parallelogram">
                    <div>模板简介</div>
                  </div>
                </div>

                <div class="right">
                  <div class="count">20</div>
                  <div class="text">
                    <span
                      >用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。用于日常报用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。用于日常报用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。用于日常报用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。用于日常报用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。123</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="report-item">
          <div class="types">
            <div class="content">
              <div class="top">
                <span class="name">通用模板</span>
                <span class="btn-name">进入模板</span>
              </div>

              <div class="about">
                <div class="left">
                  <div class="parallelogram">
                    <div>使用次数</div>
                  </div>
                  <div class="parallelogram">
                    <div>模板简介</div>
                  </div>
                </div>

                <div class="right">
                  <div class="count">20</div>
                  <div class="text">
                    <span
                      >用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。用于日常报用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。用于日常报用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。用于日常报用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。用于日常报用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。用于日常报告、记录、纪要等。
                      这里是简介内容，这里是简介内容，这里是简介内容。123</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "reportIndex",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.reportIndex {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #e9e9e9;
  padding: 10px 10px 0;
  .report-box {
    background: #fff;
    // height: 30%;
    height: 100%;
    width: 100%;
    // padding-bottom: 10%;
    display: flex;
    // min-height: 470px;
    flex-direction: column;
    justify-content: center;
    .report-boxn{
      height: 30%;
      padding-bottom: 10%;
      display: flex;
      min-height: 470px;
      justify-content: center;
      width: 100%;
    }
    .report-item {
      width: 25%;
      height: 100%;
      overflow: hidden;
      margin: 0 20px;
      padding: auto 0;
      cursor: pointer;
      position: relative;

      .types {
        width: calc(100% - 20px);
        display: inline-block;
        height: calc(100% - 30px);
        flex: 1;
        // background: #0f2647;
        background: #006AE1;
        background: url("../../assets/image/pics/boxbg.png") no-repeat;
        background-size: 100% 100%;
      
        margin-left: 15px;
        color: #ffffffd9;

        .content {
          padding: 8%;
          height: 100%;
          width: 100%;
          cursor: pointer;

          .top {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 30px;

            .name {
              display: block;
              width: 300px;
              height: 2rem;
              text-align: left;
              // color: #00f0ff;
              color:#fff;
              font-size: 1.3rem;
              //text-shadow: -4px -2px 1px #000;
            }

            .btn-name {
              // display: block;
              // width: 120px;
              // height: 35px;
              // text-align: center;
              // line-height: 28px;
              // color: #00f0ff;
              // cursor: pointer;
              // background: url("../../assets/image/pics/按钮bg.png") no-repeat;
              // background-size: 100% 100%;
              display: block;
              width: 100px;
              height: 33px;
              text-align: center;
              line-height: 33px;
              color: #fff;
              cursor: pointer;
              background: orange;
            }
          }

          .englishName {
            color: #888;
            // text-shadow: -4px -2px 1px #111;
          }

          .about {
            width: 100%;
            height: 9rem;
            display: flex;
            justify-content: space-between;
            .left {
              width: 130px;
              height: 9rem;
              .parallelogram {
                margin-top: 15px;
                padding: 5px 10px;
                text-align: center;
                background-color: rgba(0, 238, 255, 0.329);
                transform: skew(-20deg);
                div {
                  transform: skew(20deg);
                }
              }
            }

            .right {
              width: 100%;
              height: 9rem;
              .count {
                margin-top: 20px;
                padding-left: 15px;
              }
              .text {
                width: 100%;
                height: 7rem;
                margin-top: 20px;
                padding-left: 15px;
                overflow: auto;
              }
            }
          }

          &:hover {
            animation: all 0.5s ease-in;
            /* padding: 8%;
           background: url('../../assets/image/pics/bg.png') no-repeat;
           background-size: 100% 100%;

           .name {
             font-size: 1.5rem;
             height: 2.5rem;
           }*/
          }
        }
      }

      .top-box {
        height: 30%;
        width: 100%;

        .img {
          height: 100%;
        }
      }

      .bottom-box {
        display: flex;
        flex-direction: column;
        height: 65%;
        background-size: 100% 100%;

        .title {
          color: #00f0ff;
          font-weight: bold;
          font-size: 18px;
          height: 50px;
          line-height: 45px;
          text-align: center;
          overflow: hidden;
        }

        .text {
          background: rgba(44, 85, 129, 0.3);
          box-shadow: 0 0 3px 1px rgba(76, 100, 134, 0.5);
          height: calc(100% - 75px);
          margin-bottom: 15px;
          font-size: 12px;
          padding: 20px;
          overflow-y: auto;

          > div {
            margin-bottom: 5px;
            display: flex;

            .key {
              color: #00f0ff;
              margin-right: 20px;
              display: inline-block;
              width: 80px;
            }

            .value {
              width: calc(100% - 80px);
              color: #eee;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }

        .btn {
          width: 100%;
          text-align: center;
        }
      }

      &:hover {
        width: 27%;
        height: 100%;
        position: relative;
        top: -10%;
        transition: all 0.5s;

        .bottom-box {
          .text {
            > div {
              .value {
                overflow: unset;
                text-overflow: unset;
                -webkit-line-clamp: unset;
                line-clamp: unset;
              }
            }
          }
        }
      }
    }
  }
}
</style>
