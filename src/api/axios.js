import axios from 'axios';
import store from '@/store/index.js';
import router from '@/router';

const instance = axios.create({
  timeout: 10000
});
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求接口之前   http request 拦截器
instance.interceptors.request.use(
  config => {
    if (store.state.user) {
      config.headers.Authorization = store.state.user.token;//设置Authorization = tokern
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

//请求接口成功  http response 拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401://登录超时
          alert('登录超时，请重新登录')
          store.commit('clearUser');//清除token和user保存信息
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
     // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  });


export default instance;
