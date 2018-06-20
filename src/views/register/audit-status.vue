<template>
  <div class="alert-status">
    <h2>{{title}}</h2>
    <div :class="status!=50 ? 'alert' : 'alert error'"
      v-show="status==50"
      >
      <span>原因：{{msg}}</span>
      <router-link to="/register/editAptitude">查看资质</router-link>
    </div>
  </div>
</template>
<script>
  const qs = require('qs');
  export default {
    data(){
      return{
        title:'正在审核资质中.....',
        msg:'',
        status:'',
      }
    },
    created(){
      this.loadData()
    },
    methods:{
      loadData(){
        let params = {};
        this.$ajax.post(process.env.API_HOST+'/Verification/SelectadmVer.do',qs.stringify(params)).then(res => {
          console.log(res)
          let json = res.data
          if(json.status != 0){
            return;
          }
          this.msg = json.data.endyy
          this.status = json.data.status;
          this.status == 50 ? this.title = '资质审核不通过' : this.title = '正在审核资质中.....';
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>
<style scoped lang="scss">
  .alert-status{
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .alert{
      width: 400px;
      padding: 20px;
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
</style>
