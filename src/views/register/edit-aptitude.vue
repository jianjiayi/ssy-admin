<template>
  <div class="qualification">
    <div class="alert-status">
      <div :class="formValidate.status!=50 ? 'alert' : 'alert error'"
      >
        <span v-if="formValidate.status==50">原因：{{formValidate.endyy}}</span>
        <span v-else>等待审核</span>
      </div>
    </div>

    <edit-qualification ref="qualification" :formData="formValidate" @submitSuccess="handleSubmit"></edit-qualification>
  </div>

</template>
<script>
  import editQualification from '@/components/edit-qualification.vue';
  const qs = require('qs');

  export default {
    data () {
      return {
        formValidate: {
          adminId:'',//商户Id
          vername:'',//真实姓名
          idcard:'',//身份证号码
          role:'2',//商户类型 2 个人-3 企业
          license:'',//营业执照编号
          product:'',//主营产品
          phone:'',//联系电话
          sheng:'',//省
          shi:'',//市
          quxian:'',//区县
          address:'',//详细地址
          bankcard:'',//银行账户
          bankadr:'',//开户行
          alipay:'',//支付宝
          wxpay:'',//微信
          verimages:'',//营业执照
          cardimg1:'',//身份证1
          cardimg2:'',//身份证2
          cardimg3:'',//身份证3
        }
      }
    },
    created(){
      this.addData();
    },
    watch:{
      formValidate(val,oldval){
        this.formValidate.role === 2 ? this.formValidate.role = '2' : this.formValidate.role = '3'
      }
    },
    methods: {
      addData(){
        let params = {};
        this.$ajax.post(process.env.API_HOST+'/Verification/getVerMes.do',qs.stringify(params)).then(res => {
          console.log(res)
          let json = res.data
          if(json.status != 0) return;

          this.formValidate = json.data;

        }).catch(function (error) {
          console.log(error);
        });
      },
      //提交
      handleSubmit (json) {
        console.log(json)
        if(json.status==0){
          this.$message({
            message: '资质修改成功',
            type: 'success'
          });
          this.$router.push({name:'auditStatus'});
        }
      },
    },
    components:{
      editQualification
    }
  }
</script>
<style scoped lang="scss">
  .qualification{
    width: 500px;
    margin: 0 auto;
    .id-card{
      display: flex;
      justify-content: space-between;
      > div{
        width: 45%;
      }
      .el-button{
        overflow: hidden;
        padding:0;
      }
      .model{
        img{
          width: 100%;
          height: 100px;
        }
      }
    }
  }
  .submit-btn{
    width: 100%;
  }
  .alert-status{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .alert{
      width: 600px;
      padding: 10px;
      margin-bottom: 40px;
      box-shadow: 0 0 5px #000;
      display: flex;
      justify-content: space-between;
      span{
        font-size: 14px;
        margin-right: 20px;
      }
      a{
        color: #ffffff;
        font-size: 14px;
      }
    }
    .error{
      background: #f56c6c;
    }
  }
  @media screen and (max-width: 500px){

  }
</style>
