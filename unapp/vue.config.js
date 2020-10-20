//引入rem适配的库
const px2rem = require('postcss-px2rem')
const path = require('path')
//配置postcss-px2rem
const postcss = px2rem({
    remUnit:37.5 //设计稿等分之后的值，等分的比例同页面的rem的比例是一致的
})
module.exports = {
  lintOnSave: false,//关闭eslint的提示
  css:{//添加postcc的配置(适配rem的库)
      loaderOptions:{
          postcss:{
              plugins:[
                  postcss
              ]
          }
      }
  },
  configureWebpack: {
      //引入模块解析
      resolve: {
          extensions: ['.js', '.vue', '.json'],//可以省略的后缀
          alias: { //模块路径别名
              'vue$': 'vue/dist/vue.esm.js',  //表示精准匹配， 带vue的编译器
              '@': path.resolve(__dirname, 'src'),
              '@components': path.resolve(__dirname, 'src/components')
          }
      }
  },
  //代理服务器
  devServer: {
      open: true,//自动打开浏览器
      quiet: true,//不做太多日志输出
      proxy: { //解决ajax跨域
          "/api": {
              target: "http://localhost:4000",
              pathRewrite: { "^/api": "" }
          }
      },
      historyApiFallback: true//当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
  },
  //国际化配置
  pluginOptions: {
    i18n: {
      locale: 'zh_CN',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
