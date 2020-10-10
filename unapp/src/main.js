import Vue from "vue";
//引入rem适配需要的库
import 'lib-flexible/flexible'
import App from "./App.vue";
import router from './router/index'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router //注册路由器,任意组件都可以课件$router和 route
}).$mount("#app");
