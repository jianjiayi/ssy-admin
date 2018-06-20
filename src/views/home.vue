<template>
  <el-container>
    <div class="left-silder">
      <my-slider :isCollapse="isCollapse"></my-slider>
    </div>
    <div :class="!isCollapse? 'right-main' : 'right-main active'">
      <my-header @collapseFun="handelCollapse"></my-header>
      <el-main>
        <div class="tob-bar">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index">{{item.meta.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <dashboard v-if="$route.path=='/'"></dashboard>
        <transition v-else name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </div>
  </el-container>
</template>
<script>
  import myHeader from '@/components/layout/header.vue';
  import mySlider from '@/components/layout/slider.vue';

  import dashboard from '@/views/dashboard/index.vue';
  export default {
    data() {
      return {
        isCollapse: false,
      }
    },
    computed: {
      breadcrumbs(){
        return (this.$route && this.$route.matched) || [];
      }
    },
    methods:{
      handelCollapse(val){
        this.isCollapse = val;
      }
    },
    components:{
      myHeader,mySlider,dashboard
    }
  };
</script>
<style scoped lang="scss">
  .fade-enter-active{
    transition: all 1.5s;
    transition-delay: 2s;
  }

  .fade-leave-active{
    transition: all 2.5s;
  }

  .fade-enter, .fade-leave-active{
    opacity: 0;
  }
  .el-container{
    position: absolute;
    left:0;
    top:0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: flex-start;
    .left-silder{
      width: auto;
      z-index: 99;
    }
    .right-main{
      position: absolute;
      left:200px;
      top:0;
      right: 0;
      bottom: 0;
      overflow-x: auto;
      transition: left 0.3s linear;
      .el-main{
        position: absolute;
        top:60px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        min-width: 800px;
        overflow-y: auto;
        padding: 10px 20px 20px 20px;
        .tob-bar{
          height: 38px;
          color: #666;
          cursor: pointer;
          position: relative;
          border-bottom: 1px solid #ccc;
          .el-breadcrumb{
            line-height: 38px;
          }
        }
      }
    }
    .right-main.active{
      left:64px;
      transition: left 0.3s;
    }
  }
</style>
