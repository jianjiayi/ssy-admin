import goodsDetails from '@/views/details/goods-details.vue';
import ordersDetails from '@/views/details/orders-details.vue';

export default [
  {
    path:'goods',
    name:'goodsDetails',
    meta:{
      auth:false,//这个字段以后用来验证必须登录才可以查看
      name:'商品详情',
      icon:''
    },
    component:goodsDetails
  },
  {
    path:'orders',
    name:'ordersDetails',
    meta:{
      auth:false,
      name:'订单详情',
      icon:''
    },
    component:ordersDetails
  }
]
