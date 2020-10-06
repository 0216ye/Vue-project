//引入rem适配的库
const px2rem = require('postcss-px2rem')
//配置postcss-px2rem
const postcss = px2rem({
    remUnit:37.5
})
module.exports = {
    runtimeCompiler:true,
    lintOnSave:false, //关闭Eslint的规则
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