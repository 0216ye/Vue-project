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
const myAxios = axios.create({
    timeout:2000 //配置超时时间
})

myAxios.interceptors.request.use(config =>{
    const data = config.data
    if (data instanceof Object){
       config.data = qs.stringify(data)
    }
    return config
})
myAxios.interceptors.response.use(
    response =>{
        console.log(response)
        // 2、异常请求成功的数据是response.data
        return response.data
    },
    error =>{
        alert('错误',error.message)
        //统一处理请求异常-->中断Promise链
        return new Promise(()=>{})
    }
)
export  myAxios
