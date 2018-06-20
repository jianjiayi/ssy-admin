<template>
  <div class="qualification">
    <edit-qualification :formData="formValidate" @submitSuccess="handleSubmit"></edit-qualification>
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
    methods: {
      //提交
      handleSubmit (json) {
        console.log(json)
        if(json.status==0){
          this.$message({
            message: '资质上传成功，请等待审核',
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
  @media screen and (max-width: 500px){

  }
</style>
