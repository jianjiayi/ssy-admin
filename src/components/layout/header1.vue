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
    z-index: 999;
    background-color: #00b78c;
    .container{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo{
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
    }
  }
  @media screen and (max-width: 992px){
  }
</style>
