/**路由器模块*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/Home.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Order from '../pages/Order/Order.vue'
import FooterNav from '../components/FooterNav/FooterNav.vue'

//申明使用vue的插件
Vue.use(VueRouter)

export default new VueRouter({
    mode:'history',//申明使用的模式：hish/history
    routes:[
        {
            path:'/home',
            component:Home
        },
        {
            path:'/serach',
            component:Search
        },
        {
            path:'/order',
            component:Order
        },
        {
            path:'/profile',
            component:Profile
        },
        {
            path:'/',
            redirect:'/home'
        }
    ]
})
