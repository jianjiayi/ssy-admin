<template>
  <div class="check-tel">
    <p class="title">订单编号：<span>{{formValidate.orderNo}}</span></p>
    <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="80px" size="small" @keyup.enter.native="handleSubmit('formValidate')">
      <el-form-item label="快递名称" prop="expressName">
        <el-select style="width: 220px;" v-model="formValidate.expressName" placeholder="请选择快递" @change="selectVal">
          <el-option
            v-for="item in expressData"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="快递单号" prop="expressNo">
        <el-input v-model="formValidate.expressNo" placeholder="请输入快递单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit-btn" type="primary" @click="handleSubmit('formValidate')" :loading="isBtnLoading">{{btnText}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { Express } from '@/assets/js/express.js';
  const qs = require('qs');
  export default {
    props:['ordersExpress'],
    data(){
      return{
        isBtnLoading: false,
        expressData:Express,
        formValidate:{
          orderNo:'',
          expressName:'huitong',
          expressNo:'',
        },
        ruleValidate: {
          expressName: [
            { required: true, message: '请选择一家快递', trigger: 'blur' },
          ],
          expressNo: [
            { required: true, message: '请输入快递单号', trigger: 'blur' },
          ],
        }
      }
    },
    created(){
      this.formValidate = this.ordersExpress;
    },
    watch:{
      ordersExpress(val){
        console.log(val)
        this.formValidate = val;
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '正在提交...';
        return '提交';
      }
    },
    methods:{
      selectVal(val){
        console.log('val:'+val);
      },
      //提交表单
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.isBtnLoading = true;
            let params = this.formValidate;
            this.$ajax.post(process.env.API_HOST+'/order/sendgoods.do?',qs.stringify(params)).then(res => {
              console.log(res)
              let json = res.data;
              this.isBtnLoading = false;
              //验证码失效
              if(json.status != 0){
                alert(json.msg);
                return;
              }
              this.$emit('sendGoodsSubmit',json.status);
              this.resetForm('formValidate');
            }).catch(function (error) {
              console.log(error);
            });
          } else {
            console.log('Fail!');
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped lang="scss">
  .check-tel{
    position: relative;
    width: 300px;
    margin: 0 auto;
    .title{
      font-size: 16px;
      margin-top:-20px;
      span{
        color: #140000;
      }
    }
    .item-content{
      display: flex;
      justify-content: space-between;
    }
  }
  .submit-btn{
    width: 100%;
  }
</style>
