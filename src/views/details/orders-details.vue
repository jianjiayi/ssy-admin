<template>
  <div v-loading="listLoading">
    <div class="status">
      <p class="title">订单状态</p>
      <order-status :ordersStatus="orderStatus"></order-status>
    </div>

    <div class="details">
      <p class="title">订单详情</p>
      <order-detail :ordersData="orderData"></order-detail>
    </div>

    <div class="display-flex">
      <div class="flex-box">
        <p class="title">物流信息</p>
        <div class="logistics">
          <order-wuliu :orderUser="orderUser" :logistics="logisticsData"></order-wuliu>
        </div>
      </div>

      <div class="flex-box">
        <p class="title">评论信息</p>
        <div class="ping-lun">
          <order-pinglun :messageArray="messageArray" @reloadMessage="reloadMessage"></order-pinglun>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import orderStatus from '@/views/details/order/order-status.vue';
  import orderDetail from '@/views/details/order/order-detail.vue';
  import orderWuliu from '@/views/details/order/order-wuliu.vue';
  import orderPinglun from '@/views/details/order/order-pinglun.vue'
  const qs = require('qs');
  export default {
    data(){
      return{
        listLoading:false,
        orderData:[],
        orderUser:{},
        logisticsData:{},

        messageArray:[],
        id : '',
      }
    },
    created(){
      let id =  this.$route.query.id;
      this.id = id;
      this.addData(id);
      this.lookLogistics(id);
    },
    methods:{
      addData(id){
        this.listLoading = true;
        let params = {
          orderNo : id,
        }
        this.$ajax.post(process.env.API_HOST+'/order/selectOedreDetail.do?',qs.stringify(params)).then(res => {
          console.info('res:'+JSON.stringify(res));
          let json = res.data
          if(json.status != 0) return;

          let data = json.data.list;
          this.orderData = data;
          this.orderStatus = {
            status:this.orderData[0].status,
            returns:this.orderData[0].endyy,
            createTime:this.orderData[0].createTime,
            paymentTime:this.orderData[0].paymentTime,
            sendTime:this.orderData[0].sendTime,
            endTime:this.orderData[0].endTime
          };
          this.orderUser = {
            orderNo: this.orderData[0].orderNo,
            name: this.orderData[0].receivername,
            phone: this.orderData[0].userphone,
            adress: this.orderData[0].address,
            img:this.orderData[0].orderManagemesVo[0].productImage,
            num:this.orderData[0].orderManagemesVo.length
          };
          this.messageArray = [];
          for(let i = 0; i < this.orderData[0].orderManagemesVo.length; i++){
            this.addPingLun(id,this.orderData[0].orderManagemesVo[i],1)
          }
          this.listLoading = false;
        }).catch(function (error) {
          console.log(error);
        });
      },
      lookLogistics(id){
        let params = {
          orderNo:id,
        }
        let _this = this;
        this.$ajax.post(process.env.API_HOST+'/order/selectexpressByOrderNo.do?',qs.stringify(params)).then(res => {
          console.info('res:'+JSON.stringify(res));
          _this.logisticsData = res.data.data.showapi_res_body;
          console.log(this.logisticsData)
        }).catch(function (error) {
          console.log(error);
        });
      },
      addPingLun(orderNo,product,pageNum){
        let params = {
          orderNo:orderNo,
          productId:product.productId,
          pageNum:pageNum,
        };
        this.$ajax.post(process.env.API_HOST+'/message/selectcomments.do?',qs.stringify(params)).then(res => {
          console.info('res:'+JSON.stringify(res));
          let json = res.data;
          let data = [];
          if(json.status == 0){
            data = json.data.list;
          }

          this.messageArray.push({
            product : product,
            message : data
          })
        }).catch(function (error) {
          console.log(error);
        });
      },
      reloadMessage(){
        this.messageArray = [];
        for(let i = 0; i < this.orderData[0].orderManagemesVo.length; i++){
          this.addPingLun(this.id,this.orderData[0].orderManagemesVo[i],1)
        }
      }
    },
    components:{
      orderStatus,
      orderDetail,
      orderWuliu,
      orderPinglun
    }
  }
</script>
<style scoped lang="scss">
  p.title{
    margin-bottom: 0;
  }
  .status,
  .details,
  .wuliu,
  .pinglun{
    padding: 0px 20px;
  }
  .display-flex{
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    .flex-box{
      margin-top: 10px;
      width: 530px;
      .title{
        margin-bottom: 20px;
      }
      .logistics,
      .ping-lun{
        background: #ffffff;
      }
    }
  }
</style>
