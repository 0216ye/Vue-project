/*
包含工具模块的函数
*/
import Vue from 'vue'
//保存购物车中的数据到内存 结构: shopID_key:{foodID1:1,foodID2:2}
export function saveCartFoods (shopId,cartFoods){
    //reduce用于累加累计，可以用于数组/对象/数值
    const cartCounts = cartFoods.reduce((pre,food) => {
        //向pre中添加属性
        pre[food.id] = food.count
        return pre
    },{})
    //将数据保存起来
    sessionStorage.setItem(`${shopId}_key`,JSON.stringify(cartCounts))
}

//读取sessionStorage中的数据,并返回一个cartFoods
//结构: shopID_key:{foodID1:1,foodID2:2}
export function getCartFoods (shop){
    //保存food的数组
    const cartFoods = []
    //读取数据
    const cartCounts = JSON.parse(sessionStorage.getItem(`${shop.id}_key`)) || {}
    // 根据cartCounts遍历其中所有需要指定count的food
    shop.goods.forEach( good =>{
        good.foods.forEach( food =>{
            //取出food在cartCounts中对应的count/可能没有
            const count = cartCounts[food.id]
            if ( count > 0 ) {
                //添加响应式属性
                Vue.set(food,'count',count)
                cartFoods.push(food)
            }
        })
    })
    return cartCounts
}