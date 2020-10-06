//引入rem适配的库
const px2rem = require('postcss-px2rem')
//配置postcss-px2rem
const postcss = px2rem({
    remUnit:37.5 //设计稿等分之后的值，等分的比例同页面的rem的比例是一致的
})
module.exports = {
    css:{//添加postcc的配置(适配rem的库)
        loaderOptions:{
            postcss:{
                plugins:[
                    postcss
                ]
            }
        }
    }
}