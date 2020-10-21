import Vue from "vue";
//引入rem适配需要的库
import 'lib-flexible/flexible';
import {Button} from 'mint-ui'
import  FastClick  from  'fastclick'
//引入图片懒加载的插件
import VueLazyload from 'vue-lazyload'
import App from "./App.vue";
import router from './router/index';
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import store from './vuex/store'
import CartControl from './components/CartControl/CartControl.vue'
import './mock/mock-serve'
//引入手机号表单验证js文件
import './validate.js'
//引入用于国际化的文件
import i18n from './i18n'

import loading from './common/images/loading.gif'
//声明使用懒加载的插件,会得到一个全局指令:lazy,并指定其图片,
Vue.use(VueLazyload, {
  loading
})
//全局注册组件
Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.component('CartControl',CartControl)
Vue.component(Button.name,Button) //mt-button组件名
Vue.config.productionTip = false;
FastClick.attach(document.body);
new Vue({
  render: h => h(App),

  //注册路由器,任意组件都可以课件$router和 route
  router,

  i18n,

  //注册vuex的store状态管理对象，所有组件都能看见$store
  store
}).$mount("#app");
