<template>
  <div class="dep-manage">
    <div class="left-side-box">
      <div class="tree">
        <el-tree :indent="30"
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          ref="tree"
        >
        <span class="custom-tree-node" slot-scope="{ node, data }" @click="clickNode(data)">
        <span>{{ node.label }}</span>
        <span class="tree-btns">
          <i title="新增子机构" class="el-icon-plus" @click.stop="addChildren(data)"></i>
          <i title="修改" class="el-icon-edit" @click.stop="editMenu(data)"></i>
          <i title="删除" class="el-icon-delete" @click.stop="deleteMenu(data)"></i>
        </span>
      </span>
        </el-tree>
      </div>
      <div class="btns">
        <span class="usual-btn" @click="addFirstLevel">新建一级菜单</span>
      </div>
    </div>
    <div class="list-page-box" v-if="pageType !== 'detail'">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-col :span="16">
          <el-form-item label="功能项名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="功能项类型" prop="name">
            <el-radio v-model="form.menuType" :label="0">页面</el-radio>
            <el-radio v-model="form.menuType" :label="1">按钮</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="16">
            <el-form-item label="唯一标识" prop="url">
              <el-input v-model="form.url"></el-input>
            </el-form-item>
          </el-col>
        <el-col :span="16">
          <el-form-item label="功能描述" prop="description">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="bottom-btn">
        <span class="usual-btn" @click="commit">确认</span>
        <span class="usual-btn">重置</span>
        <span class="usual-btn" @click="goback">取消</span>
      </div>
    </div>
    <div class="list-page-box" v-else>
      <div class="form-item">
        <span class="label">功能项名称</span>
        <span class="value">{{form.name}}</span>
      </div>
      <div class="form-item">
        <span class="label">功能项类型</span>
        <span class="value">{{form.menuType === 0?'页面': '按钮'}}</span>
      </div>
      <div class="form-item">
        <span class="label">唯一标识</span>
        <span class="value">{{form.url}}</span>
      </div>
      <div class="form-item">
        <span class="label">功能描述</span>
        <span class="value">{{form.desc}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getTree, categoryMenudelete, addMenu, categoryMenuEdit } from './api'
import { cloneDeep } from 'lodash'
export default {
  name: "trackingIndex",
  data() {
    return {
      form: {
        menuType: 0
      },
      data: [
        {
          id: 2,
          label: "数据管理",
          children: [
            {
              id: 7,
              label: "沿线国家安全",
            },
            {
              id: 8,
              label: "大国博弈",
            },
            {
              id: 8,
              label: "发展态势跟踪",
            },
            {
              id: 8,
              label: "数据源管理",
            },
            {
              id: 8,
              label: "数据集成",
            },
            {
              id: 8,
              label: "数据模型管理",
            },
          ],
        },
        {
          id: 3,
          label: "专题管理",
        },
        {
          id: 3,
          label: "综合态势",
        },
        {
          id: 4,
          label: "统计分析",
        },
        {
          id: 5,
          label: "分析报告",
        },
        {
          id: 6,
          label: "分析研判",
        },
        {
          id: 2,
          label: "系统管理",
          children: [
            {
              id: 7,
              label: "用户管理",
            },
            {
              id: 8,
              label: "权限管理",
            },
            {
              id: 8,
              label: "组织机构管理",
            },
            {
              id: 8,
              label: "角色管理",
            },
          ],
        },
      ],
      rules: {
        name: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
        ],
        url: [
          { required: true, message: "请输入唯一标识", trigger: "blur" },
        ],
        desc: [
          { required: true, message: "请输入机构描述", trigger: "blur" },
        ]
      },
      defaultProps: {
        children: "children",
        label: "name",
      },
      pageType: 'detail',
      parentId: '',
      menuLevel: 1,
      id: ''
    };
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // 点击新建一级部门
    addFirstLevel() {
      this.pageType = 'add'
      this.menuLevel = 1
      this.parentId = this.id
    },
    // 点击确认
    commit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.form.status = 1
          if (this.parentId) {
            this.form.parentUid = this.parentId
          }
          if (this.menuLevel) {
            this.form.menuLevel = this.menuLevel
          }
          if (this.pageType === 'add') {
            this.form.isShow = 1
            addMenu(this.form).then(res => {
              if (res.data.code = 'success') {
                this.$message.success('操作成功')
                this.fetchData()
                this.parentId = ''
                this.pageType = 'detail'
              }
            })
          } else if (this.pageType === 'edit') {
            categoryMenuEdit(this.form).then(res => {
              if (res.data.code = 'success') {
                this.$message.success('操作成功')
                this.fetchData()
                this.parentId = ''
                this.pageType = 'detail'
              }
            })
          }
        }
      })
    },
    // 点击取消
    goback() {
      this.fetchData();
      this.parentId = "";
      this.pageType = "detail";
    },
    // 点击树的一条
    clickNode(data) {
      this.form = cloneDeep(data)
    },
    // 点击新增子菜单
    addChildren(data) {
      this.pageType = 'add'
      this.form = {
        menuType: 0,
        menuLevel: data.menuLevel + 1
      }
      this.parentId = data.id
    },
    // 点击修改
    editMenu(data) {
      this.pageType = 'edit'
      this.form = cloneDeep(data)
    },
    // 点击删除
    deleteMenu(data) {
      this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        categoryMenudelete({id: data.id}).then(res => {
          if (res.data.code = 'success') {
            this.$message.success('操作成功')
            this.fetchData()
            this.parentId = ''
            this.pageType = 'detail'
          }
        })
      })
    },
    fetchData() {
      getTree().then(res => {
        if (res.data.data && res.data.data[0].children) {
          this.data = res.data.data[0].children;
          this.parentId = res.data.data[0].id
          this.id = this.parentId
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.dep-manage {
  height: 100%;
  width: 100%;
  display: flex;
  // padding: 15px 0;
  overflow: hidden;
  .left-side-box {
    padding: 15px !important;
    background: #fff !important;
    flex-shrink: 0;
    .tree {
      height: calc(100% - 50px);
      overflow: auto;
      padding: 20px;
    }
    .btns{
      height: 50px;
      width: 100%;
      text-align: center;
    }
  }
  .list-page-box {
    background: #fff !important;
    padding: 60px 40px !important;
    padding-bottom: 100px !important;
    margin-left: 10px;
    position: relative;
    .form-item {
      display: flex;
      line-height: 45px;
      width: 80%;
      .label {
        width: 120px;
        // color: #bad7f0;
        color:#606366;
        text-align: right;
        margin-right: 20px;
      }
      .value{
        color: #1e1d1d;
      }
    }
    .bottom-btn{
        position: absolute;
        bottom: 30px;
        right: 60px;
    }
  }
  .custom-tree-node{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .tree-btns{
      display: none;
      i{
        margin-left: 5px;
        cursor: pointer;
      }
      .el-icon-delete{
        color: #f76969;
      }
      .el-icon-edit{
        color: rgb(250, 173, 29);
      }
      .el-icon-plus{
        color: rgb(2, 252, 2);
        // font-weight: bold;
        font-size: 15px;
      }
    }
    &:hover{
      .tree-btns{
        display: inline-block;
      }
    }
  }
}
</style>
