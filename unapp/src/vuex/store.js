/**
 * 该文件用于保存所有组件间通信的数据
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
import home from './moduls/home'
import user from './moduls/user'
import shop from './moduls/shop'

//声明使用的vuex插件
Vue.use(Vuex)

export default new Vuex.Store({
    mutations,
    actions,
    getters,
    //vuex多模块化编程
    modules:{
        home,
        user,
        shop
    }
    /*
    总的state数据对象是：{
        home:{latitude:zzz,xx:yyy ....},
        user:{},
        shop:{}
    }
    */
})