/**
 * 保存用于直接更新state状态中数据的方法
 * 不包含异步代码的方法
 */
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER,
    RECEIVE_TOKEN
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
    }
}