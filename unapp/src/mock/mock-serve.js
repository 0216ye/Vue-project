/*
    该文件使用mock.js,用于模拟后台返回的数据,不需要暴露，只要在main.js中引入即可
    Mock.mock( rurl, template ):记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回。
*/
import data from './data.json' //data已经被webpack自动解析为JS对象了
import Mock  from 'mockjs'

//因为在ajax.js中配置了baseURL，默认会在请求接口前面添加 --> /api
Mock.mock('/api/goods',{code:0,data:data.goods})
Mock.mock('/api/ratings',{code:0,data:data.ratings})
Mock.mock('/api/info',{code:0,data:data.info})
console.log('---mock')