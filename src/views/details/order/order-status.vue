<template>
  <div class="order-header">
    <!--交易关闭-->
    <div v-if="orderStatus.status==60" class="order-close">
      <p class="status-txt">当前订单状态 : 交易关闭</p>
      <p class="status-reason">原因：超时关闭</p>
    </div>
    <!--退款-->
    <div v-else-if="orderStatus.status==70||orderStatus.status==80" class="steps order-return">
      <!--失败-->
      <div v-if="orderStatus.returns == 3" class="order-close">
        <p class="status-txt">当前订单状态 : 退款失败</p>
        <p class="status-reason">原因：商家拒绝退款</p>
      </div>
      <!--成功-->
      <el-steps v-else :active="2" align-center finish-status="success">
        <el-step title="退款申请" description=""></el-step>
        <el-step title="卖家同意" description=""></el-step>
        <el-step title="确认收货" description=""></el-step>
      </el-steps>
    </div>
    <!--正常-->
    <div v-else class="steps order-success">
      <el-steps :active="orderStatus.status | status" align-center finish-status="success">
        <el-step title="拍下商品" :description="orderStatus.createTime"></el-step>
        <el-step title="买家付款" :description="orderStatus.paymentTime"></el-step>
        <el-step title="卖家发货" :description="orderStatus.sendTime"></el-step>
        <el-step title="确认收货" :description="orderStatus.endTime"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
  export default {
    props:['ordersStatus'],
    data(){
      return{
        orderStatus:{
          status:70,
          returns:'',
          createTime:'',
          paymentTime:'',
          sendTime:'',
          endTime:''
        }
      }
    },
    watch:{
      ordersStatus(val){
        this.orderStatus = val;
      }
    }
  }
</script>

<style scoped lang="scss">
  .order-header{
    margin:40px auto;
    .order-close{
      padding: 10px 20px;
      background: #fab6b6;
      border: 1px dashed #fab6b6;
      .status-txt{
        font-size: 16px;
      }
      .status-reason{
        font-size: 12px;
      }
    }
    .steps{
      padding: 10px 0;
    }
  }
</style>
