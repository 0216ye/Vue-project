import Vue from "vue";
//引入rem适配需要的库
import 'lib-flexible/flexible';
import App from "./App.vue";
import router from './router/index';
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import store from './vuex/store'
//引入手机号表单验证js文件
import './validate.js'
//全局注册组件
Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router, //注册路由器,任意组件都可以课件$router和 route
  store //注册vuex的store状态管理对象，所有组件都能看见$store
}).$mount("#app");
