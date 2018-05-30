<template>
  <el-aside width="auto">
    <div :class="isCollapse ? 'logo min-logo' : 'logo'">
      <img src="@/assets/img/logo_03.png" alt="">
    </div>
    <el-menu
      class="el-menu"
      :default-active="activeMenu"
      unique-opened
      router
      @open="handleOpen"
      @close="handleClose"
      collapse-transition
      :collapse="isCollapse">
      <el-submenu
        v-for="(route , index) in Routers"
        :key="index"
        :index="route.name">
        <template slot="title">
          <i :class="route.meta.icon"></i>
          <span slot="title">{{route.meta.name}}</span>
        </template>
        <el-menu-item
          v-for="(cRoute , cIndex) in route.children"
          :key="cIndex"
          :index="cRoute.name"
          :route="cRoute">
          <template slot="title">
            <i :class="cRoute.meta.icon"></i>
            <span slot="title">{{cRoute.meta.name}}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
  import sliderPath from '@/router/silderPath.js';//导入silder路由
  export default {
    props:['isCollapse'],
    data(){
      return{
        Routers : sliderPath
      }
    },
    computed: {
      activeMenu: function(){
        if(this.$route.name === 'home'){
          return '';
        }else{
          return this.$route.name
        }
      },
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped lang="scss">
  .el-submenu__title >i.iconfont{
    font-size: 22px;
  }

  .el-aside {
    height: 100%;
    overflow-y: auto;
    color: #333;
    background: #ffffff;
    border-right: 1px solid #CCCCCC;
    .logo{
      width: 176px;
      padding: 10px 12px;
      transition: width 0.5s linear;
      img{
        width: 150px;
      }
    }
    .min-logo{
      width: 40px;
      padding: 10px 12px;
      transition: width 0.3s;
    }
    .el-menu{
      background-color: transparent;
      border-right: none;
      .el-submenu{
        .el-submenu__title{
          display: flex;
          display: -webkit-flex;
          align-items: center;
          -webkit-align-items: center;
          color: #140000;
          i{
            font-size: 24px;
            color: #606266;
            margin-right: 5px;
          }
        }
        .el-menu-item{
          position: relative;
          background: #E9E9E9;
          color: #140000;
          font-size: 14px;
        }
        .el-menu-item{
          i{
            font-size: 18px;
            margin-right: 5px;
          }
        }
        .el-menu-item a{
          color: #140000;
          font-size: 14px;
        }
        .el-menu-item.is-active,
        .el-menu-item.is-active a{
          color: #23C09B;
        }
        .el-menu-item:last-child{
          border-bottom: none;
          padding-bottom: 10px;
        }
      }
      .el-submenu.is-opened{
        background: #E9E9E9;
      }
    }
    .el-menu:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .el-menu--collapse{
      .is-active{
        i.iconfont{
          font-size:25px;
          color: #00b78c;
        }
      }
    }
  }
</style>
