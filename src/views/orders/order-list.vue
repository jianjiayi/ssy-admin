<template>
  <section v-loading="listLoading">
    <el-row class="topLine">
      <el-col :span="24">
        <!--多条件搜索-->
        <search-form :searchForm="searchform" @searchBtn="searchList"></search-form>
      </el-col>
    </el-row>

    <!--标签页-->
    <tab-pane :tabs="tabsOptions" :activeLabel="tabActiveIndex" @changeTabs="changeTableData"></tab-pane>

    <!--列表-->
    <orders-list :listTableData="listData" @sendGoods="sendGoods" @lookLogistics="Logistics"></orders-list>

    <!--分页-->
    <pagination :numbers="pageNums" :currentPage="currentPages" @currentChange="changePaging"></pagination>

    <!--物流-->
    <el-dialog
      title="物流信息"
      :visible.sync="logisticsDialogVisible"
      width="600px"
      center>
      <order-wuliu :orderUser="orderUser" :logistics="logisticsData"></order-wuliu>
      <!--<logistics-details :logisticsInfo="logisticsData"></logistics-details>-->
    </el-dialog>

    <!--物流-->
    <el-dialog
      title="确认发货"
      :visible.sync="sedGoodsVisible"
      width="450px"
      center>
      <send-goods :ordersExpress="orderExpress" :orderInfo="orderInfo" @sendGoodsSubmit="sendGoodsSubmit"></send-goods>
    </el-dialog>

  </section>
</template>
<script>
  import searchForm from '@/components/searchForm';
  import tabPane from '@/components/tabpane';
  import ordersList from '@/components/lists/orderslist';
  import pagination from '@/components/paging';
  import orderWuliu from '@/views/details/order/order-wuliu.vue';
  import logisticsDetails from '@/components/details/logisticsDetails';
  import sendGoods from  '@/components/send-goods.vue';

  const qs = require('qs');

  export default {
    data() {
      return {
        listLoading:false,
        isloading: false,

        tabsOptions:[
          {
            value:1,
            label:'所有'
          },
          {
            value:10,
            label:'待付款'
          },
          {
            value:20,
            label:'待发货'
          },
          {
            value:40,
            label:'待收货'
          },
          {
            value:50,
            label:'已完成'
          },
          {
            value:70,
            label:'退款中'
          },
          {
            value:80,
            label:'退款完成'
          }
        ],
        tabActiveIndex:'所有',

        tabsStatus:1,
        listData: [],
        pageNums:'',//总页数
        nowPages:'',//当前页
        currentPages : 1,

        //物流
        logisticsDialogVisible:false,
        orderUser:{},
        logisticsData:{},
        //发货
        sedGoodsVisible:false,
        orderExpress:{
          orderNo:'',
          expressName:'',
          expressNo:'',
        },
        orderInfo:{
          oIndex :'',
          oStatus: '',
        },

        //搜索
        searchform:[
          {
            value:'',
            name:'orderNo',
            label:'订单编号',
          },
          {
            value:'',
            name:'productName',
            label:'商品名称',
          },
          {
            value:'',
            name:'userName',
            label:'买家昵称',
          },
        ],
        searchActive:false,
      }
    },
    created(){
      this.addData(1,this.tabsStatus);
    },
    methods:{
      //加载数据
      addData(n,status){
        this.listLoading = true;
        let params = {
          pageNum : n,//当前访问页数
          statusNum:status,
        }
        this.$ajax.post(process.env.API_HOST+'/order/selectAdminOrderList.do?',qs.stringify(params)).then(res => {
          console.info(res);

          if(res.data.status==1 && res.data.msg=='没有相关订单'){
            this.listLoading = false;
            this.pageNums = '';
            this.listData = [];
            return
          };

          this.listLoading = false;
          let json = res.data.data;
          this.pageNums = json.pages;
          this.listData = json.list;
        }).catch(function (error) {
          console.log(error);
        });
      },
      Logistics(orderData){
        this.logisticsDialogVisible = true;
        this.orderUser = {
          orderNo: orderData.orderNo,
          name: orderData.receivername,
          phone: orderData.userphone,
          adress: orderData.address,
          img:orderData.orderManagemesVo[0].productImage,
          num:orderData.orderManagemesVo.length
        };
        let params = {
          orderNo:orderData.orderNo
        }
        this.$ajax.post(process.env.API_HOST+'/order/selectexpressByOrderNo.do?',qs.stringify(params)).then(res => {
          console.info('res:'+JSON.stringify(res));
          this.logisticsData = res.data.data.showapi_res_body;
        }).catch(function (error) {
          console.log(error);
        });
      },
      //发货
      sendGoods(form){
        this.sedGoodsVisible = true;
        this.orderExpress = {
          orderNo:form.data.orderNo,
          expressName:form.data.expressname,
          expressNo:form.data.expressno,
        };
        console.log(this.orderExpress)
        this.orderInfo = {
          oIndex :form.index,
          oStatus: form.status,
        }
      },
      sendGoodsSubmit(status){
        this.sedGoodsVisible = false;
        if(status == 0){
          this.$set(this.listData[this.orderInfo.oIndex],'status',40);//更新 数据

          this.addData(this.nowPages,this.tabsStatus);
        }
      },
      //分页
      changePaging(val){
        this.currentPages = val;
        this.nowPages = val;
        this.searchActive == false ? this.addData(val,this.tabsStatus) : this.searchFormList(val,this.serachParams);
      },
      //分类
      changeTableData(label){
        console.log(label);
        this.searchActive = false;//冻结搜索状态

        this.currentPages = 1;//分页默认第一页

        this.tabActiveIndex = label;//修改标签选中值

        let tab = this.tabsOptions.find(n => n.label === label);
        this.tabsStatus = tab.value;
        this.addData(1,this.tabsStatus);//加载数据

        //重置搜索状态
        this.searchform.map(n => {
          n.value = '';
        });
      },

      //搜索
      searchList(Form){
        this.searchActive = true;//激活搜索状态

        this.tabActiveIndex = this.tabsOptions[0].label;//激活标签所有

        let i = 0;
        Form.map(n => {
          n.value == '' ? i++ : '';
          this.serachParams[n.name] = n.value;
        });

        Form.length === i ? this.addData(1,1) : this.searchFormList(1,this.serachParams);
      },
      searchFormList(n,params){
        this.listLoading = true;
        params['pageNum'] = n;//搜索页数

        this.$ajax.post(process.env.API_HOST+'/order/SelectOrderMes.do',qs.stringify(params)).then(res => {
          console.info(res);

          if(res.data.status==1 && res.data.msg=='没有相关订单信息'){
            this.listLoading = false;
            this.pageNums = '';
            this.listData = [];
            this.tabsStatus = 1;//分类：1
            return
          };

          let json = res.data.data;
          this.pageNums = json.pages;
          this.listData = json.list;

          this.tabsStatus = 1;//分类：1

          this.listLoading = false;
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    components:{
      ordersList,
      searchForm,
      tabPane,
      pagination,
      orderWuliu,
      logisticsDetails,
      sendGoods
    }
  }
</script>
<style scoped lang="scss">

</style>


