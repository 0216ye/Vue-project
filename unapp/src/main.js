import Vue from "vue";
//引入rem适配需要的库
import 'lib-flexible/flexible'
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
