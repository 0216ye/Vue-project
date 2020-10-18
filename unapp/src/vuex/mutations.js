/**
 * 保存用于直接更新state状态中数据的方法
 * 不包含异步代码的方法
 */
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
    RECEIVE_RATINGS
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
    }
}