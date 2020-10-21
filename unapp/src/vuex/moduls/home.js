/**
 * 首页模块的相关数据
 */
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
} from  '../mutations-type'
import {reqAddress,reqCategorys,reqShops} from '../../api/index'
export default {
    state: {
        latitude: 40.10038, // 纬度 
        longitude: 116.36867, // 经 度 
        address: {}, // 地 址 信 息 对 象 
        categorys: [], // 分 类 数 组 
        shops: [], // 商 家 数 组
    },
    mutations: {
        [RECEIVE_ADDRESS](state,address){
            state.address = address
        },
        [RECEIVE_CATEGORYS](state,categorys){
            state.categorys = categorys
        },
        [RECEIVE_SHOPS](state,shops){
            state.shops = shops
        }
    },
    actions: { 
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
        async getCategorys({commit},callback){
            //发送请求
            const result = await reqCategorys()
            if (result.code === 0 ){
                const categorys  = result.data
                //请求成功，提交到commit
                commit(RECEIVE_CATEGORYS,categorys)//commit是同步执行的
                //到这里轮播所需的数据已经更新了
                //当参数二为函数，才会调用
                typeof callback === 'function' && callback()
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
    },
    getters: {  
        
    }
  }