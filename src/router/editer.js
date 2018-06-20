import goodsEdit from '@/views/edit/goods-edit.vue';
import ordersEdit from '@/views/edit/orders-edit.vue';

export default [
  {
    path:'goods',
    name:'goodsEdit',
    meta:{
      auth:false,//这个字段以后用来验证必须登录才可以查看
      name:'编辑商品详情',
      icon:''
    },
    component:goodsEdit
  },
  {
    path:'orders',
    name:'ordersEdit',
    meta:{
      auth:false,
      name:'编辑订单详情',
      icon:''
    },
    component:ordersEdit
  }
]
