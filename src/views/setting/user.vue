<template>
  <div class="user">
    <el-form :model="info" label-position="left" label-width="120px">
      <el-form-item label="头像 :">
        <div class="item">
          <div class="txt">
            <p class="author">
              <img v-if="info.avatar == null||info.avatar == ''" src="@/assets/logo.png" alt="">
              <img v-else :src="info.avatar" alt="">
            </p>
          </div>
          <span class="btn">
            <i class="iconfont icon-bianji" @click="handleEditAuthor(info.avatar)"></i>
          </span>
        </div>
      </el-form-item>

      <el-form-item label="商户名称 :">
        <div class="item">
          <div class="txt">
            <p class="">{{info.admname}}</p>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="商户ID :">
        <div class="item">
          <div class="txt">
            <p class="">
              {{info.admnum}}
            </p>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="商户类型 :">
        <div class="item">
          <div class="txt">
            <p class="">
              <el-tag
                :type="info.role == 2 ? 'success' : 'danger'"
                close-transition
                size="mini">
                {{info.role | typeStatus}}
              </el-tag>
            </p>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="商户昵称 :">
        <div class="item">
          <div class="txt">
            <p class="">{{info.nickname | emptyFun}}</p>
          </div>
          <span class="btn">
            <i class="iconfont icon-bianji" @click="handleEdit('商户昵称','nickname',info.nickname)"></i>
          </span>
        </div>
      </el-form-item>

      <el-form-item label="绑定手机号 :">
        <div class="item">
          <div class="txt">
            <p class="">{{info.phone | emptyFun}}</p>
          </div>
          <span class="btn">
            <i class="iconfont icon-bianji" @click="handleTelEdit('绑定手机号','phone',info.phone)"></i>
          </span>
        </div>
      </el-form-item>
      <el-form-item label="绑定邮箱 :">
        <div class="item">
          <div class="txt">
            <p class="">{{info.email | emptyFun}}</p>
          </div>
          <span class="btn">
            <i class="iconfont icon-bianji" @click="handleEdit('绑定邮箱','email',info.email)"></i>
          </span>
        </div>
      </el-form-item>

      <el-form-item label="商户简介 :">
        <div class="item">
          <div class="txt">
            <p class="">{{ info.introduce | emptyFun}}</p>
          </div>
          <span class="btn">
            <i class="iconfont icon-bianji" @click="handleEdit('商户简介','introduce',info.introduce)"></i>
          </span>
        </div>
      </el-form-item>

      <el-form-item label="商家公告 :">
        <div class="item">
          <div class="txt">
            <p class="">{{ info.introduction | emptyFun}}</p>
          </div>
          <span class="btn">
            <i class="iconfont icon-bianji" @click="handleEdit('商家公告','introduction',info.introduction)"></i>
          </span>
        </div>
      </el-form-item>

      <el-form-item label="发货人姓名 :">
        <div class="item">
          <div class="txt">
            <p class="">{{ info.inname | emptyFun}}</p>
          </div>
          <span class="btn">
            <i class="iconfont icon-bianji" @click="handleEdit('发货人','inname',info.inname)"></i>
          </span>
        </div>
      </el-form-item>

      <el-form-item label="发货人联系电话 :">
        <div class="item">
          <div class="txt">
            <p class="">{{ info.inphone | emptyFun}}</p>
          </div>
          <span class="btn">
            <i class="iconfont icon-bianji" @click="handleTelEdit('发货人联系电话','inphone',info.inphone)"></i>
          </span>
        </div>
      </el-form-item>

      <el-form-item label="发货地址 :">
        <div class="item">
          <div class="txt">
            <p class="">{{ info.outaddress | emptyFun}}</p>
          </div>
          <span class="btn">
            <i class="iconfont icon-bianji" @click="handleEdit('发货地址','outaddress',info.outaddress)"></i>
          </span>
        </div>
      </el-form-item>

      <el-form-item label="退件收货人 :">
        <div class="item">
          <div class="txt">
            <p class="">{{ info.outname | emptyFun}}</p>
          </div>
          <span class="btn">
            <i class="iconfont icon-bianji" @click="handleEdit('退件收货人','outname',info.outname)"></i>
          </span>
        </div>
      </el-form-item>

      <el-form-item label="退件咨询电话 :">
        <div class="item">
          <div class="txt">
            <p class="">{{ info.outphone | emptyFun}}</p>
          </div>
          <span class="btn">
            <i class="iconfont icon-bianji" @click="handleTelEdit('退件咨询电话','outphone',info.outphone)"></i>
          </span>
        </div>
      </el-form-item>

      <el-form-item label="退货地址 :">
        <div class="item">
          <div class="txt">
            <p class="">{{ info.inaddress | emptyFun}}</p>
          </div>
          <span class="btn">
            <i class="iconfont icon-bianji" @click="handleEdit('退货地址','inaddress',info.inaddress)"></i>
          </span>
        </div>
      </el-form-item>

      <el-form-item label="退货说明 :">
        <div class="item">
          <div class="txt">
            <p class="">{{ info.returnPolicy | emptyFun}}</p>
          </div>
          <span class="btn">
            <i class="iconfont icon-bianji" @click="handleEdit('退货说明','returnPolicy',info.returnPolicy)"></i>
          </span>
        </div>
      </el-form-item>

      <el-form-item label="店铺联系电话 :">
        <div class="item">
          <div class="txt">
            <p class="">{{ info.telenumber | emptyFun}}</p>
          </div>
          <span class="btn">
            <i class="iconfont icon-bianji" @click="handleTelEdit('联系电话','telenumber',info.telenumber)"></i>
          </span>
        </div>
      </el-form-item>
    </el-form>


    <el-dialog
      title="修改头像"
      :visible.sync="cropperModel"
      width="700px">
      <vue-cropper ref="child" :Options="cropperOption" :Name="cropperName" @uploadImgSuccess="handleUploadSuccess"></vue-cropper>
    </el-dialog>

    <el-dialog
      title="校验登录密码"
      :visible.sync="checkLoginModel"
      width="300px"
      :center="true"
      :show-close="false">
      <check-login  @checkLogin="checkLogin"></check-login>
    </el-dialog>

    <el-dialog
      :title="'修改'+modelForm.label"
      :visible.sync="editTelModel"
      width="450px"
      :center="true">
      <edit-tel @editTelSubmit="editTelSubmit"></edit-tel>
    </el-dialog>


    <el-dialog
      :title="'修改'+modelForm.label"
      :visible.sync="modelActive"
      width="450px"
      :center="true"
      :show-close="false">
      <el-form ref="modelForm" :model="modelForm" :rules="modelFormRuleValidate" label-position="left" label-width="100px">
        <el-form-item :label="modelForm.label" prop="changeName">
          <el-input v-model="modelForm.changeName" type="textarea" :autosize="{minRows: 2,maxRows: 5}" clearable placeholder="请输入..."></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit('modelForm')">确定</el-button>
          <el-button type="ghost" @click="handleCancel('modelForm')" style="margin-left: 8px">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
  const qs = require('qs');
  import vueCropper from '@/components/vue-cropper.vue';
  import checkLogin from '@/components/checkLogin.vue';

  import editTel from '@/components/editTel.vue';

  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        //裁切头像参数
        cropperModel:false,
        cropperName:'avatar',
        cropperOption: {
          img: '',
          size: 1,
          full: true,//新增输出原图比例截图 props名full
          outputType: 'png',
          canMove: true,
          original: false,
          canMoveBox: false,
          autoCrop: true,
          autoCropWidth: 200,
          autoCropHeight: 200,
          fixedBox: true
        },
        //基本数据
        info:{
          avatar:'',//头像
          nickname:'北京老农',//昵称
          admnum:'198341298403712987345',//编号
          phone:'010-65565191',//绑定手机号
          introduce:'科技实打实大部分哈师大办法哈三大部分',//商户简介
          introduction:'公司地方机构ID房价高的设计费骨电视剧服公司独复合弓深度覆盖',//商户公告
          outaddress:'看；廊坊市大放送',//发货地址
          inaddress:'看什么地方看过没收到',//退货地址
          returnPolicy:'上岛咖啡美国开始的风格',//退货说明
          telenumber:'13121378101',//联系电话
        },
        //登录验证码
        checkLoginModel:false,
        //修改手机号
        editTelModel:false,
        //修改数据
        modelActive:false,
        modelForm:{
          label:'',
          name:'',
          changeName:'',
        },
        modelFormRuleValidate: {
          changeName: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '请设置至少6位密码', trigger: 'blur' }
          ],
        },
      }
    },
    filters:{
      typeStatus(type){
        let status = '';
        type === 2 ? status = '个人' : status = '企业';
        return status;
      },
      emptyFun(val){
        let str = '';
        (val === null || val ==='' || val === undefined) ? str = '暂无信息' : str = val;
        return str;
      }
    },
    created(){
      this.loadData()
    },
    methods:{
      ...mapMutations(['changeAuthor']),
      loadData(){
        //调用axios上传
        this.$ajax.post(process.env.API_HOST+'/personal/getAdminInfo.do',{}).then(res => {
          console.log(res);
          let json = res.data
          if(json.status != 0) return;
          this.info = json.data;

        }).catch(function (error) {
          console.log(error);
        });
      },
      //修改头像
      handleEditAuthor(){
        this.cropperModel = true;
      },
      //图片上传成功
      handleUploadSuccess(data){
        this.cropperModel = false;
        let params = {
          base64Code : data.url
        };
        this.$ajax.post(process.env.API_HOST+'/personal/uploadAdminHead.do',qs.stringify(params)).then(res => {
          console.log(res);
          let json = res.data
          if(json.status != 0) return;
          this.info.avatar = json.data;
          this.changeAuthor(json.data);//全局保存头像

        }).catch(function (error) {
          console.log(error);
        });

      },
      //校验登录密码成功
      checkLogin(state){
        if(state){
          this.checkLoginModel = false;
          this.editTelModel = true;
        }
      },
      //修改手机号
      handleTelEdit(label,name,value){
        this.modelForm.label = label;
        this.modelForm.name = name;
        this.modelForm.changeName = value;
        if(name == 'phone'){
          this.checkLoginModel = true;
        }else{
          this.editTelModel = true;
        }
      },
      editTelSubmit(tel){
        let params = {};
        params[this.modelForm.name] = tel;
        this.$ajax.post(process.env.API_HOST+'/personal/updateAdminInfo.do',qs.stringify(params)).then(res => {
          console.log(res);
          let json = res.data
          if(json.status != 0) return;
          this.info[this.modelForm.name] = tel;
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.editTelModel = false;
        }).catch(function (error) {
          console.log(error);
        });
      },
      //修改普通字段编辑
      handleEdit(label,name,value){
        this.modelActive = true;
        this.modelForm.label = label;
        this.modelForm.name = name;
        this.modelForm.changeName = value;
      },
      //保存普通字段保存
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.modelActive = false;
            let params = {};
            params[this.modelForm.name] = this.modelForm.changeName;
            this.$ajax.post(process.env.API_HOST+'/personal/updateAdminInfo.do',qs.stringify(params)).then(res => {
              console.log(res);
              let json = res.data
              if(json.status != 0) return;
              this.info[this.modelForm.name] = this.modelForm.changeName;
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            }).catch(function (error) {
              console.log(error);
            });
          } else {
            console.log('Fail!');
          }
        })
      },
      //取消
      handleCancel(name){
        this.$refs[name].resetFields();
        this.modelActive = false;
        this.$emit('onCancel')
      },
    },
    components:{
      vueCropper,
      checkLogin,
      editTel
    }
  }
</script>
<style scoped lang="scss">
  .user{
    padding: 20px 30px;
    .item{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .txt{
        font-size: 14px;
        p{
          color: #000000;
          margin:0;
          padding:0;
        }
        .author{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          background: #cccccc;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .btn{
        padding: 0px;
        margin-left: 20px;
        i{
          font-size: 20px;
        }
        i:hover{
          font-weight: 800;
          color: #2d8cf0;
        }
      }
    }
  }
</style>
