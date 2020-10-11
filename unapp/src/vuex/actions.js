/**
 * 保存用于间接更新state状态中数据的方法的对象
 * 包含异步代码和处理逻辑代码的方法
 */
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS
} from './mutations-type' 
import {reqAddress,reqCategorys,reqShops} from '../api/index'
export default {
    //1获取当前地址信息的异步action
    async getAddress({commit,state}){
        const {latitude,longitude } = state
        //发送请求
        const result = await reqAddress(longitude,latitude)
        if (result.code === 0 ){
            const address  = result.data
            //请求成功，提交到commit
            commit(RECEIVE_ADDRESS,address)
        }
    },
     //2、获取食品分类列表的异步action
    async getCategorys({commit}){
        //发送请求
        const result = await reqCategorys()
        if (result.code === 0 ){
            const categorys  = result.data
            //请求成功，提交到commit
            commit(RECEIVE_CATEGORYS,categorys)
        }
    },
      //3、获取食品分类列表的异步action
    async getShops({commit,state}){
        const {latitude,longitude } = state
        //发送请求
        const result = await reqShops({latitude,longitude })
        if (result.code === 0 ){
            const shops  = result.data
            //请求成功，提交到commit
            commit(RECEIVE_SHOPS,shops)
        }
    },
}