<template>
  <div class="dashboard">
    <div class="numbers-count">
      <el-card shadow="always">
        <div class="el-card-body primary">
          <i class="iconfont icon-wodedingdan1"></i>
          <div class="info">
            <span>订单数</span>
            <count-to class="count-number" :countData="countNumber.options1"></count-to>
          </div>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="el-card-body success">
          <i class="iconfont icon-wodedingdan1"></i>
          <div class="info">
            <span>访客数</span>
            <count-to class="count-number" :countData="countNumber.options2"></count-to>
          </div>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="el-card-body warning">
          <i class="iconfont icon-wodedingdan1"></i>
          <div class="info">
            <span>营业额</span>
            <count-to class="count-number" :countData="countNumber.options3"></count-to>
          </div>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="el-card-body danger">
          <i class="iconfont icon-wodedingdan1"></i>
          <div class="info">
            <span>收藏数</span>
            <count-to class="count-number" :countData="countNumber.options4"></count-to>
          </div>
        </div>
      </el-card>
    </div>
    <div class="echarts">
      <div class="echart-box">
        <div class="title-bar">
          <span class="title">订单统计</span>
          <span class="bar-btn">
            <el-button type="primary" plain size="mini">日</el-button>
            <el-button plain size="mini">周</el-button>
            <el-button plain size="mini">月</el-button>
          </span>
        </div>
        <chart-line></chart-line>
      </div>
    </div>
  </div>
</template>
<script>
  import countTo from '@/views/dashboard/components/countTo.vue';
  import chartLine from '@/components/echarts/line-chart.vue';
  export default {
    data(){
      return{
        countNumber:{
          options1:{//订单数
            startVal: 0,
            endVal: 1193
          },
          options2:{//访客数
            startVal: 0,
            endVal: 3306
          },
          options3:{//营业额
            startVal: 0,
            endVal: 1124
          },
          options4:{//收藏数
            startVal: 0,
            endVal: 5534
          },
        }
      }
    },
    mounted(){
      this.addData();
    },
    methods:{
      addData(){

      }
    },
    components:{
      countTo,
      chartLine
    }
  }
</script>
<style scoped lang="scss">
  .numbers-count{
    display: flex;
    justify-content: space-between;
    padding: 30px;
    .el-card-body{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      i.iconfont{
        font-size: 40px;
        margin: 10px;
      }
      .info{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        span{
          flex: 1;
          display: flex;
          justify-content: center;
        }
        span.count-number{
          font-size: 22px;
        }
      }
    }
    .primary{
      i{
        color: #409eff;
      }
      .count-number{
        color: #409eff;
      }
    }
    .success{
      i{
        color: #67c23a;
      }
      .count-number{
        color: #67c23a;
      }
    }
    .warning{
       i{
         color: #e6a23c;
       }
       .count-number{
         color: #e6a23c;
       }
    }
    .danger{
      i{
        color: #f56c6c;
      }
      .count-number{
        color: #f56c6c;
      }
    }

  }
  .echarts{
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    .echart-box{
      display: flex;
      flex-direction: column;
      .title-bar{
        .title{
          font-size: 18px;
          margin-right: 10px;
        }
      }
    }
  }
</style>
