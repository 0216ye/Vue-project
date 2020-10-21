/**
 * 用户模块的相关数据
 */
import { MessageBox } from 'mint-ui';

import {
    RECEIVE_USER,
    RECEIVE_TOKEN,
    RESET_USER,
    RESET_TOKEN,
} from '../mutations-type'
import {reqAutoLogin} from '../../api/index'
export default {
    state: {
        user:{},//保存着用户的信息
        token: localStorage.getItem('token-key') || '' ,//用于校验用户信息的唯一标记
    },
    mutations: { 
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
    },
    actions: { 
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
    },
    getters: {  }
  }