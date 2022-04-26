<template>
  <div id="app">
    <Header v-show="isFullPage"></Header>
    <router-view  v-if="isRouterAlive" class="roter-view"></router-view>
    <div class="loader-box" v-show="showLoader">
      <div class="loader">
          <div class="face">
              <div class="circle"></div>
          </div>
          <div class="face">
              <div class="circle"></div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./view/header/header.vue";
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: { Header },
  computed: {
    ...mapGetters(['showLoader']),
    isFullPage() {
      return this.$route.name !== 'login'
    }
  },
  data(){
    return{
      isRouterAlive: true,
    }
  }
}
</script>

<style>
#app{
  /* background: url('./assets/image/bg/main_bg.png') no-repeat; */
  background: #fff;
}
.roter-view{
  height: calc(100% - 75px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
