/**
 * 对axios进行二次封装，一个能发送ajax请求的函数
 * 1、统一处理请求异常
 * 2、异常请求成功的数据是response.data
 * 3、对请求体参数进行urlencoded处理，而不适用默认的JSON方式（该项目后台不支持）
 * 4、配置请求超时时间
 * 5、通过请求体携带token参数
 */
import axios from 'axios'
import qs from 'qs'
import { Indicator,Toast,MessageBox } from 'mint-ui'
import store from '../vuex/store'
import router from '../router/index'
const myAxios = axios.create({
    baseURL:'/api',//配置了代理服务器，以/api开头，会由代理服务器转发请求处理
    timeout:2000 //配置超时时间
})

//请求拦截器
myAxios.interceptors.request.use(config =>{
    //显示请求loading
    Indicator.open()
    const data = config.data
    if (data instanceof Object){
       config.data = qs.stringify(data)
    }
    // 5、通过请求体携带token参数
    const token = store.state.token
    //如果有token，通过请求头携带
    if ( token )  config.headers['Authorization']  = token
    else {
        //获取needCheck，用于判断是否需要携带token，
        const needCheck = config.headers.needCheck
        if ( needCheck ){
            // 在需要校验token的请求中，如果没有token，取消发送请求
            throw new Error('没有token，请求失败')
        }
    }

    return config
})
//响应拦截器
myAxios.interceptors.response.use(
    response =>{
        //隐藏loading
        Indicator.close()
        // 2、异常请求成功的数据是response.data
        return response.data
    },
    error =>{
        //隐藏loading
        Indicator.close()
        const response = error.response
        //没有发送请求，error中没有response
        if ( !response ) {
            const path = router.currentRoute.path
            if ( path !=='/login'){
                router.replace('/login')
                Toast(error.message)
            }
        }else {
            //有发送请求，但请求失败
            if ( response.status === 401){
                const path = router.currentRoute.path
                //验证token失败，清除LocalStorage和store的信息，跳转到登录页面
                if ( path !=='/login'){
                    console.log('--1')
                    store.dispatch('loginOut')
                    router.replace('/login')
                    Toast(error.response.data.message || '登录信息失效，请重新登录')
                }
            }else if (response.status === 404){
                //404提示
                MessageBox('提示','请求资源不存在')
            }else{
                console.log('----')
                MessageBox('提示', error.message)
            }
        }
        
       
        //统一处理请求异常-->中断Promise链
        return new Promise(()=>{})
    }
)
export default myAxios
