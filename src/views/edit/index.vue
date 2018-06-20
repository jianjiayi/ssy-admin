<template>
  <div class="bg-body">
    <my-header></my-header>
    <div class="content container">
      <router-view></router-view>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>

  import myHeader from '@/components/layout/header1.vue';
  import myFooter from '@/components/layout/footer.vue';
  export default {
    data () {

      return {}
    },

    computed: {
    },
    methods:{
    },
    components:{
      myHeader,myFooter
    }
  }
</script>
<style scoped lang="scss">
  .bg-body{
    background: #ffffff;
    min-width: 1190px;
    padding-top: 100px;
    .content{
      min-height: 700px;
      padding-top: 10px;
      background: #F6F8FE ;
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
