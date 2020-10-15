/**
 * 对axios进行二次封装，一个能发送ajax请求的函数
 * 1、统一处理请求异常
 * 2、异常请求成功的数据是response.data
 * 3、对请求体参数进行urlencoded处理，而不适用默认的JSON方式（该项目后台不支持）
 * 4、配置请求超时时间
 * 5、通过请求体携带token参数
 */
import axios from 'axios'
import store from '../vuex/store'
import qs from 'qs'
import { Indicator } from 'mint-ui'
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
        alert(error.message)
        //统一处理请求异常-->中断Promise链
        return new Promise(()=>{})
    }
)
export default myAxios
