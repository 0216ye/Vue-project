/**
 * 保存用于多组件中通信的数据的对象
 */
export default {
    latitude: 40.10038, // 纬度 
    longitude: 116.36867, // 经 度 
    address: {}, // 地 址 信 息 对 象 
    categorys: [], // 分 类 数 组 
    shops: [], // 商 家 数 组
    user:{},//保存着用户的信息
    token: localStorage.getItem('token-key') || '' ,//用于校验用户信息的唯一标记
    goods:[],//保存着食物的数组
    ratings:[],//保存着对应食物的评价
    info:{},//保存着商家的信息
}