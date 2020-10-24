/**
 * 商家模块的相关数据
 */
import Vue from 'vue'
import {
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT,
    CLEAR_FOOD,
    RECEIVE_SHOP
} from '../mutations-type'
import {reqShop} from '../../api/index'
import {getCartFoods} from '../../utils/index'
export default {
    state: {
        // goods:[],//保存着食物的数组
        // ratings:[],//保存着对应食物的评价
        // info:{},//保存着商家的信息
        shop:{}, //保存商家的所有信息
        cartFoods:[]//保存着已经添加到购物车的food食物的数组(count不为0)
    },
    mutations: {  
        // [RECEIVE_GOODS](state,goods){
        //     state.goods = goods
        // },
        // [RECEIVE_INFO](state,info){
        //     state.info = info
        // },
        // [RECEIVE_RATINGS](state,ratings){
        //     state.ratings = ratings
        // },
        [RECEIVE_SHOP](state,shop={},cartFoods=[]){
            state.shop = shop
            state.cartFoods = cartFoods
            
        },
        [ADD_FOOD_COUNT](state,food){
            if ( food.count ) {
                //food中有count，值+1
                food.count+=1
            }else{
                // 问题：vue中如果给一个响应式对象添加一个新的属性，没有数据绑定效果(不是响应式，数据改变，页面没有更新)
                // 解决：给响应式对象添加一个响应式的属性
                Vue.set(food,'count',1)
                //count数量从0到1,则添加到保存点餐的食物food数组中
                state.cartFoods.push(food)
            }
        },
        [REDUCE_FOOD_COUNT](state,food){
            if (food.count > 0 ){
                food.count--
                //如果购物车中food被点餐的数量=0，从保存购物车点餐的食物food数组中删除
                if ( food.count === 0 ) {
                    state.cartFoods.splice(state.cartFoods.indexOf(food),1)
                }
            }
        },
        [CLEAR_FOOD](state){
            //清空购物车，首先中所有food食物的数量改为0
            state.cartFoods.forEach(food => food.count = 0)
            //再者清空carFoods
            state.cartFoods = []
        }
    },
    actions: { 
        /*
         //7、保存食物数据的action
        async showGoods ({commit},cb){
            const result = await reqGoods()
            if (result.code === 0){
                const goods = result.data
                commit(RECEIVE_GOODS,goods)
                //如果组件中传递了接收消息的回调，数据更新后，调用回调函数通知调用的组件
                typeof cb === 'function' && cb()
            }
        },
        //8、保存食物评价的数据的action
        async showRatings ({commit},cb){
            const result = await reqRatings()
            if (result.code === 0){
                const ratings = result.data
                commit(RECEIVE_RATINGS,ratings)
                typeof cb === 'function' && cb()
            }
        },
        //9、保存商家信息
        async showInfo ({commit},cb){
            const result = await reqInfo()
            if (result.code === 0){
                const Info = result.data
                commit(RECEIVE_INFO,Info)
                typeof cb === 'function' && cb()
            }
        },
        */
       //保存对应具体id商家的具体信息,数据源是通过mock的接口
        async getShop ({commit,state},id) {
            //如果id与原来保存的商家对应id一致，则不再发送请求获取数据
            if ( id == state.shop.id ){
                return
            }
            //如果是另一家商家，清空原本购物车中的数据
            if ( state.shop.id ){
                commit(RECEIVE_SHOP,state.shop)
            }
            console.log('准备发送请求')

            const result = await reqShop(id)
            if ( result.code === 0 ){
                const shop = result.data
                //读取保存在seesionStorage中的数据
                const cartFoods = getCartFoods(shop)
                commit(RECEIVE_SHOP,shop,cartFoods)
            }
        },


        //更新food中的count值，
        updateFoodCount ({commit},{isAdd,food}) {
            if ( isAdd ){
                //是添加的按钮
                commit(ADD_FOOD_COUNT,food)
            }else{
                //删除的按钮
                commit(REDUCE_FOOD_COUNT,food)
            }
        }
    },
    getters: { 
        //初始化显示时会触发getter
        // 依赖的数据更新时，也会触发getter
        /*
        cartFood ( state ){
            const arr = []
            state.goods.forEach( good => {
                good.foods.forEach(food =>{
                    if ( food.count > 0 ){
                        //将数量不为0的单个food食物添加到保存food食物的数组中,但是这种效率不高,改成定义一个state数据，手动控制
                        arr.push(food)
                    }
                })
            });
            return arr 
        }
        */
       //计算购物车中总的数量
        totalCount ( state ){
            return state.cartFoods.reduce((pre,food) => pre+food.count,0)
        },
       //计算购物车中食物的总金额
        totalPricce ( state ){
            return state.cartFoods.reduce((pre,food)=> pre+food.price*food.count,0)
       }
    }
  }