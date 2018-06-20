<template>
  <div class="check-tel">
    <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="80px" size="small" @keyup.enter.native="handleSubmit('formValidate')">

      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formValidate.phone" placeholder="绑定手机号"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="c">
        <div class="item-content">
          <el-input v-model="formValidate.c" placeholder="输入验证码"></el-input>
          <span style="margin-left:10px">
                  <el-button type="ghost" :disabled="isDisabled"  @click="handleSendCode()">{{codeText}}</el-button>
                </span>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="submit-btn" type="primary" @click="handleSubmit('formValidate')" :loading="isBtnLoading">{{btnText}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  const qs = require('qs');
  export default {
    data(){
      let phoneValidate = (rule, value, callback) => {
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (!reg.test(value)) {
          callback(new Error('手机号格式不正确'));
        } else {
          this.isDisabled=false,
            callback();
        };
      };
      return{
        isBtnLoading: false,


        isDisabled:true,
        count:'',
        timer:null,
        codeText:'点击发送验证码',


        formValidate:{
          phone:'',
          c:''
        },
        ruleValidate: {
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: phoneValidate, trigger: 'change' }
          ],
          c: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        }
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '正在提交...';
        return '提交';
      }
    },
    methods:{
      //获取验证码倒计时
      handleSendCode(){
        const TIME_COUNT = 30;
        if (!this.timer){
          this.count = TIME_COUNT;
          this.isDisabled = true;
          this.getMessageCode();//调用获取验证码

          this.timer = setInterval(() =>{
            if(this.count > 0 && this.count <= TIME_COUNT){
              this.count--;
              this.codeText = this.count+"秒后重新发送";

            }else{
              this.codeText = "点击发送验证码"
              this.isDisabled = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          },1000)
        }
      },
      //获取短信验证码
      getMessageCode(){
        let params = {
          phone:this.formValidate.phone
        };
        this.$ajax.post(process.env.API_HOST+'/personal/sendCode.do',qs.stringify(params)).then(res => {
          console.log(res)
          let json = res.data
          if(json.status != 0) return;

        }).catch(function (error) {
          console.log(error);
        });
      },
      //提交表单
      handleSubmit (name) {
        let _this = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            _this.isBtnLoading = true;
            let params = {
              phone:_this.formValidate.phone,
              c:_this.formValidate.c
            };
            _this.$ajax.post(process.env.API_HOST+'/personal/chickCode.do',qs.stringify(params)).then(res => {
              console.log(res)
              let json = res.data;
              _this.isBtnLoading = false;
              //验证码失效
              if(json.status != 0){
                alert(json.msg);
                return;
              }
              this.formValidate={
                phone:'',
                c:''
              };
              _this.$emit('editTelSubmit',_this.formValidate.phone)
            }).catch(function (error) {
              console.log(error);
            });
          } else {
            console.log('Fail!');
          }
        })
      },
    }
  }
</script>
<style scoped lang="scss">
  .check-tel{
    position: relative;
    width: 350px;
    margin: 0 auto;
    .item-content{
      display: flex;
      justify-content: space-between;
    }
  }
  .submit-btn{
    width: 100%;
  }
</style>
