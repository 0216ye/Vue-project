<template>
  <div>
    <!--将非当前的组件缓存起来，而不是销毁它，优化性能 -->
    <keep-alive exclude="Shop"> <!--排除了shop组件-->
       <router-view ></router-view>
    </keep-alive>
    <FooterNav v-show="$route.meta.isFooterShow"></FooterNav>
  </div>
</template>

<script type="text/ecmascript-6">
import FooterNav from './components/FooterNav/FooterNav'
import {reqAddress} from './api/index'
export default {
  components:{//注册组件
    FooterNav
  },
  async mounted(){
    //通知action异步获取address并保存到state中
    this.$store.dispatch('getAddress')
    this.$store.dispatch('autoLogin')
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 
</style>  
