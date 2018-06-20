<template>
  <section class="form">
    <edit-tel @editTelSubmit="editTelSubmit"></edit-tel>

    <set-password :setModel="passwordMadal" @onOk="submitPassword" @onCancel="cancel"></set-password>
  </section>
</template>
<script>
  import editTel from '@/components/editTel.vue';
  import  setPassword from '@/components/set-password.vue';
  const qs = require('qs');

  export default {
    data () {
      return {
        passwordMadal:false,

        isDisabled:true,
        count:'',
        timer:null,
        codeText:'点击发送验证码',

        params:{
          phone:'',
          newpass:'',
        }
      }
    },
    methods: {
      editTelSubmit(tel){
        this.params.phone = tel;
        this.passwordMadal = true
      },
      //设置密码
      submitPassword(form){
        console.log(form)

        this.params.newpass = form.password1;
        let params = this.params;
        this.$ajax.post(process.env.API_HOST+'/personal/ForgetAdminPass.do',qs.stringify(params)).then(res => {
          console.log(res)
          let json = res.data
          if(json.status != 0){
            alert('设置密码失败')
            return;
          }
          this.$message({
            message: '密码修改成功',
            type: 'success'
          });
          this.passwordMadal = false;
        }).catch(function (error) {
          console.log(error);
        });
      },
      cancel(){
        this.passwordMadal = false
      }
    },
    components:{
      editTel,
      setPassword
    }
  }
</script>
<style scoped lang="scss">
  .form{
    width: 400px;
    .item-content{
      display: flex;
      justify-content: space-between;
    }
  }

</style>
