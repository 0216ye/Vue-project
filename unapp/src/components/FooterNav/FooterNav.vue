<template>
  <div class='footer-nav'>
      <span class="nav-item " :class="{on: $route.path === '/home'}" @click="goto('/home')"><!--动态class，对象是因为类名确定,-->
        <span ><i class="iconfont iconicon-waimai-copy"></i></span>
        <span>首页</span>
      </span>
       <span class="nav-item" :class="{on: $route.path === '/search'}" @click="goto('/search')">
        <span><i class="iconfont iconicon_search"></i></span>
        <span>搜索</span>
      </span>
       <span class="nav-item" :class="{on: $route.path === '/order'}" @click="goto('/order')">
        <span><i class="iconfont icondingdan"></i></span>
        <span>订单</span>
      </span>
       <span class="nav-item" :class="{on: $route.path === '/profile'}" @click="goto('/profile')">
        <span><i class="iconfont iconicon_geren"></i></span>
        <span>用户</span>
      </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'FooterNav',
    methods:{
      //用于显示icon图标高亮
      goto(path){
        //编程式路由跳转
        this.$router.replace(path)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
 .footer-nav
   width 100%
   height 50px
   top-border-1px(#666)
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
