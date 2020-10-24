/*
    该文件使用mock.js,用于模拟后台返回的数据,不需要暴露，只要在main.js中引入即可
    Mock.mock( rurl, template ):记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回。
*/
//数据源
import data from './data.json' //data已经被webpack自动解析为JS对象了
import shops from './shops.json'

import Mock  from 'mockjs'



//因为在ajax.js中配置了baseURL，默认会在请求接口前面添加 --> /api
Mock.mock('/api/goods',{code:0,data:data.goods})
Mock.mock('/api/ratings',{code:0,data:data.ratings})
Mock.mock('/api/info',{code:0,data:data.info})
//根据传递的id，动态的显示对应的商家信息
Mock.mock(/^\/api\/shop\/\d+$/,function(options){
    //根据id，匹配url中对应的id参数
    const id = options.url.substring(10)
    //返回对应的商家数组信息
    const shop = shops.find( shop => shop.id === id*1)
    //返回对应的商家信息
    return Mock.mock({code:0,data:shop || shops[0]})
})