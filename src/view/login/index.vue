<template>
  <div id="login">
    <div class="detail">
      <div class="next">
        <div class="title">“一带一路”专题数据库</div>
        <el-input v-model="userMes.username"></el-input>
        <el-input v-model="userMes.password" type="password"></el-input>
        <el-button class="login-btn" size="mini" type="primary" @click="submit">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/assets/api/common.js'
export default {
  name: "login",
  data() {
    return {
      userMes: {
        username: "admin",
        password: "123456"
      }
    };
  },
  methods: {
      submit(){
          let user = this.userMes
          if(user.username === "" || user.password === ""){
              this.$message.error("存在未输入项")
              return
          }else{
            this.$store.dispatch('getDbDictTree').then(() => {
              this.$router.push('/Map')
            })
            // 暂时两个后端没有合并在一起， 先不调用登录接口  后期改回
            // login(user).then(res => {
            //   if (res.data && res.data.data && res.data.data.token) {
            //     this.$store.dispatch('getUserInfo', res.data.data.token)
            //     this.$store.dispatch('getTopicDataTree')
            //   }
            // })
          }
      }
  }
};
</script>

<style lang="less" scoped>
#login {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url('../../assets/image/login/bg.png') no-repeat;
  background-size: 100% 100%;
  .detail {
    position: fixed;
    left: 35%;
    top: 20%;
    width: 30%;
    height: 60%;
    background: url('../../assets/image/login/form_bg.png') no-repeat;
    background-size: 100% 100%;
    .next{
      margin: 10%;
      text-align: center;
      padding: .8em;
      height: 80%;
      .title{
        font-size: 1.5em;
        height: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #9bf9f3;
        font-weight: bold;
      }
      /deep/.el-input{
        .el-input__inner{
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom-color: #3272b3;
          box-shadow: none;
          background: none;
          color: #fff;
        }
      }
      .login-btn{
        background: #1f536d;
        border: none;
        border-radius: 0;
        margin-top: 3em;
        padding: 15px;
        &:hover{
          color: #9bf9f3;
        }
      }
      >*{
        margin: 10px 0;
        width: 100%
      }
    }
  }
}
</style>
