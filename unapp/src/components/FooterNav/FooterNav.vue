<template>
  <div class='footer-nav'>
      <span class="nav-item " :class="{on: $route.path === '/home'}" @click="goto('/home')"><!--动态class，对象是因为类名确定,-->
        <span ><i class="iconfont iconicon-waimai-copy"></i></span>
        <span>{{$t('footer_home')}}</span>
      </span>
       <span class="nav-item" :class="{on: $route.path === '/search'}" @click="goto('/search')">
        <span><i class="iconfont iconicon_search"></i></span>
        <span>{{$t('footer_search')}}</span>
      </span>
       <span class="nav-item" :class="{on: $route.path === '/order'}" @click="goto('/order')">
        <span><i class="iconfont icondingdan"></i></span>
        <span>{{$t('footer_order')}}</span>
      </span>
       <span class="nav-item" :class="{on: $route.path === '/profile'}" @click="goto('/profile')">
        <span><i class="iconfont iconicon_geren"></i></span>
        <span>{{$t('footer_profile')}}</span>
      </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'FooterNav',
    methods:{
      //用于显示icon图标高亮
      goto(path){
        //当当前路径和请求的路径不一致时才跳转
       if (path != this.$route.path){
          //编程式路由跳转
        this.$router.replace(path)
       }else {
         //一致时，不跳转，但刷新当前页面
         window.location = path  //发送一般的http请求-->整体刷新
       }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
 .footer-nav
   width 100%
   height 50px
   top-border-1px(#ccc)
   display flex
   justify-content space-between
   position fixed
   bottom 0px
   left 0px
   text-align center
   background-color #fff
   span
    margin-top 3px
   .nav-item
     width 25%
     display flex
     flex-direction column
     &.on
       color $green
     i
      font-size 25px
</style>
