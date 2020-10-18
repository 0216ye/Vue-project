/**路由器模块*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/Home.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Order from '../pages/Order/Order.vue'
import FooterNav from '../components/FooterNav/FooterNav.vue'
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
            path:'/shop',
            component:Shop,
            children:[
                {
                    path:'/shop/goods',
                    component:Goods
                },
                {
                    path:'/shop/ratings',
                    component:Ratings
                },
                {
                    path:'/shop/info',
                    component:Info
                },
                {
                    path:'',
                    redirect:'/shop/goods'
                },
            ]
        },
        {
            path:'/',
            redirect:'/home'
        }
    ]
})
