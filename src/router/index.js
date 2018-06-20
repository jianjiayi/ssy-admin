import Vue from 'vue';
import Router from 'vue-router';
import notFond from '@/views/error/404.vue';//404

import Login from '@/views/login.vue';//登录
import register from '@/views/register/index.vue';//注册
import qualification from '@/views/register/qualification.vue';//上传资质
import auditStatus from '@/views/register/audit-status.vue';//查看资质状态
import editAptitude from '@/views/register/edit-aptitude.vue';//编辑资质

import Portal from '@/views/portal/index.vue';//门户luyou

import home from '@/views/home.vue';//首页
import sliderPath from './silderPath.js';//导入silder路由
import portalPath from './portal/index.js';//导入silder路由

import detail from '@/views/details/index.vue';//详情页面
import detailsPath from './details.js';//导入各种详情页面

import edit from '@/views/edit/index.vue';//编辑页面
import editerPath from './editer.js';//导入各种编辑详情页面


//如果资质不通过的话，进入资质审核页面
import $user from '@/store/user.js';


Vue.use(Router)

export default new Router({
  routes:[
    {
      path: '/login',
      name: 'login',
      meta: {
        name: '登录',
      },
      component: Login,
    },
    {
      path:'/register',
      name:'register',
      meta:{
        icon:'',
        name:'账号注册',
      },
      component: register,
      children:[
        {
          path:'qualification',
          name:'qualification',
          meta:{
            name:'资质信息'
          },
          component:qualification
        },
        {
          path:'auditStatus',
          name:'auditStatus',
          meta:{
            name:'审核状态'
          },
          component:auditStatus
        },
        {
          path:'editAptitude',
          name:'editAptitude',
          meta:{
            name:'编辑资质'
          },
          component:editAptitude
        },
      ]
    },
    {
      path:'/portal',
      name:'portal',
      meta:{
        name:'更多服务',
      },
      redirect: 'noredirect',
      component:Portal,
      children:portalPath
    },
    {
      path: '/',
      name: 'home',
      meta: {
        name: '首页',
        auth: false,
      },
      component: home,
      beforeEnter (to, from, next) {
        console.log(to)
        let user = $user.state.user;//保存用户登录后基本信息
        let isStatus = user.verstatus;
        if (isStatus==40) {
          next()
        } else {
          return next({
            path: '/register/auditStatus'
          })
        }
      },
      children:sliderPath
    },
    {
      path:'/detail',
      name:'detail',
      meta:{
        name:'详情',
        auth:false,
        icon:'',
      },
      redirect: 'noredirect',
      component:detail,
      beforeEnter (to, from, next) {
        let user = $user.state.user;//保存用户登录后基本信息
        let isStatus = user.verstatus;
        if (isStatus==40) {
          next()
        } else {
          return next({
            path: '/register/auditStatus'
          })
        }
      },
      children:detailsPath
    },
    {
      path:'/edit',
      name:'edit',
      meta:{
        name:'编辑',
        auth:false,
        icon:'',
      },
      redirect: 'noredirect',
      component:edit,
      beforeEnter (to, from, next) {
        let user = $user.state.user;//保存用户登录后基本信息
        let isStatus = user.verstatus;
        if (isStatus==40) {
          next()
        } else {
          return next({
            path: '/register/auditStatus'
          })
        }
      },
      children:editerPath
    },
    {
      path: '/404',
      name: '404',
      meta: {
        name: '404',
      },
      component: notFond,
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
