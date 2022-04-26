<template>
  <div class="zhuanti-edit-detail">
    <div class="form-page-box">
      <div class="form-item">
        <span class="label">专题名称</span>
        <el-input size="mini" v-model="detailData.titleCn" />
      </div>
      <div class="form-item">
        <span class="label">原始网址</span>
        <el-input size="mini" v-model="detailData.fromUrl" />
      </div>
      <div class="form-item">
        <div class="form-item-inner-box">
          <span class="label">所属刊物</span>
          <el-input size="mini" v-model="detailData.journalName" />
        </div>
        <div class="form-item-inner-box">
          <span class="label">国别</span>
          <!-- <el-input size="mini" v-model="detailData.country" /> -->
          <el-select
            v-model="detailData.country"
            size="mini"
            filterable
            disabled
            style="width: 100%"
            placeholder="请选择国别"
          >
            <el-option
              v-for="item in countryOptions"
              :key="item.dictName"
              :label="item.dictName"
              :value="item.dictName"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-inner-box">
          <span class="label">语种</span>
          <el-select
            v-model="detailData.language"
            placeholder="请选择语种"
            size="mini"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="item in languageOptions"
              :key="item.dictName"
              :label="item.dictName"
              :value="item.dictName"
            >
            </el-option>
          </el-select>
        </div>
        <!-- <div class="form-item-inner-box">
          <span class="label">情感</span>
          <el-select
            v-model="detailData.affective"
            placeholder="请选择情感"
            size="mini"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="item in affectiveOptions"
              :key="item.dictName"
              :label="item.dictName"
              :value="item.dictName"
            >
            </el-option>
          </el-select>
        </div> -->
      </div>
      <div class="form-item">
        <div class="form-item-inner-box">
          <span class="label">作者</span>
          <el-input size="mini" v-model="detailData.author" />
        </div>
        <div class="form-item-inner-box">
          <span class="label">发布时间</span>
          <el-date-picker
            v-model="detailData.publishTime"
            size="mini"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="form-item">
        <span class="label">关键词</span>
        <el-input
          @input="changeInput(detailData, 'category', detailData.category)"
          size="mini"
          placeholder="请输入关键词。输入多个时用英文中的“,”隔开"
          v-model="detailData.category"
        />
      </div>
      <div class="form-item">
        <span class="label">正文</span>
        <tinymce v-model="detailData.contentCn"></tinymce>
      </div>
    </div>
    <div class="bottom-btn">
      <span class="usual-btn" @click="save" v-show="pageType === 'add'"
        >保存</span
      >
      <span class="usual-btn" @click="edit" v-show="pageType === 'edit'"
        >确认</span
      >
      <span class="usual-btn" @click="resetForm">重置</span>
      <span class="usual-btn" @click="goback">返回</span>
    </div>
  </div>
</template>
<script>
import "./tinyMCE";
import { DbDataAdd, DbDataEdit } from "../dataManagent/api";
import { cloneDeep } from "lodash";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  props: ["pageType", "detailData", "topicName", "country"],
  data() {
    return {
      data: {},
    };
  },
  computed: {
    ...mapGetters(["dictData"]),
    languageOptions() {
      return this.dictData['语种']
    },
    countryOptions() {
      return this.dictData['国家']
    }
  },
  mounted() {
    if (this.pageType === "edit") {
      this.data = cloneDeep(this.detailData) || {};
    } else if (this.pageType === "add") {
      this.detailData.country = this.country;
      this.detailData.affective = "中立";
      this.detailData.language = "中文";
    }
  },
  methods: {
    changeInput(item, key, value) {
      this.$set(item, key, value)
      this.$forceUpdate();
    },
    goback() {
      const oldData = cloneDeep(this.$parent.detailData)
      this.$parent.pageType = this.$parent.oldPageType || "list";
      this.$parent.detailData = {};
      this.$parent.detailData.category = oldData.category
      this.$parent.fetchData(this.$parent.form)
    },
    save() {
      const postData = cloneDeep(this.detailData);
      if (postData.publishTime) {
        postData.publishTime =
          moment(postData.publishTime).format("yyyy-MM-DD HH:mm:ss") + " 000";
      }
      if (postData.category) {
        postData.category = postData.category.split(';').join(',').split('，').join(',')
      }
      postData.topicName = this.topicName;
      postData.orderNumber = 0
      DbDataAdd(postData).then((res) => {
        if (res.data.code === 0) {
          this.$message.success("保存成功！");
          this.goback();
        }
      });
    },
    edit() {
      const postData = cloneDeep(this.detailData);
      if (postData.publishTime) {
        postData.publishTime =
          moment(postData.publishTime).format("yyyy-MM-DD HH:mm:ss") + " 000";
      }
      if (postData.category) {
        postData.category = postData.category.split(';').join(',').split('，').join(',')
      }
      DbDataEdit(postData).then((res) => {
        if (res.data.code === 0) {
          this.$message.success("修改成功！");
          this.goback();
        }
      });
    },
    resetForm() {
      if (this.pageType === "add") {
        this.$parent.detailData = {};
      } else if (this.pageType === "edit") {
        this.$parent.detailData = cloneDeep(this.data) || {};
      }
    },
  },
};
</script>
<style lang="scss">
.zhuanti-edit-detail {
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  .form-page-box {
    height: calc(100% - 80px);
    width: 100%;
    overflow: auto;
    margin-top: 30px;
    position: relative;
    .form-item {
      display: flex;
      line-height: 45px;
      width: calc(100% - 20px);
      position: relative;
      .label {
        width: 120px;
        // color: #bad7f0;
        color: #606366;
        text-align: right;
        margin-right: 20px;
        flex-shrink: 0;
      }
      .form-item-inner-box {
        display: flex;
        width: 50%;
      }
    }
  }
  .bottom-btn {
    position: fixed;
    bottom: 30px;
    right: 60px;
    width: 100%;
    text-align: right;
  }
}
</style>