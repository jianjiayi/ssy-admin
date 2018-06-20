<template>
  <!--订单-->
  <div class="order-list">
    <el-table
      :data="orderData"
      stripe
      border
      style="width: 100%;">
      <el-table-column
        label="宝贝"
        prop="id"
        header-align="center"
        width="500px">
        <template slot-scope="scope">
          <!--详情-->
          <div>
            <!---->
            <el-row type="flex" class="row-bg">
              <el-col :span="14">

              </el-col>
              <el-col :span="3">
                <span class="mini-size">
                   单价
                </span>
              </el-col>
              <el-col :span="3">
                <span class="mini-size">
                   数量
                </span>
              </el-col>
              <el-col :span="4">
                <span class="mini-size">
                   邮费
                </span>
              </el-col>
            </el-row>
            <!---->
            <el-row type="flex" class="row-bg  product" v-for="(item,index) in scope.row.orderManagemesVo" :key="index">
              <el-col :span="14" class="display-flex">
                <span class="main-img">
                  <img v-show="item.productImage" :src="item.productImage" alt="暂无">
                </span>
                <div class="text">
                  <div>
                    <router-link  :to="{path:'/detail/goods',query: {id:item.productId}}" target="_blank">
                      {{item.productName}}
                    </router-link>
                  </div>
                  <div>
                    <span v-if="item.conditionalMail==1">根据件数包邮 , 满  {{item.enoughNum}} 件包邮</span>
                    <span v-else-if="item.conditionalMail==2">根据钱数包邮 , 满 {{item.enoughMoney}} 元包邮</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="3" class="item-center">
                <span class="mini-size">
                  ￥{{item.currentUnitPrice}}
                </span>
              </el-col>
              <el-col :span="3" class="item-center">
                <span class="mini-size">
                  × {{item.quantity}}
                </span>
              </el-col>
              <el-col :span="4" class="item-center">
                <span class="mini-size">
                  ￥{{item.postage}}
                </span>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="实收款"
        align="center">
        <template slot-scope="scope">
          ￥{{scope.row.payment}}
          <div class="mini-size">(含运费￥{{scope.row.postage}})</div>
        </template>
      </el-table-column>
      <el-table-column
        label="结算方式"
        align="center">
        <template slot-scope="scope">
          <el-tag
            v-show="scope.row.status!=10"
            :type="scope.row.paymentType == 1 ? '' : 'warning'"
            close-transition
            size="mini">
            {{scope.row.paymentType | paymentTypeStatus}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="买家"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" class="abtn">{{scope.row.receivername}}</el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="status"
        label="交易状态"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :type="operatingStatusType(scope.row.status)"
            close-transition
            size="mini">
            {{scope.row.status | operatingStatus}}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    props:['ordersData'],
    data(){
      return{
        orderData:[],//数据
        activeItem:'',
      }
    },
    watch:{
      ordersData(val){
        console.log(val)
        this.orderData = val;
      }
    },
    filters:{
      status(val){
        switch(val)
        {
          case 10:
            return 1;
            break;
          case 20:
            return 2;
            break;
          case 40:
            return 3;
            break;
          case 50:
            return 4;
            break;
        }
      },
      paymentTypeStatus(type){
        let status = {};
        type === 0 ? status = '货到付款' : status = '在线支付';
        return status;
      },
      typeStatus(type){
        let status = {};
        type === 0 ? status = '货到付款' : status = '在线支付';
        return status;
      },
      operatingStatus: function (value) {
        let state = '';
        switch(value){
          case 10 :
            return state = '待付款';
            break;
          case 20 :
            return state = '待发货';
            break;
          case 40 :
            return state = '待收货';
            break;
          case 50 :
            return state = '已完成';
            break;
          case 60 :
            return state = '交易关闭';
            break;
          case 70 :
            return state = '退款中';
            break;
          case 80 :
            return state = '退款完成';
            break;
        }
        return state;
      }
    },
    methods:{
      operatingStatusType(value){
        let state = '';
        switch(value){
          case 10 :
            return state = '';
            break;
          case 20 :
            return state = 'warning';
            break;
          case 40 :
            return state = 'info';
            break;
          case 50 :
            return state = 'success';
            break;
          case 60 :
            return state = 'danger';
            break;
          case 70 :
            return state = 'info';
            break;
          case 80 :
            return state = 'success';
            break;
        }
        return state;
      },
    }
  }
</script>
<style scoped lang="scss">
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    margin-bottom: 0;
  }
  .order-list{
    margin-top: 40px;
  }
  a{
    font-size: 12px;
    line-height: 30px;
    color: #3a8ee6;
    text-decoration: underline;
  }
  a:hover{
    color: #2cca9a;
  }
  .abtn{
    color: #2a393c;
    text-decoration: underline;
  }
  .abtn:hover{
    color: #3a8ee6;
  }
  .mini-size{
    font-size: 10px;
  }
  .tel{
    color: #dd6161;
  }
  .btn-text{
    color: #dd6161;
  }
  .btn-text:hover{
    color: #3a8ee6;
  }
  .display-flex{
    display: flex;
    .text{
      margin-left: 10px;
    }
  }
  .item-center{
    display: flex;
    align-items: center;
  }
  .product{
    border-bottom: 1px dashed #b4bccc;
  }
  .product:last-child{
    border:none;
  }
  .main-img{
    max-width: 80px;
    max-height: 50px;
    background: #cccccc;
    display: block;
    overflow: hidden;
    margin: 3px 0;
    box-shadow: 0 0 3px #000;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .el-form-item__label{
    font-size: 10px;
  }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
