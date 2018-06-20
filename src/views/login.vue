<template>
  <div class="login">
    <div class="login-box">
      <div class="left-box">
        <div class="logo">
          <img src="@/assets/img/logo_0_1.png" alt="">
        </div>
      </div>
      <div class="right-box">
        <div class="login-form">
          <div class="title">
            <div class="name">
              <router-link to="/">上实源</router-link>
              管理后台
            </div>
            <router-link to="/register">注册</router-link>
          </div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
            @keyup.enter.native="submitForm('ruleForm')">
            <el-form-item prop="phone">
              <el-input type="text" v-model="ruleForm.phone" auto-complete="off" placeholder="请输入用户名">
                <i slot="prefix" class="iconfont icon-gerenzhongxin"></i>
              </el-input>
            </el-form-item>
            <el-form-item  prop="password">
              <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="请输入密码">
                <i slot="prefix" class="iconfont icon-shurumima"></i>
              </el-input>
            </el-form-item>
            <p class="forget-password">
              <router-link to="/portal/forget">忘记密码?</router-link>
            </p>
            <el-form-item style="text-align: center">
              <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')" :loading="isBtnLoading">{{btnText}}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const qs = require('qs');
  import { mapMutations } from 'vuex';
  export default {
    data() {
      let validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      return {
        isBtnLoading: false,
        ruleForm: {
          phone:'17611158859',
          password: '111111',
        },
        rules: {
          phone:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { validator: validateName, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 6, message: '请输入6位密码', trigger: 'blur' }
          ]
        }
      };
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      }
    },
    methods: {
      ...mapMutations(['setUser']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isBtnLoading = true;
            //调用axios上传
            this.$ajax.post(process.env.API_HOST+'/personal/PersonalLogin.do',qs.stringify(this.ruleForm)).then(res => {
              console.log(res)
              this.isBtnLoading = false;
              let json = res.data
              if(json.status != 0){
                alert(json.mag)
                return;
              }

              let item = {
                user : json.data,
                token :json.data.sessinid
              }
              this.setUser(item);
              //json.data.verstatus ==40 资质审核通过，否则失败
              console.log('json.data.verstatus :'+json.data.verstatus )
              json.data.verstatus == 40 ? this.$router.push({name: 'home'}) :  this.$router.push({name:'auditStatus'});

            }).catch(function (error) {
              console.log(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>
<style scoped lang="scss">
  .login{
    position: absolute;
    left:0;
    right: 0;
    top:0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("../assets/img/bg01.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    .login-box{
      width: 800px;
      height: 440px;
      display: flex;
      justify-content: space-between;
      background-image: url("../assets/img/bg02.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      .left-box{
        width: 40%;
        display: flex;
        align-items: center;
        margin-left: 150px;
        .logo{
          width: 150px;
          img{
            width: 100%;
          }
        }
      }
      .right-box{
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: center;
        .login-form{
          display: flex;
          flex-direction: column;
          align-items: center;
          .title{
            width: 250px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #190100;
            padding-bottom: 5px;
            font-size: 14px;
            .name{
              font-weight: bold;
            }
            a{
              text-decoration: none;
              color: #00b78c;
            }
          }
          .el-form{
            margin-top: 30px;
            width: 180px;
            .el-input{
              border:none;
              input{
                width: 300px;
              }
            }
            .forget-password{
              text-align: right;
              margin: -10px 0px 10px 10px;
              font-size: 12px;
              a{
                color: #979797;
                text-decoration: none;
              }
            }
            .login-btn{
              width: 150px;
              height: 40px;
              border-radius: 20px;
              border: none;
              background: #00b78c;
            }
          }
        }
      }


    }
  }
</style>
