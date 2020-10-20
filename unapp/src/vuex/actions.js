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
    RESET_TOKEN,
    RECEIVE_GOODS,
    RECEIVE_INFO,
    RECEIVE_RATINGS
} from './mutations-type' 
import {reqAddress,reqCategorys,reqShops,reqAutoLogin,reqGoods,reqInfo,reqRatings} from '../api/index'
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
    },
    //7、保存食物数据的action
    async showGoods ({commit},cb){
      const result = await reqGoods()
      if (result.code === 0){
          const goods = result.data
          commit(RECEIVE_GOODS,goods)
          //如果组件中传递了接收消息的回调，数据更新后，调用回调函数通知调用的组件
          typeof cb === 'function' && cb()
      }
    },
    //8、保存食物评价的数据的action
    async showRatings ({commit},cb){
        const result = await reqRatings()
        if (result.code === 0){
            const ratings = result.data
            commit(RECEIVE_RATINGS,ratings)
            typeof cb === 'function' && cb()
        }
    },
    //9、保存商家信息
    async showInfo ({commit},cb){
        const result = await reqInfo()
        if (result.code === 0){
            const Info = result.data
            commit(RECEIVE_INFO,Info)
            typeof cb === 'function' && cb()
        }
    }
}