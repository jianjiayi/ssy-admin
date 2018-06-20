<template>
  <div class="plublish-goods">
    <status-sriangle :status="status"></status-sriangle>
    <el-form :model="formValidate" ref="formValidate" label-position="left" label-width="80px" class="demo-ruleForm">
      <el-form-item label="商品主图:" prop="mainImage">
        <div class="list-img-box">
          <div
            class="upload-list"
            style='width:150px;height:120px'>
            <img :src="formValidate.mainImage" title="商品主图">
          </div>
        </div>
        <input type="hidden" v-model="formValidate.mainImage" placeholder="请添加商品主图">
      </el-form-item>
      <el-form-item label="商品附图:" prop="subImages">
        <div class="list-img-box">
          <div
            v-for="item in subImagesArray"
            class="upload-list"
            style='width:150px;height:120px'>
            <img :src="item.url" :title="item.name">
          </div>
        </div>
        <input type="hidden" v-model="formValidate.subImages" placeholder="请添加商品附图">
      </el-form-item>
      <div v-if="formValidate.videocove !=''">
        <div class="flex-container">
          <el-form-item label="视频封面:" prop="videocove">
            <div class="list-img-box">
              <div
                class="upload-list"
                style='width:150px;height:120px'>
                <img :src="formValidate.videocove" title="视频封面图">
              </div>
            </div>
            <input type="hidden" v-model="formValidate.videocove" placeholder="请添加视频封面">
          </el-form-item>
          <el-form-item label="视频文件:" prop="video">
            <div class="video-box">
              <video-player
                ref="VideoPlayer"
                :playOptions="playoptions"
              >
              </video-player>
            </div>
            <input type="hidden" v-model="formValidate.video" placeholder="请添加视频文件">
          </el-form-item>
        </div>

      </div>


      <el-form-item label="商品名称:" prop="name">
        <div class="item-container">
          <span>{{formValidate.name}}</span>
        </div>
      </el-form-item>

      <dov class="flex-container">
        <el-form-item label="商品描述:" prop="subtitle">
          <div class="item-container">
            <span>{{formValidate.subtitle}}</span>
          </div>
        </el-form-item>
        <el-form-item label="商品类目:" prop="categoryId">
          <div class="item-container">
            <span>{{formValidate.categoryId | categoryFilters}}</span>
          </div>
        </el-form-item>
      </dov>

      <div class="flex-container">
        <el-form-item label="产地:" prop="districtId">
          <div class="item-container">
            <span>{{formValidate.districtId}}</span> -
            <span>{{formValidate.city}}</span> -
            <span>{{formValidate.county}}</span>
          </div>
        </el-form-item>
        <el-form-item label="商品价格:" prop="price">
          <div class="item-container">
            <span>{{formValidate.price}}</span> 元
          </div>
        </el-form-item>
      </div>



      <div class="flex-container">
        <el-form-item label="规格:" prop="spec">
          <div class="item-container">
            <div class="item-content">
              <span>{{formValidate.spec}}</span>
            </div>
          </div>

        </el-form-item>
        <el-form-item label="库存数量:" prop="stock">
          <div class="item-container">
            <span>{{formValidate.stock}}</span> 件
          </div>
        </el-form-item>
      </div>


      <div class="flex-container">
        <el-form-item label="邮费:" :prop="!single ? 'postage' : ''">
          <div class="item-container">
            <div class="item-content">
              <span v-if="formValidate.postage != 0">{{formValidate.postage}} 元</span>
              <span v-else>包邮</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item v-if="formValidate.conditionalMail !=0 && formValidate.conditionalMail != null" label="包邮条件:" prop="conditionalMail">
          <div class="">
            <span v-if="formValidate.conditionalMail==1">根据件数包邮 , 满  {{formValidate.enoughNum}} 件包邮</span>
            <span v-else-if="formValidate.conditionalMail==2">根据钱数包邮 , 满 {{formValidate.enoughMoney}} 元包邮</span>
          </div>
        </el-form-item>
      </div>

      <!--预售商品条件-->
      <div class="flex-container">
        <el-form-item label="商品类型:" prop="reserve">
          <span v-if="formValidate.reserve==0">普通商品</span>
          <span v-else-if="formValidate.reserve==1">预售商品</span>
        </el-form-item>
        <el-form-item v-if="formValidate.reserve=='1'" label="预售条件:" >
          <div class="item-container">
            <span> 数量: {{formValidate.reserveNum}} 件 ；</span>
            <span> 时间: {{formValidate.reserveDays | formatDateTime}}</span>
          </div>
        </el-form-item>
      </div>


      <!--富文本-->
      <el-form-item label="商品详情:">
        <div class="editor-container" v-html="formValidate.detail"></div>
      </el-form-item>
    </el-form>

    <div class="edit-btn">
      <i class="iconfont icon-bianji" @click="editGoods()"></i>
    </div>

    <go-top></go-top>

  </div>
</template>
<script>
  import goTop from '@/components/goTop.vue';
  import statusSriangle from '@/components/statusSriangle.vue';
  import videoPlayer from '@/components/video-player.vue';

  import { category,spec,unit } from '@/assets/js/publish-goods-base.js';
  import cityData from '@/assets/js/city.js'

  const qs = require('qs');

  export default {
    data() {
      return {
        //三角状态
        status:{
          name:'',
          lable:'',
          value:'',
        },

        switchVideo: false,//是否上传视频
        categoryModel: category,//商品分类
        specVal: spec[0].label,
        specModel: spec,//规格
        unitVal: unit[0].label,
        unitModel: unit,//单位
        single: false,//是否包邮
        switchPostage: false,//是否开启包邮条件s


        subImagesArray:[],//商品附图数组

        //播放视频
        playoptions:{
          src: '',
          poster: '',//你的封面地址
        },

        formValidate: {
          token: '',//
          adminId: '',//商户Id
          categoryId: '',//分组Id
          name: '',//商品名称
          subtitle: '',//副标题
          mainImage: '',//主图
          subImages: '',//附图
          videocove: '',//视频封面图
          video: '',//视频文件
          price: '',//价格
          stock: '',//库存
          status: 4,//商品状态
          postage: '',//运费
          spec: '',//规格
          districtId: '',//省
          city: '',//市
          county: '',//县/区
          conditionalMail: 0,//条件包邮
          enoughNum: '',//满多少件包邮
          enoughMoney: '',//满多少钱包邮
          nocityMail: '',//不包邮地区
          reserve: '0',//普通/预定
          reserveDays: '',//预定天数
          reserveNum: '',//预定数量
          detail:''
        },
      };
    },
    filters:{
      categoryFilters(val){
        let str ='';
        category.map(n => {
          if(n.value == val){
            return str = n.label;
          }
        })
        return str
      },
      formatDateTime(timeStamp) {
        let date = new Date();
        date.setTime(timeStamp);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
      },
    },
    watch:{
      formValidate(val,oldval){
        console.log(val,oldval)
        //加载格式化附图成数组
        let str = this.formValidate.subImages;
        if(str!=''){
          str.split(',').map(n => {
            this.subImagesArray.push({
              name:'subimg',
              url:n
            })
          })
        };
        //检查是否上传视频
        if(this.formValidate.videocove != ''){
          this.playoptions={
            src:this.formValidate.video,
            poster:this.formValidate.videocove
          }
        };
        cityData.map(n => {
          if (n.value == this.formValidate.districtId){
            this.formValidate.districtId = n.label;
            n.children.map(n1 => {
              if(n1.value == this.formValidate.city){
                this.formValidate.city = n1.label;
                n1.children.map(n2 => {
                  if(n2.value == this.formValidate.county){
                    this.formValidate.county = n2.label;
                    return
                  }
                });
                return;
              }
            });
            return;
          }
        });
        //产品状态
        this.status= this.operatingStatus(this.formValidate.status)
      },
      //包邮复选框
      single(val,oldval){
        console.log('switchPostage:'+this.switchPostage)
        val == true ? this.formValidate.postage = 1 : this.formValidate.postage = ''
      },
      //包邮条件滑块
      switchPostage(val,oldval){
        val == false ? this.formValidate.conditionalMail = 0 : this.formValidate.conditionalMail = '1'
      },
      //附图数组
      subImagesArray(val,oldval){
        this.formValidate.subImages = '';
        this.subImagesArray.map(n => {
          this.formValidate.subImages += n.url+',';
        });
        console.log(this.formValidate.subImages)
      }
    },
    created(){
      let id =  this.$route.query.id;
      this.addData(id);
    },
    methods: {
      addData(id){
        let params = {
          productId:id
        };
        this.$ajax.post(process.env.API_HOST+'/Product/selectByproduceId.do?',qs.stringify(params)).then(res => {
          console.log(res);
          let json = res.data
          if(json.status != 0) return;
          this.formValidate = json.data;
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
      editGoods(){
        let id =  this.$route.query.id;
        this.$router.push({path:"/edit/goods",query: {id:id}})
      }
    },
    components:{
      videoPlayer,
      statusSriangle,
      goTop,
    }
  }
</script>
<style scoped lang="scss">
  .plublish-goods{
    position: relative;
    padding: 50px 40px;
    .flex-container{
      display: flex;
      flex-direction: row;
      .el-form-item{
        flex: 1;
      }
    }
    .item-container{
      display: flex;
      max-width: 600px;
      .item-content{
        display: flex;
        >div{
          margin-left:20px;
        }
        >div:first-child{
          margin: 0;
        }
        .ivu-input-wrapper{
          width: auto;
        }
        .check-box{
          width: 80px;
          display: inline-block;
        }
      }
    }
  }
  .list-img{
    display: flex;
    .item{
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .list-img-box{
    display: flex;
    flex-wrap:wrap;
    .upload-list{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #cccccc;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 0px 2px #cccccc;
      img{
        width: 100%;
        height: 100%;
      }
      .upload-list-cover{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 40px;
        align-items: center;
        background: rgba(0,0,0,.6);
        opacity: 0;
        transition: opacity 1s;
        i{
          color: #fff;
          font-size: 20px;
          cursor: pointer;
          display: none;
          transition: display 1s;
        }
      }
    }
    .upload-list:hover{
      .upload-list-cover{
        opacity: 1;
        i{
          display: block;
        }
      }
    }
  }
  .video-box{
    position: relative;
    max-width: 360px;
    .container{
      width: auto;
    }
    .del-btn{
      position: absolute;
      right: -85px;
      bottom:0;
    }
  }

  .editor-container{
    >p{
      margin: 0px;
      padding: 0px;
    }
  }

  .edit-btn{
    position: fixed;
    bottom: 100px;
    right: 200px;
    i{
      font-size: 40px;
      color: #2cca9a;
    }
    i:hover{
      color: #0000cc ;
    }
  }
</style>
