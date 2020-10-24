/**
 * 包含n个接口请求函数的模块
 */
import myAxios from './ajax'
//1、根据经纬度获取位置详情
export const reqAddress = (longitude,latitude) => myAxios.get(`/position/${latitude},${longitude}`)

//2、获取食品分类列表
export const reqCategorys = () => myAxios.get('/index_category',{
    headers:{
        needCheck:true
    }
})

// 3、根据经纬度获取商铺列表
export const reqShops = ({latitude,longitude }) => myAxios.get('/shops',{
    params:{latitude,longitude},
    headers:{
        needCheck:true
    }
})

//4、发送短信验证码
export const reqPhoneText = (phone) => myAxios.get(`/sendcode?phone=${phone}`)

//5、用户名密码登陆
export const reqUSerPwd = ({name,pwd,captcha}) => myAxios.post('/login_pwd',{name,pwd,captcha})

//6、手机号验证码登陆
export const reqPhoneVerify = ({phone,code}) => myAxios.post('login_sms',{phone,code})

//7、自动登录
export const reqAutoLogin = () => myAxios.get('/auto_login')
/**以下接口是通过mock库mock出来的 */
// 8、获取食物的接口
export const reqGoods = () => myAxios('/goods')
// 9、获取商家的信息
export const reqInfo = () => myAxios('/info')
// 10、获取食物评价的接口
export const reqRatings = () => myAxios('/ratings')
// 11、根据商家id返回对应的商家信息
export const reqShop = (id) => myAxios('/shop/'+id)

