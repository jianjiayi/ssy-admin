const state = {
  user : JSON.parse(sessionStorage.getItem('$user')) || {},//保存用户登录后基本信息
  token: sessionStorage.getItem('$token') || ''//验证用户登录
}

const getters = {
  //获取登录信息
  getUser : state => {
    return state.user;
  }
}

const actions = {
  changeAuthor({ commit },item){
    commit('changeAuthor',item)
  },
  setUser({ commit }, item){
    commit('setUser', item)
  },
  clearUser({ commit }, item){
    commit('clearUser', item)
  },
}

const mutations = {
  //修改头像
  changeAuthor(state, item){
    state.user.avatar = item;
    sessionStorage.setItem('$user', JSON.stringify(state.user));
  },
  //设置登录信息
  setUser(state, item) {
    state.user = item.user;
    state.token = item.token;
    sessionStorage.setItem('$user', JSON.stringify(state.user));
    sessionStorage.setItem('$token', state.token);
    console.log(state.user)
  },
  //注销登录
  clearUser(state){
    console.log(111111)
    state.user = {};
    state.token = '';
    sessionStorage.setItem('$user',JSON.stringify(state.user));
    sessionStorage.setItem('$token',state.token);
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
