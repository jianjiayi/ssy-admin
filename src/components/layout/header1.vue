<template>
  <el-header>
    <div class="container">
      <router-link to="/">
        <div class="logo">
          <div class="icon">
            <img src="@/assets/img/logo_02.png" alt="">
          </div>
          <i class="line">|</i>
          <span class="name">上实源后台管理</span>
        </div>
      </router-link>

      <div class="title">
        {{$route.meta.name}}
      </div>
    </div>
  </el-header>
</template>
<script>
  export default {
    data(){
      return{
        active:false,
      }
    },
    methods:{

    }
  }
</script>
<style scoped lang="scss">
  a{
    text-decoration: none;
  }
  .el-header{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    z-index: 999999;
    background-color: #00b78c;
    .container{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .logo{
        position: absolute;
        left:0;
        top:0;
        display: flex;
        align-items: center;
        .icon{
          img{
            width: 70px;
            max-height: 60px;
          }
        }
        i.line{
          font-size: 20px;
          padding: 0 10px;
          color: #ffffff;
        }
        .name{
          font-size: 16px;
          color: #ffffff;
        }
      }
      .title{
        font-size: 20px;
        line-height: 60px;
        color: #ffffff;
        text-shadow: 0 0 10px #000000;
      }
    }
  }
  @media screen and (max-width: 992px){
  }
</style>
