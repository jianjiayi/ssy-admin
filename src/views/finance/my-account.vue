<template>
  <div class="">
    <div class="account">
      <div class="top-box">

        <div class="user">
          <div class="auther">
            <img v-if="getUser.avatar != ''" :src="getUser.avatar" alt="">
            <img v-else src="@/assets/img/logo_02.png" alt="">
          </div>
          <div class="info">
            <div class="name">
              {{getUser.nickname}}
            </div>
            <div class="tel">
              {{getUser.phone}}
            </div>
          </div>
        </div>

        <div class="money">
          <div>
            账户余额:
            <count-to class="count-number" :countData="countNumber"></count-to> 元
          </div>
          <div>
            绑定卡号:
            <span>1312137810119u940872893</span>
          </div>
          <div class="submit-btn">
            <el-button size="small" round type="success" plain @click="submitForm('ruleForm2')">提现</el-button>
          </div>
        </div>

        <div class="alert-info">
          <div>
            计算方法：总订单金额 - 总扣点金额 = 账户余额。
          </div>
          <div>
            到账日期：每次提现最小额度为￥100.00
            提现会在 1-5 个工作日内到账。
          </div>
        </div>

      </div>
      <div class="list-box">
        <div class="header-list">
          交易记录
        </div>
        <el-table
          :data="listTableData"
          stripe>
          <el-table-column
            label="转账时间"
            align="center"
            width="180">
            <template slot-scope="scope">
              {{scope.row.time}}
            </template>
          </el-table-column>
          <el-table-column
            label="类型"
            align="center"
            width="100">
            <template slot-scope="scope">
              {{scope.row.playType}}
            </template>
          </el-table-column>
          <el-table-column
            label="详情"
            header-align="center">
            <template slot-scope="scope">
              <div class="flex-container">
                <div class="">
                  收款账号： {{scope.row.accountNumber}}
                </div>
                <div class="">
                  转账单号： {{scope.row.playNumber}}
                </div>
              </div>
              <div class="sesc">
                备注： {{scope.row.desc}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="转账金额"
            align="center"
            width="200">
            <template slot-scope="scope">
              {{scope.row.money}} 元
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
            width="100">
            <template slot-scope="scope">
              {{scope.row.status}}
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <pagination :numbers="pageNums" :currentPage="currentPages" @currentChange="changePaging"></pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import countTo from '@/views/dashboard/components/countTo.vue';
  import pagination from '@/components/paging';
  import { mapMutations, mapGetters } from 'vuex';
  const qs = require('qs');
  export default {
    data() {
      return {
        listLoading:false,
        isBtnLoading: false,

        countNumber:{
          startVal: 0,
          endVal: 1193
        },

        listTableData: [
          {
            time:"2018-06-19 20:00:00",
            playType:1,
            accountNumber:'2312548172458127458921475891',
            playNumber:'11238123472-134782137423748',
            desc:"本月结算订单金额",
            money:3000,
            status:1,
          },
          {
            time:"2018-06-19 20:00:00",
            playType:1,
            accountNumber:'2312548172458127458921475891',
            playNumber:'11238123472-134782137423748',
            desc:"本月结算订单金额",
            money:3000,
            status:1,
          },
          {
            time:"2018-06-19 20:00:00",
            playType:1,
            accountNumber:'2312548172458127458921475891',
            playNumber:'11238123472-134782137423748',
            desc:"本月结算订单金额",
            money:3000,
            status:1,
          },
          {
            time:"2018-06-19 20:00:00",
            playType:1,
            accountNumber:'2312548172458127458921475891',
            playNumber:'11238123472-134782137423748',
            desc:"本月结算订单金额",
            money:3000,
            status:1,
          },
          {
            time:"2018-06-19 20:00:00",
            playType:1,
            accountNumber:'2312548172458127458921475891',
            playNumber:'11238123472-134782137423748',
            desc:"本月结算订单金额",
            money:3000,
            status:1,
          },
          {
            time:"2018-06-19 20:00:00",
            playType:1,
            accountNumber:'2312548172458127458921475891',
            playNumber:'11238123472-134782137423748',
            desc:"本月结算订单金额",
            money:3000,
            status:1,
          },
          {
            time:"2018-06-19 20:00:00",
            playType:1,
            accountNumber:'2312548172458127458921475891',
            playNumber:'11238123472-134782137423748',
            desc:"本月结算订单金额",
            money:3000,
            status:1,
          },
          {
            time:"2018-06-19 20:00:00",
            playType:1,
            accountNumber:'2312548172458127458921475891',
            playNumber:'11238123472-134782137423748',
            desc:"本月结算订单金额",
            money:3000,
            status:1,
          },
          {
            time:"2018-06-19 20:00:00",
            playType:1,
            accountNumber:'2312548172458127458921475891',
            playNumber:'11238123472-134782137423748',
            desc:"本月结算订单金额",
            money:3000,
            status:1,
          },
        ],
        pageNums:'',
        currentPages : 1,
      }
    },
    created(){
      this.addData(1);
    },
    computed:{
      ...mapGetters(['getUser'])
    },
    methods:{
      //加载数据
      addData(n){
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

      //分页
      changePaging(val){
        this.currentPages = val;
        this.addData(val,this.searchFrom);
      },

    },
    components:{
      countTo,
      pagination
    }
  }
</script>
<style scoped lang="scss">
  .account{
    width: 100%;
    .top-box{
      display: flex;
      padding: 30px 50px;
      .user{
        flex: 2;
        font-size: 12px;
        display: flex;
        align-items: center;
        border-right: 1px solid #CCCCCC;
        padding-left: 30px;
        .auther{
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border:1px solid #ccc;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .info{
          margin-left: 10px;
          .name{
            font-size: 14px;
          }
          .tel{
            font-size: 16px;
            line-height: 30px;
          }
        }
      }
      .money{
        flex: 3;
        border-right: 1px solid #CCCCCC;
        padding-left: 30px;
        margin:0 30px;
        font-size: 14px;
        >div{
          margin-bottom: 10px;
        }
        .count-number{
          font-size: 18px;
          font-weight: bold;
        }
        .submit-btn{
          margin-top:10px;
          .el-button{
            width: 100px;
          }
        }
      }

      .alert-info{
        flex: 4;
        background-color: #f4f4f5;
        color: #909399;
        padding: 8px 16px;
        margin: 0;
        border-radius: 4px;
        position: relative;
        overflow: hidden;
        opacity: 1;
        -webkit-transition: opacity .2s;
        transition: opacity .2s;
        color: #909399;
        font-size: 13px;
        line-height: 18px;
        div{
          margin-bottom: 20px;
        }
      }
    }
    .list-box{
      .header-list{
        line-height: 30px;
        margin: 10px 0;
        font-size: 16px;
        border-bottom: 1px solid #CCCCCC;
      }
      .flex-container{
        display: flex;
        >div{
          margin-right: 20px;
          font-size: 12px;
        }
      }
    }
  }

</style>
