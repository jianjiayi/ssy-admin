<template>
  <div v-loading="listLoading">
    <el-row class="topLine">
      <el-col :span="24">
        <!--多条件搜索-->
        <el-col :span="19">
          <template>
            <el-form :inline="true" class="demo-form-inline">
              <!--结算状态-->
              <el-form-item >
                <el-select size="mini" v-model="searchFrom.value1" placeholder="结算状态" @change="selectStatus()">
                  <el-option size="mini" v-for="item in searchFrom.options1" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
              <!--查询月份-->
              <el-form-item >
                <el-date-picker size="mini" v-model="searchFrom.value3"  :clearable="false" type="month" placeholder="选择月"  format="yyyy 年 MM 月" value-format="timestamp" :picker-options="pickerBeginDateAfter" @change="selectTime()"> </el-date-picker>
              </el-form-item>



              <el-form-item>
                <el-button size="mini" type="success" plain icon="fa fa-search" @click="searchAdmin()">查询</el-button>
                <el-button size="mini" type="info" plain  @click="resetData()">重置</el-button>
              </el-form-item>
            </el-form>
          </template>

        </el-col>
        <el-col :span="5">
          <el-row type="flex" class="row-bg" justify="end">
            <template>
              <el-form :inline="true" class="demo-form-inline">
                <!--全部导出-->
                <el-form-item>
                  <el-button size="mini" type="success"  @click="exportExcel()">导出</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-row>
        </el-col>
      </el-col>
    </el-row>



    <!--列表-->
    <el-table
      :data="listTableData"
      stripe
      style="width: 100%">
      <el-table-column
        label="订单编号">
        <template slot-scope="scope">
         {{scope.row.orderNo}}
        </template>
      </el-table-column>
      <el-table-column
        label="完成时间"
        align="center">
        <template slot-scope="scope">
          {{scope.row.endTime}}
        </template>
      </el-table-column>
      <el-table-column
        label="支付类型"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.paymentType == 2 ? '' : 'warning'"
            close-transition
            size="mini">
            {{scope.row.paymentType | typeStatus}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="订单金额"
        align="center">
        <template slot-scope="scope">
          ￥{{scope.row.payment}}
        </template>
      </el-table-column>

      <el-table-column
        label="扣点金额"
        align="center">
        <template slot-scope="scope">
          ￥{{scope.row.setmoney}}
        </template>
      </el-table-column>
      <el-table-column
        label="结算金额"
        align="center">
        <template slot-scope="scope">
          ￥{{scope.row.money}}
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        align="center">
        <template slot-scope="scope">
          <span>
             <el-tag
               :type="scope.row.setstatus == 1 ? 'success' : 'danger'"
               close-transition
               size="mini">
              {{scope.row.setstatus | reviewStatus}}
            </el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <router-link :to="{path:'/detail/orders',query: {id:scope.row.orderNo}}" target="_blank">
            查看详情
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <!--导出excel-->
    <el-dialog
      title="导出Excel"
      :visible.sync="excelDialogVisible"
      width="590px"
      center>
      <el-form :inline="true">
        <!--商户类型-->
        <!--结算状态-->
        <el-form-item >
          <el-select size="mini" v-model="ExcelForm.value1" placeholder="结算状态" @change="selectStatus()">
            <el-option size="mini" v-for="item in ExcelForm.options1" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <!--查询月份-->
        <el-form-item >
          <el-date-picker size="mini" v-model="ExcelForm.value3"  :clearable="false" type="month" placeholder="选择月"  format="yyyy 年 MM 月" value-format="timestamp" :picker-options="pickerBeginDateAfter" @change="selectTime()"> </el-date-picker>
        </el-form-item>


        <el-form-item>
          <el-button size="mini" type="primary" plain  @click="exportExcelTop(searchFrom)">确定导出表格</el-button>
        </el-form-item>
      </el-form>
      <el-alert
        title="导表说明"
        type="warning"
        :closable="false"
        description="导出所选订单类型与所选月份所有订单，在这一个月内的数据">
      </el-alert>
    </el-dialog>

    <!--分页-->
    <pagination :numbers="pageNums" :currentPage="currentPages" @currentChange="changePaging"></pagination>

  </div>
</template>
<script>

  import pagination from '@/components/paging';

  const qs = require('qs');
  export default {
    data() {
      return {
        listLoading:false,
        isBtnLoading: false,
        activeStatus:false,

        playPasswordDialogVisible:false,
        playVisible:false,
        searchFrom:{
          options1: [{
            value: '0',
            label: '未结算'
          }, {
            value: '1',
            label: '已结算',
            disabled: false,
          }],
          value1: '0',//默认未结算

          value3: Date.now(),//当前日期
        },
        //设置结束日期
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            return time.getTime() > Date.now();
          }
        },
        //导表
        excelDialogVisible:false,
        ExcelForm:{},


        listTableData: [],
        pageNums:'',
        currentPages : 1,


      }
    },
    created(){
      this.addData(1,this.searchFrom);
    },
    filters:{
      typeStatus(type){
        let status = '';
        type === 2 ? status = '线下支付' : status = '在线支付';
        return status;
      },
      reviewStatus(val){
        let status = '';
        val === 1 ? status = '已结算' : status = '未结算';
        return status;
      },
    },
    methods:{
      selectStatus(){
        console.log(this.searchFrom.value1)
      },
      selectTime(){
        console.log(this.searchFrom.value3)
      },
      //加载数据
      addData(n,searchFrom){
        this.listLoading = true;
        let params = {
          pageNum : n,//当前访问页数
          setstatus:searchFrom.value1,
          datetime:searchFrom.value3,
        };
        this.$ajax.post(process.env.API_HOST+'/finance/selectfinorder.do?',qs.stringify(params)).then(res => {
          console.info('res:'+JSON.stringify(res));


          if(res.data.status==1 && res.data.msg=='没有相关订单信息'){
            this.listLoading = false;
            this.pageNums = '';
            this.listTableData = [];
            return
          };

          this.listLoading = false;
          let json = res.data.data
          this.pageNums = json.pages;
          this.listTableData = json.list;
        }).catch(function (error) {
          console.log(error);
        });
      },
      //多条件搜索
      searchAdmin(){
        this.addData(1,this.searchFrom)
      },
      //重置所有条件
      resetData(){
        this.searchFrom.value1='0';//默认未结算
        this.searchFrom.value3=Date.now();//当前日期
        this.addData(1,this.searchFrom);
      },
      //导出excel
      exportExcel(){
        this.excelDialogVisible = true;
        this.ExcelForm = Object.assign({}, this.searchFrom);
      },
      exportExcelTop(searchFrom){
        let params = {
          pageNum : 1,//当前访问页数
          setstatus:searchFrom.value1,
          datetime:searchFrom.value3,
        };
        this.$ajax.post(process.env.API_HOST+'/finorder/ExportExcel.do',qs.stringify(params)).then(res => {
          console.info('res:'+JSON.stringify(res));
          //登录超时
          if(res.data.status != 0 && res.data.msg=='管理员未登录，无法获取当前商户信息'){
            return this.$router.push({ path: '/login', query: { from: this.$router.currentRoute.path } });
          }

          if(res.data.status==1 && res.data.msg=='数据为null，不可以导出'){
            this.$message({
              message: res.data.msg,
              type: 'warning'
            });
            return
          };
          this.funDownload(res.data.data,res.data.msg);

          this.excelDialogVisible = false;

        }).catch(function (error) {
          console.log(error);
        });
      },
      //下载Excel
      funDownload(href,title) {
        console.log('title:'+title)
        var a = document.createElement('a');
        a.download = title;
        a.href = href;
        a.click();
      },
      //分页
      changePaging(val){
        this.currentPages = val;
        this.addData(val,this.searchFrom);
      },

    },
    components:{
      pagination
    }
  }
</script>
<style scoped lang="scss">
  a{
    font-size: 12px;
    line-height: 30px;
    color: #3a8ee6;
    text-decoration: underline;
  }
  a:hover{
    color: #2cca9a;
  }
  .topLine{
    margin-top: 10px;
    .el-form-item{
      margin-bottom: 0;
    }
  }
</style>
