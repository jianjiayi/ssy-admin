<template>
  <div class="bg-body">
    <my-header></my-header>
    <div class="content container">
      <step-bar :stepOptions="stepOption" :active="stepOptionActive"></step-bar>
      <div v-if="$route.name =='register'" class="register" >
        <div class="form">
          <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="80px" @keyup.enter.native="handleSubmit('formValidate')">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="formValidate.name" placeholder="输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formValidate.password" placeholder="输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input v-model="formValidate.password2" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formValidate.phone" placeholder="绑定手机号"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <div class="item-content">
                <el-input v-model="formValidate.code" placeholder="输入验证码"></el-input>
                <span style="margin-left:10px">
                  <el-button type="ghost" :disabled="isDisabled"  @click="handleSendCode()">{{codeText}}</el-button>
                </span>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button class="submit-btn" type="primary" @click="handleSubmit('formValidate')" :loading="isBtnLoading">{{btnText}}</el-button>
            </el-form-item>
            <el-form-item style="text-align: center">
              <router-link to="/login">已有账号？登录</router-link>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-else class="qualification">
        <router-view></router-view>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>

  import myHeader from '@/components/layout/header1.vue';
  import myFooter from '@/components/layout/footer.vue';

  import stepBar from '@/components/step-bar.vue';

  const qs = require('qs');

  const async = require('async');

  export default {
    data () {
      let validatePass2 = (rule, value, callback) => {
        if (value !== this.formValidate.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      let phoneValidate = (rule, value, callback) => {
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (!reg.test(value)) {
          callback(new Error('手机号格式不正确'));
        } else {
          this.isDisabled=false,
            callback();
        };
      };

      return {
        isBtnLoading: false,
        //步骤条参数
        stepOption:{
          active:0,//激活选项
          options:[
            {
              title:'注 册',
              icon:'iconfont icon-yijianfankui',
            },
            {
              title:'资 质',
              icon:'iconfont icon-shangchuan',
            },
            {
              title:'审 核',
              icon:'iconfont icon-daichulidingdan',
            },
            {
              title:'开 店',
              icon:'iconfont icon-dingdan1',
            },
          ]
        },

        passwordMadal:false,

        isDisabled:true,
        count:'',
        timer:null,
        codeText:'点击发送验证码',

        formValidate: {
          name:'',
          password:'',
          password2:'',
          phone: '',
          code: '',
        },
        ruleValidate: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { type: 'string', min: 6, max:6, message: '请设置6位密码', trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: phoneValidate, trigger: 'change' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        }
      }
    },

    computed: {
      btnText() {
        if (this.isBtnLoading) return '正在注册...';
        return '立即注册';
      },
      stepOptionActive(){
        switch(this.$route.name){
          case('register'):
            return 0;
            break;
          case('qualification'):
            return 1;
            break;
          case('auditStatus'):
            return 2;
            break;
          case('editAptitude'):
            return 2;
            break;
        }
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
            async.waterfall([
              function(callback) {
                let params = {
                  phone:_this.formValidate.phone,
                  c:_this.formValidate.code
                };
                return _this.$ajax.post(process.env.API_HOST+'/personal/chickCode.do',qs.stringify(params)).then(res => {
                  console.log(res)
                  let json = res.data
                  //验证码失效
                  if(json.status != 0){
                    _this.isBtnLoading = false;
                    return;
                  }
                  callback(null, json);
                }).catch(function (error) {
                  console.log(error);
                  return alert('')
                });
              },
              function(arg1, callback) {
                console.log(arg1); // 1
                let params = {
                  admname:_this.formValidate.name,
                  password:_this.formValidate.password,
                  phone:_this.formValidate.phone
                };
                _this.$ajax.post(process.env.API_HOST+'/personal/PersonalRegister.do',qs.stringify(params)).then(res => {
                  console.log(res)
                  let json = res.data
                  if(json.status != 0){
                    _this.isBtnLoading = false;
                    return;
                  }
                  _this.$message({
                    message: '注册成功，请完善资质信息',
                    type: 'success'
                  });
                  callback(null, json);

                }).catch(function (error) {
                  console.log(error);
                });

              }
            ], function (err, result) {
              // 执行的任务中方法回调err参数时，将被传递至本方法的err参数
              // 参数result为最后一个方法的回调结果'done'
              console.log(result) // 2
              _this.isBtnLoading = false;
              _this.$router.push({name:'qualification',query:{id:result.data}});
            });
          } else {
            console.log('Fail!');
          }
        })
      },
    },
    components:{
      myHeader,myFooter,stepBar
    }
  }
</script>
<style scoped lang="scss">
  .bg-body{
    background: #d7deda;
    min-width: 1190px;
    padding-top: 100px;
    .content{
      min-height: 700px;
      padding-top: 10px;
      background: #ffffff;
    }
  }

  .register{
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
  .qualification{
    padding: 20px 0 50px 0;
  }
</style>
