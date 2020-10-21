/**
 * 保存用于直接更新state状态中数据的方法
 * 不包含异步代码的方法
 */
import Vue from 'vue'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER,
    RECEIVE_TOKEN,
    RESET_USER,
    RESET_TOKEN,
    RECEIVE_GOODS,
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT
} from './mutations-type' 
export default {
    [RECEIVE_ADDRESS](state,address){
        state.address = address
    },
    [RECEIVE_CATEGORYS](state,categorys){
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state,shops){
        state.shops = shops
    },
    [RECEIVE_USER](state,user){
        delete user.token
        state.user = user
    },
    [RECEIVE_TOKEN](state,token){
        state.token = token
    },
    [RESET_USER](state){
        state.user = {}
    },
    [RESET_TOKEN](state){
        state.token = ''
    },
    [RECEIVE_GOODS](state,goods){
        state.goods = goods
    },
    [RECEIVE_INFO](state,info){
        state.info = info
    },
    [RECEIVE_RATINGS](state,ratings){
        state.ratings = ratings
    },
    [ADD_FOOD_COUNT](state,food){
        if ( food.count ) {
            //food中有count，值+1
            food.count+=1
        }else{
            // 问题：vue中如果给一个响应式对象添加一个新的属性，没有数据绑定效果(不是响应式，数据改变，页面没有更新)
	        // 解决：给响应式对象添加一个响应式的属性
            Vue.set(food,'count',1)
        }
    },
    [REDUCE_FOOD_COUNT](state,food){
        if (food.count > 0 ){
            food.count--
        }
    }
}