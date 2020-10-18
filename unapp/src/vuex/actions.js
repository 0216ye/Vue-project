/**
 * 保存用于间接更新state状态中数据的方法的对象
 * 包含异步代码和处理逻辑代码的方法
 */
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER,
    RECEIVE_TOKEN,
    RESET_USER,
    RESET_TOKEN
} from './mutations-type' 
import {reqAddress,reqCategorys,reqShops,reqAutoLogin} from '../api/index'
import { MessageBox } from 'mint-ui';
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

    //4、保存用户信息
    showUser ({commit},user){
        const token = user.token
        //将token保存到LocalStorage中
        localStorage.setItem('token-key',token)

        //将user和token保存到state中
        commit(RECEIVE_USER,user)
        commit(RECEIVE_TOKEN,token)
    },

    //5、自动登录-->token
    async autoLogin ({commit,state}){
        //必须要有token，而且user对象里面没有信息
        if ( state.token && !state.user._id){
            const result =  await reqAutoLogin()
            if (result.code === 0){
                //将没有token的user数据，保存到state中
                const user = result.data
                commit(RECEIVE_USER,user)
            }
            else MessageBox('',result.msg)
        }
    },
    //6、清除用户信息和LocalStorage保存的token
    loginOut ({commit}){
        localStorage.removeItem('token-key')
        commit(RESET_USER)
        commit(RESET_TOKEN)
    }
}