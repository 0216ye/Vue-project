/**路由器模块*/
import Vue from 'vue'
import VueRouter from 'vue-router'
/*
import Home from '../pages/Home/Home.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Order from '../pages/Order/Order.vue'
*/
/*路由组件懒加载
1).在打包时路由组件会被单独打包(代码分割: code split)
路由组件懒加载:
1).在打包时路由组件会被单独打包(代码分割: code split)
2).默认不请求加载路由组件打包文件，当请求需要路由组件时才请求加载
1. import动态引入:
import (模块路径)
结果:被引入的模块会被单独打包(代码分割: code split)
2.配置的路由组件是函数(返回动态加载的路由组件模块)
函数开始是不执行(开始不请求加载单独打包的路由组件模块代码)
当请求对应路径需要显示组件界面时，去加载路由组件打包文件
作用:减小首屏需要加载的js文件==>显示更快
*/
const Home = () => import('../pages/Home/Home.vue')
const Search = () => import('../pages/Search/Search.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
const Order = () => import('../pages/Order/Order.vue')
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import Goods from '../pages/Shop/Goods/Goods.vue'
import Info from '../pages/Shop/Info/Info.vue'
import Ratings from '../pages/Shop/Ratings/Ratings.vue'

//申明使用vue的插件
Vue.use(VueRouter)

export default new VueRouter({
    mode:'history',//申明使用的模式：hish/history
    routes:[
        {
            path:'/home',
            component:Home,
            //路由元信息
            meta:{
                isFooterShow:true
            }
        },
        {
            path:'/search',
            component:Search,
            //路由元信息
            meta:{
                isFooterShow:true
            }
        },
        {
            path:'/order',
            component:Order,
            //路由元信息
            meta:{
                isFooterShow:true
            }
        },
        {
            path:'/profile',
            component:Profile,
            //路由元信息
            meta:{
                isFooterShow:true
            }
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/shop/:id',
            props:true ,//将params动态路由参数当成组件属性标签传递
            component:Shop,
            children:[
                {
                    path:'goods',
                    component:Goods
                },
                {
                    path:'ratings',
                    component:Ratings
                },
                {
                    path:'info',
                    component:Info
                },
                {
                    path:'',
                    redirect:'/shop/:id/goods'
                },
            ]
        },
        {
            path:'/',
            redirect:'/home'
        }
    ]
})
