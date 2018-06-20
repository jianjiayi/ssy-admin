<template>
  <div class="">
    <div class="goods-message" v-for="(items,index) in data" :key="index">
      <div class="score-header">
        <div class="goods">
          <img :src="items.product.productImage" alt="">
        </div>
        <div class="score">
          <p class="text">商品评分</p>
          <div v-if="items.message.length!=0" class="rate">
            <el-rate :disabled="true" v-model="items.message[0].score"></el-rate>
            <span>{{items.message[0].score}} 分</span>
          </div>
          <div v-else class="rate">
            <el-rate :disabled="true" v-model="scoreVal"></el-rate>
            <span>{{scoreVal}} 分</span>
          </div>
        </div>
      </div>
      <div v-if="items.message.length==0" class="score-content">
        <el-alert
          title="该商品暂未评价"
          type="info"
          :closable="false">
        </el-alert>
      </div>
      <div v-else class="score-content" v-for="(item,inde) in items.message" :key="inde">
        <div class="item">
          <div class="top">
            <p class="user">
              <em class="author">
                <img :src="item.usravatar" alt="">
              </em>
              <em class="name">{{item.userNickname}}</em>
            </p>
          </div>
          <div class="content">
            {{item.content}}
          </div>
          <div class="bottom">
            <div class="timeBtn">
              <em class="time">{{item.createTime}}</em>
              <el-button type="primary" plain size="mini" @click.native="replyMessage(item.id)">回复</el-button>
            </div>
            <div class="txt replyTxt" v-for="(v,i) in item.replayvo" :key="i">
              <div class="top-bar">
                <span class="replyName">回复:</span>
                <span class="time">{{v.createTime}}</span>
              </div>
              <p class="contTxt">
                <span class="getReplyTxt">{{v.content}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--物流-->
    <el-dialog
      title="回复评论"
      :visible.sync="replyVisible"
      width="450px"
      center>
      <div class="check-tel">
        <p class="title">评论内容：<span>1111</span></p>
        <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="85px" size="small" @keyup.enter.native="handleSubmit('formValidate')">
          <el-form-item label="回复内容：" prop="expressNo">
            <el-input type="textarea" v-model="formValidate.content" placeholder="请输入回复内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="submit-btn" type="primary" @click="handleSubmit('formValidate')" :loading="isBtnLoading">{{btnText}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  const qs = require('qs');
  export default {
    props:['messageArray'],
    data(){
      return{
        replyVisible:false,
        isBtnLoading: false,
        formValidate:{
          parentId:'',
          content:'',
        },
        ruleValidate: {
          content: [
            { required: true, message: '请输入回复内容', trigger: 'blur' },
          ],
        },
        data:[
          {
            product:{
              "orderNo": "1711291450992427",
              "productName": "昭通红富士苹果",
              "adminId": 127,
              "productId": 100000122,
              "productImage": "http://59.110.136.67:8080/dwshop/upload/admproductimg/64eb419d-0221-4c15-8048-b6ff664ebc49.jpg",
              "currentUnitPrice": 88,
              "quantity": 1,
              "totalPrice": 88,
              "postage": 0,
              "price": 88,
              "spec": "24个中果/盒",
              "createTime": 1525330240000,
              "updateTime": 1525928827000,
              "setStatus": 1,
              "conditionalmail": 0,
              "enoughnum": 0,
              "enoughmoney": null,
              "nocitymail": null,
              "citymail": null
            },
            message:[
              {
                "id": 36,
                "userNickname": "m_13810498958",
                "score": 1,
                "content": "好好吃哦",
                "commentImages": null,
                "productId": 100000122,
                "userId": 75,
                "praise": 1,
                "createTime": "2017-10-18 20:22:51",
                "flagNum": 0,
                "starNum": 5,
                "usravatar": null,
                "replayvo": [{
                  "id": 1,
                  "parentId": 36,
                  "userNickname": "商家回复",
                  "createTime": 1509090780000,
                  "content": "商家回复测试内容！！！！！！！"
                }, {
                  "id": 2,
                  "parentId": 36,
                  "userNickname": "zq",
                  "createTime": 1515995943000,
                  "content": "谢谢"
                }]
              }
            ]
          }
        ],
        scoreVal:0
      }
    },
    watch:{
      messageArray(val){
        this.data = val;
        console.log(val)
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '正在提交...';
        return '提交';
      }
    },
    methods:{
      replyMessage(id){
        this.replyVisible = true;
        this.formValidate.parentId = id;
      },
      //提交表单
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.isBtnLoading = true;
            let params = this.formValidate;
            this.$ajax.post(process.env.API_HOST+'/message/backcomment.do?',qs.stringify(params)).then(res => {
              console.log(res)
              let json = res.data;
              this.isBtnLoading = false;
              //验证码失效
              if(json.status != 0){
                alert(json.msg);
                return;
              }
              this.replyVisible = false;
              this.$emit('reloadMessage',json.status);
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
      },
      get_unix_time(dateStr){
        var newstr = dateStr.replace(/-/g,'/');
        var date =  new Date(newstr);
        var time_str = date.getTime().toString();
        return time_str.substr(0, 10);
      },
      dateStr(date){
        //获取js 时间戳
        var time=new Date().getTime();
        //去掉 js 时间戳后三位，与php 时间戳保持一致
        time=parseInt((time-date*1000)/1000);

        //存储转换值
        var s;
        if(time<60*10){//十分钟内
          return '刚刚';
        }else if((time<60*60)&&(time>=60*10)){
          //超过十分钟少于1小时
          s = Math.floor(time/60);
          return  s+"分钟前";
        }else if((time<60*60*24)&&(time>=60*60)){
          //超过1小时少于24小时
          s = Math.floor(time/60/60);
          return  s+"小时前";
        }else if((time<60*60*24*3)&&(time>=60*60*24)){
          //超过1天少于3天内
          s = Math.floor(time/60/60/24);
          return s+"天前";
        }else{
          //超过3天
          return formatDateTime(date);
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .goods-message{
    border-bottom: 1px solid #CCCCCC;
  }
  .goods-message:last-child{
    border:0;
  }
  .score-header{
    display: flex;
    justify-content: flex-start;
    padding: 10px 20px 5px 20px;
    .goods{
      width: 100px;
      height: 80px;
      background: #CCCCCC;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .score{
      flex: 1;
      margin-left: 10px;
      .text{
        font-size: 14px;
      }
      .rate{
        display: flex;
        span{
          margin-left: 10px;
          font-size: 14px;
          color: #140000;
        }
      }
    }
  }
  .score-content{
    padding: 10px 20px;
    max-height: 400px;
    overflow-y: auto;
    em{
      font-style: normal;
    }
  }
  .item{
    padding: 0 10px;
    .top{
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      color: #1B1B1B;
      p{
        margin: 0;
      }
      .user{
        display: flex;
        display:-webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        .author{
          width: 35px;
          height: 35px;
          background: #ccc;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .name{
          font-size: 14px;
          color: #1B1B1B;
          margin-left: 5px;
        }
      }
    }
    .content{
      font-size: 12px;
      color: #1B1B1B;
    }
    .showPictures{

    }
    .bottom{
      margin-top: 5px;
      .timeBtn{
        display: flex;
        display:-webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        padding-bottom: 10px;
        .time{
          color: #959585;
          font-size: 12px;
        }
        .fabulous-btn{
          height: 25px;
          border: 1px solid #81CED0;
          color: #81CED0;
          font-size: 12px;
          line-height: 25px;
          border-radius: 5px;;
          padding: 0 20px;
        }
        .fabulous-btn:active{
          background: #CCCCCC;
        }
      }
      .replyTxt{
        padding: 5px 20px;
        border-radius: 10px;
        background: #f4f4f4;
        position: relative;
        margin-top: 5px;
        .top-bar{
          display: flex;
          justify-content: space-between;
          .replyName{
            font-size: 12px;
            color: #959595;
            line-height: 20px;
          }
          .time{
            text-align: right;
            margin:0;
            padding:0;
            color: #959595;
            font-size: 12px;
            margin-top: 5px;
          }
        }
        .contTxt{
          color: #1B1B1B;
          font-size: 12px;
          margin-top: 5px;
        }
      }
      .replyTxt:before{
        position: absolute;
        content: '';
        top: -5px;
        left: 10px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #F4F4F4;
      }
    }
  }
  .check-tel{
    position: relative;
    margin: 0 auto;
    .title{
      font-size: 12px;
      margin-top:-20px;
      background: #CCCCCC;
      padding: 5px 10px;
      span{
        color: #606266;
      }
    }
    .item-content{
      display: flex;
      justify-content: space-between;
    }
  }
  .submit-btn{
    width: 40%;
  }
</style>
