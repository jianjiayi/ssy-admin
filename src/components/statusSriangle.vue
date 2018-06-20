<template>
  <div id="productStatus">
      <span :class="status.className">
        <em id="statusTxt">{{status.name}}</em>
      </span>
  </div>
</template>
<script>
  export default {
    props:['status']
  }
</script>
<style scoped lang="scss">
  #productStatus{
    position: absolute;
    right: 0;
    top: -10px;
    z-index: 99;
    height: 150px;
    width: 150px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    span{
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-top: 150px solid  #409eff;
      border-left: 150px solid transparent;
      em{
        position: absolute;
        top:-120px;
        right: -20px;
        height: 40px;
        width: 150px;
        line-height: 30px;
        text-align: center;
        font-size: 20px;
        font-style: normal;
        color: #fff;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
      }
    }
    span.success{
      border-top: 150px solid  #67c23a;
    }
    span.info{
      border-top: 150px solid  #909399;
    }
    span.warning{
      border-top: 150px solid  #e6a23c;
    }
    span.danger{
      border-top: 150px solid  #f56c6c;
    }
  }
</style>
