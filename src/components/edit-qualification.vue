<template>
  <div class="qualification">
    <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="120px"  @keyup.enter.native="handleSubmit('formValidate')">
      <el-form-item label="真实姓名" prop="vername">
        <el-input v-model="formValidate.vername" clearable placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="idcard">
        <el-input v-model="formValidate.idcard" clearable placeholder="身份证号码"></el-input>
      </el-form-item>
      <el-form-item label="商户类型" prop="role">
        <el-radio-group v-model="formValidate.role">
          <el-radio label="2">个人</el-radio>
          <el-radio label="3">企业</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="formValidate.role==3" label="营业执照编号" prop="license">
        <el-input v-model="formValidate.license" clearable placeholder="营业执照编号"></el-input>
      </el-form-item>
      <el-form-item v-if="formValidate.role==3" label="营业执照" prop="verimages">
        <div class="id-card">
          <div class="el-button">
            <upload-img
              ref="uploadImg0"
              :options="uploadImgOptions"
              title="营业执照"
              name="verimages"
              :src="formValidate.verimages"
              @on-remove="uploadRemove"
              @on-success="uploadSuccess">
            </upload-img>
          </div>
          <div class="model">
            <img src="@/assets/img/license.jpg" alt="">
          </div>
        </div>
        <input type="hidden" v-model="formValidate.verimages">
      </el-form-item>

      <el-form-item label="主营产品" prop="product">
        <el-input v-model="formValidate.product" type="textarea" :autosize="{minRows: 2,maxRows: 5}" clearable placeholder="主营产品..."></el-input>
      </el-form-item>


      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="formValidate.phone" clearable placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item label="联系地址" prop="sheng">
        <city @on-citySuccess="citySuccess" :modelCity="cityModel" v-model="formValidate.sheng"></city>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="formValidate.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" clearable placeholder="详细地址..."></el-input>
      </el-form-item>


      <el-form-item label="银行账户" prop="bankcard">
        <el-input v-model="formValidate.bankcard" clearable placeholder="银行账户"></el-input>
      </el-form-item>
      <el-form-item label="开户行" prop="bankadr">
        <el-input v-model="formValidate.bankadr" clearable placeholder="开户行"></el-input>
      </el-form-item>
      <el-form-item label="支付宝账号">
        <el-input v-model="formValidate.alipay" clearable placeholder="支付宝账号"></el-input>
      </el-form-item>
      <el-form-item label="微信账号">
        <el-input v-model="formValidate.wxpay" clearable placeholder="微信账号"></el-input>
      </el-form-item>


      <el-form-item label="身份证正面" prop="cardimg1">
        <div class="id-card">
          <div class="el-button">
            <upload-img
              ref="uploadImg1"
              :options="uploadImgOptions"
              title="身份证正面"
              name="cardimg1"
              :src="formValidate.cardimg1"
              @on-remove="uploadRemove"
              @on-success="uploadSuccess">
            </upload-img>
          </div>
          <div class="model">
            <img src="@/assets/img/card_01.jpg" alt="">
          </div>
        </div>
        <input type="hidden" v-model="formValidate.cardimg1">
      </el-form-item>
      <el-form-item label="身份证反面" prop="cardimg2">
        <div class="id-card">
          <div class="el-button">
            <upload-img
              ref="uploadImg2"
              :options="uploadImgOptions"
              title="身份证反面"
              name="cardimg2"
              :src="formValidate.cardimg2"
              @on-remove="uploadRemove"
              @on-success="uploadSuccess">
            </upload-img>
          </div>
          <div class="model">
            <img src="@/assets/img/card_02.jpg" alt="">
          </div>
        </div>
        <input type="hidden" v-model="formValidate.cardimg2">
      </el-form-item>
      <el-form-item label="手持身份证" prop="cardimg3">
        <div class="id-card">
          <div class="el-button">
            <upload-img
              ref="uploadImg3"
              :options="uploadImgOptions"
              title="手持身份证"
              name="cardimg3"
              :src="formValidate.cardimg3"
              @on-remove="uploadRemove"
              @on-success="uploadSuccess">
            </upload-img>
          </div>
          <div class="model">
            <img src="@/assets/img/card_03.jpg" alt="">
          </div>
        </div>
        <input type="hidden" v-model="formValidate.cardimg3">
      </el-form-item>

      <el-form-item label="">
        <el-checkbox v-model="agreementState">提交资质即默认阅读并同意</el-checkbox>
        <router-link :to="{name: 'agreement'}">《商户协议》</router-link>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="!agreementState" class="submit-btn" type="primary" @click="handleSubmit('formValidate')" :loading="isBtnLoading">{{btnText}}</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  import city from '@/components/city.vue';
  import uploadImg from '@/components/upload-img.vue';

  import cityData from '@/assets/js/city.js'
  const qs = require('qs');

  export default {
    props:['formData'],
    data () {
      return {
        isBtnLoading: false,
        agreementState:true,
        cityModel:[],
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
        },
        ruleValidate: {
          vername: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' }
          ],
          idcard: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' }
          ],
          license: [
            { required: true, message: '请输入营业执照编号', trigger: 'blur' }
          ],
          product: [
            { required: true, message: '请输入主营产品', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' }
          ],
          sheng: [
            { required: true, message: '请选择省市区县', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
          bankcard: [
            { required: true, message: '请输入银行账户', trigger: 'blur' }
          ],
          bankadr: [
            { required: true, message: '请输入开户行', trigger: 'blur' }
          ],
          verimages: [
            { required: true, message: '请输入营业执照', trigger: 'blur' }
          ],
          cardimg1: [
            { required: true, message: '请输入身份证正面', trigger: 'blur' }
          ],
          cardimg2: [
            { required: true, message: '请输入身份证反面', trigger: 'blur' }
          ],
          cardimg3: [
            { required: true, message: '请输入手持身份证', trigger: 'blur' }
          ],
        },
        uploadImgOptions:{
          width:'100%',//宽度
          height:'100px',//高度

          length:0,//上传文件数量
          format:['jpg','jpeg','png'],//上传文件类型
          size:2048,//上传文件大小
        },
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '正在提交...';
        return '提交资质';
      }
    },
    watch:{
      formData(val,oldval){
        console.log(val,oldval)
        this.formValidate = this.formData;
//        cityData.map(n => {
//          if (n.label == this.formValidate.shi){
//            this.formValidate.shi = n.value;
//            n.children.map(n1 => {
//              if(n1.label == this.formValidate.sheng){
//                this.formValidate.sheng = n1.value;
//                n1.children.map(n2 => {
//                  if(n2.label == this.formValidate.quxian){
//                    this.formValidate.quxian = n2.value;
//                    return
//                  }
//                });
//                return;
//              }
//            });
//            return;
//          }
//        })
        this.cityModel =[this.formValidate.shi,this.formValidate.sheng,this.formValidate.quxian];
        console.log(this.cityModel)
      },
      modelCity(val,oldval){
        console.log(val,oldval);
      }
    },
    methods: {
      addData(){
        console.log(this.formData)
        this.formValidate = this.formData;
      },
      //删除上传图片
      uploadRemove(data){
        console.log(data);
        this.formValidate[data.name] = '';
      },
      //上传成功
      uploadSuccess(data){
        console.log(data[0])

        this.formValidate[data[0].name] = data[0].url;
      },
      citySuccess(val){
        this.cityModel = val;
        this.formValidate.sheng = val[0];
        this.formValidate.shi = val[1];
        this.formValidate.quxian = val[2];

      },
      //提交
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.isBtnLoading = true;
            let params = this.formValidate;
            delete this.formValidate['createTime'];
            delete this.formValidate['updateTime'];
            console.log('role:'+this.formValidate['role'])
            this.$ajax.post(process.env.API_HOST+'/Verification/AddorUpdateVerMessage.do',qs.stringify(params)).then(res => {
              console.log(res)
              let json = res.data
              if(json.status != 0) return;

              this.$emit('submitSuccess',json);
              this.isBtnLoading = false;
            }).catch(function (error) {
              console.log(error);
              this.isBtnLoading = false;
            });
            console.log(this.formValidate)
          } else {
            alert('请填写完整');
          }
        })
      },
    },
    components:{
      city,
      uploadImg
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
