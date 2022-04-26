<template>
  <div class="country-db">
    <div class="db-right-side-box">
      <div class="title">
        <div class="country">{{ currentCountry.name }}</div>
        <!-- <div class="zlly">{{ currentCountry.zlly }}</div> -->
        <div class="btn-box">
          <div
            class="btns default-btn"
            :class="{ 'active-btn': activeIndex === 'jj' }"
            @click="activeIndex = 'jj'"
          >
            简介
          </div>
          <div
            class="btns default-btn"
            :class="{ 'active-btn': activeIndex === 'zs' }"
            @click="activeIndex = 'zs'"
          >
            指数
          </div>
        </div>
        <div class="right-side-btn">
          <span class="edit-icon-btn" v-show="pageType === 'detail'" @click="edit"></span>
          <span class="usual-btn" v-show="pageType === 'edit'" @click="commit">确定</span>
          <span class="usual-btn" v-show="pageType === 'edit'" @click="back">取消</span>
        </div>
      </div>
      <div class="obj" v-show="activeIndex === 'jj'">
        <div
          class="obj-item"
          v-for="(item, index) in currentCountry.info"
          :key="index"
        >
          <div class="inner">
            <div class="objTitle">
              <span class="text" v-if="pageType === 'detail'">{{ item.key }}</span>
              <span class="text" v-if="pageType === 'edit'">
                <el-input v-model="item.key"></el-input>
              </span>
              <span class="line"></span>
            </div>
            <div class="text-box">
              <span class="objText" v-if="pageType === 'detail'">{{ item.value }}</span>
              <span class="objText" v-if="pageType === 'edit'">
                <el-input type='textarea' rows="7" v-model="item.value"></el-input>
              </span>
              <span class="img-box" v-if="index === 0">
                <img src="../../assets/image/exmple.png" alt="" />
              </span>
            </div>
          </div>
          <div class="delete-btn" v-if="pageType === 'edit'">
            <i class="el-icon-delete" @click="deleteItem(index)"></i>
          </div>
        </div>
        <div class="bottom-btn" v-if="pageType === 'edit'">
          <span class="usual-btn" @click="addItem">增加一项</span>
        </div>
      </div>
      <div class="zs-box" v-show="activeIndex === 'zs'"></div>
    </div>
  </div>
</template>

<script>
import { countryArr, countryDetail } from './country'
import { cloneDeep } from 'lodash'
export default {
  name: "countryDb",
  data() {
    return {
      activeIndex: "jj",
      pageType: 'detail',
      oldCurrentCountry: '',
      currentCountry: countryDetail || {},
    };
  },

  methods: {
    edit() {
      this.pageType = 'edit'
      this.oldCurrentCountry = cloneDeep(this.currentCountry)
    },
    commit() {
      this.pageType = 'detail'
    },
    back() {
      this.currentCountry = cloneDeep(this.oldCurrentCountry)
      this.pageType = 'detail'
    },
    deleteItem(index) {
      this.currentCountry.info.splice(index, 1)
    },
    addItem() {
      this.currentCountry.info.push({
        key: '',
        value: ''
      })
    }
  },
};
</script>

<style scoped lang="scss">
.country-db {
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  .db-right-side-box {
    padding: 10px 0;
    background: #fff !important; //2021-12-22 yjl
    overflow: hidden;
    width: 100%;
    .title {
      position: relative;
      height: 65px;
      .country {
        font-size: 2.3rem;
        // color: #00deff;
        color:#2f67e7;
        text-align: center;
        height: 40px;
        line-height: 70px;
        margin-top: 10px;
        letter-spacing: 3px;
      }
      .zlly {
        color: #ddd;
        text-align: center;
        margin-top: 10px;
        font-size: 12px;
      }
      .btn-box {
        position: absolute;
        bottom: 0;
      }
      .right-side-btn{
        position: absolute;
        right: 60px;
        top: 40px;
        height: 20px;
        .edit-icon-btn {
          display: inline-block;
          cursor: pointer;
          width: 20px;
          height: 20px;
          background: url("../../assets/image/bg/edit.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .obj {
      font-size: 12px;
      height: calc(100% - 80px);
      padding: 30px 0 0 20px;
      overflow-y: auto;
      .obj-item {
        padding-bottom: 30px;
        padding-right: 40px;
        display: flex;
        .inner{
          flex: 1;
          .objTitle {
            // color: #fa781b;
            color:#2f67e7;
            display: block;
            padding-bottom: 15px;
            font-size: 14px;
            font-weight: bold;
            display: flex;
            position: relative;
            > span {
              display: inline-block;
            }
            .text {
              margin-right: 12px;
            }
            .line {
              flex: 1;
              height: 1px;
              background: #ccc;
              position: relative;
              top: 9px;
            }
          }
          .objText {
            color: #000;
            display: inline-block;
            flex: 1;
          }
          .text-box {
            display: flex;
            .img-box {
              width: 25%;
              margin-left: 20px;
              padding: 10px;
              background: url("../../assets/image/bg/img_box.png") no-repeat;
              background-size: 100% 100%;
              img {
                width: 100%;
              }
            }
          }
        }
        .delete-btn{
          color: rgb(253, 83, 83);
          margin: 0 20px;
          font-weight: bold;
          i{
            font-size: 16px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
