<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div :id="className" :style="{height:height,width:width}"></div>
</template>
<script>
  import echarts from 'echarts';
  export default {
    props: {
      className: {
        type: String,
        default: 'line-chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object
      }
    },
    data () {
      return {
        charts: '',
        opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
        opinionData:[
          {value:335, name:'直接访问'},
          {value:310, name:'邮件营销'},
          {value:234, name:'联盟广告'},
          {value:135, name:'视频广告'},
          {value:1548, name:'搜索引擎'}
        ]
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.drawPie(this.className,val);
        }
      }
    },
    //调用
    mounted(){
      this.$nextTick(function() {
        this.drawPie(this.className,this.chartData)
      })
    },
    methods:{
      drawPie(id,chartData){
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
          title: {
            text: '订单统计'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['待发货订单','待收货订单','已完成订单','仅退款订单','交易关闭订单']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'待发货订单',
              type:'line',
              stack: '总量',
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'待收货订单',
              type:'line',
              stack: '总量',
              data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
              name:'已完成订单',
              type:'line',
              stack: '总量',
              data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
              name:'仅退款订单',
              type:'line',
              stack: '总量',
              data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
              name:'交易关闭订单',
              type:'line',
              stack: '总量',
              data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        })
      }
    },

  }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
