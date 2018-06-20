<template>
  <div class="plublish-goods" v-loading="listLoading">
    <status-sriangle :status="status"></status-sriangle>
    <edit-goods :formData="formValidate" @editSuccess="uploadGoods"></edit-goods>
  </div>
</template>
<script>
  import editGoods from '@/components/edit-goods.vue';
  import statusSriangle from '@/components/statusSriangle.vue';

  const qs = require('qs');
  const async = require('async');
  export default {
    data(){
      return{
        listLoading:false,
        //三角状态
        status:{
          name:'',
          lable:'',
          value:'',
        },

        formValidate: {
          token:'',//
          adminId:'',//商户Id
          categoryId:'',//分组Id
          name:'',//商品名称
          subtitle:'',//副标题
          mainImage:'',//主图
          subImages:'',//附图
          videocove:'',//视频封面图
          video:'',//视频文件
          price:'',//价格
          stock:'',//库存
          status:4,//商品状态
          postage:'',//运费
          spec	:'',//规格
          districtId:'',//省
          city:'',//市
          county:'',//县/区
          conditionalMail:0,//条件包邮
          enoughNum:'',//满多少件包邮
          enoughMoney:'',//满多少钱包邮
          nocityMail:'',//不包邮地区
          reserve:'0',//普通/预定
          reserveDays:'',//预定天数
          reserveNum:'',//预定数量
          detail:''
        },
      }
    },
    created(){
      let id =  this.$route.query.id;
      this.addData(id);
    },
    methods: {
      addData(id){
        this.listLoading = true;
        let params = {
          productId:id
        };
        this.$ajax.post(process.env.API_HOST+'/Product/selectByproduceId.do?',qs.stringify(params)).then(res => {
          console.log(res);
          let json = res.data
          if(json.status != 0) return;
          this.formValidate = json.data;
          //产品状态
          this.status= this.operatingStatus(this.formValidate.status);
          this.listLoading = false;
        }).catch(function (error) {
          console.log(error);
        });
      },
      operatingStatus(value) {
        let state = {};
        switch(value){
          case 1 :
            return state = {
              name:'在售',
              className:'success',
            };
            break;
          case 2 :
            return state = {
              name:'下架',
              className:'info',
            };
            break;
          case 3 :
            return state = {
              name:'删除',
              className:'warning',
            };
            break;
          case 4 :
            return state = {
              name:'未审核',
              className:'',
            };
            break;
          case 6 :
            return state = {
              name:'不合格',
              className:'danger',
            };
            break;
          case 0 :
            return state = {
              name:'强制下架',
              className:'danger',
            };
            break;
        }
        return state;
      },
      uploadGoods(form){
        console.log(form);
        let formInfo = form.info;
        let details = form.content;
        let _this = this;
        async.waterfall([
          function(callback) {
            let params = formInfo;
            return _this.$ajax.post(process.env.API_HOST+'/Product/AddProduct.do',qs.stringify(params)).then(res => {
              console.log(res)
              let json = res.data
              //验证码失效
              if(json.status != 0){
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
              productId:arg1.data,
              detail:details,
            };
            _this.$ajax.post(process.env.API_HOST+'/Product/updateProductDetailMes.do',qs.stringify(params)).then(res => {
              console.log(res)
              let json = res.data
              if(json.status != 0){
                return;
              }
              _this.$message({
                message: '发布成功',
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
          _this.$router.push({name:'qualification',query:{id:result.data}});
        });
      },
    },
    components:{
      editGoods,
      statusSriangle
    }
  }
</script>
<style scoped lang="scss">
  .plublish-goods {
    position: relative;
    padding: 50px 40px;
  }
</style>
